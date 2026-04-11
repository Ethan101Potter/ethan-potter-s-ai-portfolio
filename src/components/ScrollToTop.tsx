import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", v => setVisible(v > 400));
    return unsub;
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 28px hsl(var(--primary) / 0.5)",
          }}
          whileTap={{ scale: 0.93 }}
          className="fixed bottom-24 left-6 z-[200] w-11 h-11 rounded-xl flex items-center justify-center border border-primary/30 transition-colors duration-200"
          style={{
            background: "linear-gradient(160deg, hsl(220 22% 13%), hsl(220 22% 9%))",
            boxShadow: "0 8px 24px hsl(220 30% 1% / 0.6), inset 0 1px 0 hsl(255 100% 100% / 0.06)",
          }}
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp className="w-4 h-4 text-primary" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
