import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemKey: (item: T, index: number) => string;
  minHeight?: number;
  maxWidthClass?: string;
};

export function SingleSlider<T>({
  items,
  renderItem,
  itemKey,
  minHeight = 360,
  maxWidthClass = "md:max-w-2xl md:mx-auto",
}: Props<T>) {
  const [idx, setIdx] = useState(0);
  if (items.length === 0) return null;
  const safeIdx = ((idx % items.length) + items.length) % items.length;
  const current = items[safeIdx];
  const go = (delta: number) => setIdx(i => i + delta);

  return (
    <div className="relative" style={{ perspective: 1000 }}>
      <div className="grid md:grid-cols-[auto_1fr_auto] items-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="hidden md:flex w-11 h-11 rounded-full border border-border bg-muted/30 backdrop-blur-sm items-center justify-center text-foreground hover:bg-primary/15 hover:text-primary hover:border-primary/40 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="relative" style={{ minHeight }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={itemKey(current, safeIdx)}
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className={maxWidthClass}
            >
              {renderItem(current, safeIdx)}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="hidden md:flex w-11 h-11 rounded-full border border-border bg-muted/30 backdrop-blur-sm items-center justify-center text-foreground hover:bg-primary/15 hover:text-primary hover:border-primary/40 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="md:hidden w-9 h-9 rounded-full border border-border bg-muted/30 flex items-center justify-center text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          {items.map((it, i) => (
            <button
              key={itemKey(it, i)}
              onClick={() => setIdx(i)}
              aria-label={`Go to item ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === safeIdx ? 28 : 8,
                background: i === safeIdx ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.35)",
                boxShadow: i === safeIdx ? "0 0 12px hsl(var(--primary) / 0.5)" : "none",
              }}
            />
          ))}
        </div>
        <span className="font-ui text-[10px] font-bold tracking-[0.16em] text-muted-foreground tabular-nums ml-2">
          {String(safeIdx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="md:hidden w-9 h-9 rounded-full border border-border bg-muted/30 flex items-center justify-center text-foreground"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
