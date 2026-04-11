import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Github } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/* ── Animated day/night toggle ── */
const ThemeToggle = ({ theme, toggle }: { theme: string; toggle: () => void }) => {
  const isDark = theme === "dark";
  return (
    <motion.button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative flex items-center rounded-full border transition-colors duration-500 focus:outline-none"
      style={{
        width: 52,
        height: 26,
        background: isDark
          ? "linear-gradient(135deg, hsl(220 40% 12%), hsl(240 50% 18%))"
          : "linear-gradient(135deg, hsl(45 100% 65%), hsl(35 100% 55%))",
        borderColor: isDark ? "hsl(220 14% 22%)" : "hsl(40 80% 55%)",
        boxShadow: isDark
          ? "0 0 12px hsl(265 72% 68% / 0.3), inset 0 1px 0 hsl(255 100% 100% / 0.05)"
          : "0 0 16px hsl(45 100% 65% / 0.5), inset 0 1px 0 hsl(255 100% 100% / 0.3)",
      }}
      whileTap={{ scale: 0.93 }}
    >
      {/* Stars (dark mode) */}
      {isDark && (
        <>
          {[{ x: 8, y: 6, s: 1.5 }, { x: 14, y: 14, s: 1 }, { x: 22, y: 8, s: 1.2 }].map((star, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: star.x, top: star.y, width: star.s * 2, height: star.s * 2 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0.4, 0.9, 0.4], scale: 1 }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </>
      )}

      {/* Sun rays (light mode) */}
      {!isDark && (
        <motion.div
          className="absolute left-2 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
        >
          {[0, 45, 90, 135].map((deg, i) => (
            <div
              key={i}
              className="absolute w-2 h-0.5 rounded-full bg-yellow-200/70"
              style={{
                transformOrigin: "left center",
                transform: `rotate(${deg}deg) translateX(8px)`,
                left: "50%", top: "50%",
                marginTop: -1,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Sliding pill */}
      <motion.div
        className="absolute top-1 rounded-full flex items-center justify-center text-[10px]"
        style={{ width: 20, height: 20 }}
        animate={{ left: isDark ? 28 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{
            background: isDark
              ? "linear-gradient(135deg, hsl(210 30% 88%), hsl(220 20% 75%))"
              : "linear-gradient(135deg, hsl(50 100% 90%), hsl(45 100% 75%))",
            boxShadow: isDark
              ? "0 0 8px hsl(210 30% 88% / 0.6), 2px 2px 4px hsl(220 30% 5% / 0.4)"
              : "0 0 10px hsl(45 100% 75% / 0.8), 2px 2px 4px hsl(30 60% 30% / 0.3)",
          }}
        >
          <span style={{ fontSize: 9 }}>{isDark ? "🌙" : "☀️"}</span>
        </div>
      </motion.div>
    </motion.button>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const { scrollY } = useScroll();
  const navBlur = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 20));
    return unsub;
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 transition-all duration-300"
      style={{
        background: scrolled
          ? "hsl(var(--background) / 0.85)"
          : "hsl(var(--background) / 0.4)",
        backdropFilter: `blur(${scrolled ? 20 : 8}px)`,
        boxShadow: scrolled ? "0 4px 30px hsl(var(--primary)/0.06)" : "none",
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="font-display text-base font-bold tracking-tight text-primary"
          style={{ textShadow: "0 0 20px hsl(var(--primary)/0.5)" }}
        >
          EP<span className="text-foreground">.</span>
        </motion.a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i + 0.3, duration: 0.4 }}
              whileHover={{ y: -2, color: "hsl(var(--primary))" }}
              className="font-ui text-[11px] font-medium tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors uppercase"
            >
              {l.label}
            </motion.a>
          ))}
          <div className="flex items-center gap-3 ml-2 border-l border-border pl-4">
            <motion.a
              href="https://github.com/polishchukserhii702-alt"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 8 }}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <ThemeToggle theme={theme} toggle={toggle} />
          </div>
        </div>

        {/* Mobile toggle */}
        <motion.button
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-foreground"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0, rotateX: -10 }}
          animate={{ opacity: 1, height: "auto", rotateX: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="md:hidden border-t border-border/50 px-6 py-4 space-y-4"
        >
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i }}
              className="block font-ui text-[11px] font-medium tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors uppercase"
            >
              {l.label}
            </motion.a>
          ))}
          <div className="flex items-center gap-4 pt-2 border-t border-border/50">
            <a
              href="https://github.com/polishchukserhii702-alt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <ThemeToggle theme={theme} toggle={toggle} />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
