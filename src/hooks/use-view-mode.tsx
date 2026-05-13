import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ViewMode = "grid" | "single";

type Ctx = { mode: ViewMode; setMode: (m: ViewMode) => void; toggle: () => void };

const ViewModeContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "ep-view-mode";

export const ViewModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<ViewMode>("grid");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
      if (stored === "grid" || stored === "single") setModeState(stored);
    } catch {}
  }, []);

  const setMode = (m: ViewMode) => {
    setModeState(m);
    try { localStorage.setItem(STORAGE_KEY, m); } catch {}
  };
  const toggle = () => setMode(mode === "grid" ? "single" : "grid");

  return (
    <ViewModeContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const ctx = useContext(ViewModeContext);
  if (!ctx) throw new Error("useViewMode must be used within ViewModeProvider");
  return ctx;
};
