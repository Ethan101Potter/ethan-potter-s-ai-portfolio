import { useEffect, useRef } from "react";

/* Sample the luminance of the element under the cursor */
const getLuminanceUnder = (x: number, y: number): number => {
  // Temporarily hide cursor elements so they don't interfere with hit-testing
  const el = document.elementFromPoint(x, y) as HTMLElement | null;
  if (!el) return 0;
  const bg = getComputedStyle(el).backgroundColor;
  // Parse rgb/rgba
  const m = bg.match(/[\d.]+/g);
  if (!m || m.length < 3) {
    // Fallback: check if dark class is on html
    return document.documentElement.classList.contains("dark") ? 0 : 1;
  }
  const r = parseInt(m[0]) / 255;
  const g = parseInt(m[1]) / 255;
  const b = parseInt(m[2]) / 255;
  // Relative luminance (WCAG formula)
  const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

const CustomCursor = () => {
  const blobRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  const pos       = useRef({ x: -200, y: -200 });
  const vel       = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: -200, y: -200 });
  const rafRef    = useRef<number>(0);
  const hovering  = useRef(false);
  // 0 = fully dark, 1 = fully light — smoothed
  const luminance = useRef(0);

  useEffect(() => {
    const blob   = blobRef.current;
    const trail  = trailRef.current;
    const glow   = glowRef.current;
    const shadow = shadowRef.current;
    if (!blob || !trail || !glow || !shadow) return;

    const onMove = (e: MouseEvent) => {
      vel.current.x = e.clientX - pos.current.x;
      vel.current.y = e.clientY - pos.current.y;
      pos.current   = { x: e.clientX, y: e.clientY };

      // Sample luminance every frame (cheap — just getComputedStyle)
      const lum = getLuminanceUnder(e.clientX, e.clientY);
      // Smooth the luminance transition so effects blend gradually
      luminance.current += (lum - luminance.current) * 0.08;
    };

    const onEnter = () => { hovering.current = true; };
    const onLeave = () => { hovering.current = false; };

    const animate = () => {
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * 0.12;
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * 0.12;

      const speed  = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      const angle  = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);
      const lum    = luminance.current;          // 0 = dark, 1 = light
      const isDark = lum < 0.18;                 // threshold

      // ── Stretch physics ──
      const stretch = hovering.current ? 1 : Math.min(1 + speed * 0.04, 2.2);
      const squish  = hovering.current ? 1 : Math.max(1 / stretch, 0.55);
      const rot     = speed > 1 ? angle : 0;

      // ── Main blob ──
      blob.style.left      = `${pos.current.x}px`;
      blob.style.top       = `${pos.current.y}px`;
      blob.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scaleX(${hovering.current ? 2.2 : stretch}) scaleY(${hovering.current ? 2.2 : squish})`;

      if (isDark) {
        // BATTERY / ENERGY effect — glowing neon blob, bright in darkness
        const intensity = 1 - lum / 0.18; // 0→1 as lum→0
        blob.style.background = `radial-gradient(circle, hsl(174 100% 75%) 0%, hsl(174 85% 56%) 40%, hsl(265 72% 68%) 100%)`;
        blob.style.boxShadow  = [
          `0 0 ${8 + intensity * 16}px hsl(174 85% 56% / ${0.7 + intensity * 0.3})`,
          `0 0 ${20 + intensity * 40}px hsl(174 85% 56% / ${0.35 + intensity * 0.25})`,
          `0 0 ${40 + intensity * 60}px hsl(265 72% 68% / ${0.15 + intensity * 0.2})`,
        ].join(", ");
        blob.style.filter = `brightness(${1.2 + intensity * 0.6})`;
        blob.style.width  = `${12 + intensity * 4}px`;
        blob.style.height = `${12 + intensity * 4}px`;
      } else {
        // SHADOW effect — dark blob casting a shadow, like sunlight
        const intensity = Math.min((lum - 0.18) / 0.6, 1); // 0→1 as lum→0.78
        blob.style.background = `radial-gradient(circle, hsl(220 30% 15%) 0%, hsl(220 25% 8%) 100%)`;
        blob.style.boxShadow  = [
          `${2 + intensity * 4}px ${3 + intensity * 6}px ${6 + intensity * 12}px hsl(220 30% 5% / ${0.4 + intensity * 0.35})`,
          `${1 + intensity * 2}px ${2 + intensity * 3}px ${3 + intensity * 6}px hsl(220 30% 5% / ${0.25 + intensity * 0.2})`,
          `inset 0 1px 0 hsl(255 100% 100% / ${0.08 + intensity * 0.06})`,
        ].join(", ");
        blob.style.filter = `brightness(${0.6 - intensity * 0.15})`;
        blob.style.width  = `${10 + intensity * 2}px`;
        blob.style.height = `${10 + intensity * 2}px`;
      }

      // ── Trail ──
      trail.style.left      = `${smoothPos.current.x}px`;
      trail.style.top       = `${smoothPos.current.y}px`;
      trail.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scaleX(${stretch * 0.65}) scaleY(${squish * 0.65})`;
      trail.style.opacity   = hovering.current ? "0" : `${Math.min(speed * 0.055, 0.4)}`;

      if (isDark) {
        trail.style.background = `hsl(174 85% 56% / 0.3)`;
        trail.style.filter     = `blur(4px) brightness(1.4)`;
      } else {
        trail.style.background = `hsl(220 30% 10% / 0.25)`;
        trail.style.filter     = `blur(3px) brightness(0.7)`;
      }

      // ── Ambient glow ring (dark only) ──
      const glowOpacity = Math.max(0, (0.18 - lum) / 0.18);
      glow.style.left      = `${pos.current.x}px`;
      glow.style.top       = `${pos.current.y}px`;
      glow.style.opacity   = `${glowOpacity * (hovering.current ? 0.5 : 0.25)}`;
      glow.style.transform = `translate(-50%, -50%) scale(${1 + speed * 0.015})`;

      // ── Cast shadow plane (light only) ──
      const shadowOpacity = Math.max(0, (lum - 0.18) / 0.6);
      const shadowDist    = 4 + shadowOpacity * 8;
      shadow.style.left      = `${pos.current.x + shadowDist}px`;
      shadow.style.top       = `${pos.current.y + shadowDist * 1.4}px`;
      shadow.style.opacity   = `${shadowOpacity * (hovering.current ? 0.15 : 0.08)}`;
      shadow.style.transform = `translate(-50%, -50%) scaleX(${(hovering.current ? 2.2 : stretch) * (1 + shadowOpacity * 0.3)}) scaleY(${(hovering.current ? 0.4 : squish * 0.4)})`;

      // Decay velocity
      vel.current.x *= 0.75;
      vel.current.y *= 0.75;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select"
    );
    interactives.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Ambient glow ring — dark areas only */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 80, height: 80,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(174 85% 56% / 0.4) 0%, hsl(265 72% 68% / 0.15) 50%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9996,
          opacity: 0,
          willChange: "transform, opacity",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Cast shadow ellipse — light areas only */}
      <div
        ref={shadowRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 20, height: 8,
          borderRadius: "50%",
          background: "hsl(220 30% 5%)",
          filter: "blur(4px)",
          pointerEvents: "none",
          zIndex: 9996,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />

      {/* Trailing ghost */}
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 14, height: 14,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9997,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />

      {/* Main blob */}
      <div
        ref={blobRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 12, height: 12,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform, box-shadow, background",
        }}
      />
    </>
  );
};

export default CustomCursor;
