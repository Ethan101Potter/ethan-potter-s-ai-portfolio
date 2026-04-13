import { motion, MotionValue, AnimatePresence } from "framer-motion";

/**
 * Drop this inside any `relative overflow-hidden` card.
 * It renders:
 *  1. A radial spotlight that follows the mouse
 *  2. A diagonal sweep beam that plays once on hover-enter
 *  3. An edge rim glow that brightens on hover
 */
export const LightFlow = ({
  hovered,
  spotX,
  spotY,
  color = "primary",
  intensity = 1,
}: {
  hovered: boolean;
  spotX: MotionValue<string>;
  spotY: MotionValue<string>;
  color?: "primary" | "accent";
  intensity?: number;
}) => {
  const c = `hsl(var(--${color}))`;
  const alpha = (a: number) => `hsl(var(--${color}) / ${(a * intensity).toFixed(2)})`;

  return (
    <>
      {/* 1 — Mouse-tracking radial spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
        style={{
          background: `radial-gradient(circle 180px at ${spotX} ${spotY}, ${alpha(0.13)} 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* 2 — Diagonal sweep beam on hover-enter */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="sweep"
            className="absolute inset-0 pointer-events-none rounded-[inherit] z-20 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="absolute"
              style={{
                width: "60%",
                height: "200%",
                top: "-50%",
                background: `linear-gradient(105deg, transparent 30%, ${alpha(0.18)} 50%, transparent 70%)`,
                filter: "blur(8px)",
              }}
              initial={{ left: "-60%" }}
              animate={{ left: "160%" }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3 — Edge rim glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-10"
        style={{
          boxShadow: `inset 0 0 0 1px ${alpha(hovered ? 0.45 : 0.0)}, inset 0 1px 0 ${alpha(hovered ? 0.6 : 0.0)}`,
          transition: "box-shadow 0.35s ease",
        }}
      />
    </>
  );
};
