import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Returns ref, mouse position motion values, and hover state.
 * Attach `ref` to the card element and spread `handlers` onto it.
 */
export function useHoverLight() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const x = useSpring(rawX, { stiffness: 20, damping: 28 });
  const y = useSpring(rawY, { stiffness: 20, damping: 28 });

  // Spotlight position as CSS percentages
  const spotX = useTransform(x, [0, 1], ["0%", "100%"]);
  const spotY = useTransform(y, [0, 1], ["0%", "100%"]);

  const handlers = {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left) / rect.width);
      rawY.set((e.clientY - rect.top) / rect.height);
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      rawX.set(0.5);
      rawY.set(0.5);
    },
  };

  return { ref, hovered, spotX, spotY, handlers };
}
