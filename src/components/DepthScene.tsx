/* Fixed 3D background scene — sits behind all content */
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.3) % 90}%`,
  delay: `${(i * 0.7) % 8}s`,
  duration: `${7 + (i * 1.1) % 6}s`,
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  opacity: 0.25 + (i % 4) * 0.12,
}));

const DepthScene = () => (
  <>
    {/* Vignette — darkens edges, focuses eye on center content */}
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, hsl(220 30% 2% / 0.6) 75%, hsl(220 30% 1% / 0.92) 100%)",
      }}
    />

    <div id="depth-scene" aria-hidden="true">
      {/* Receding floor grid */}
      <div className="floor-grid" />

      {/* Vertical wall lines */}
      <div className="wall-lines" />

      {/* Floating particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: `-${10 + p.id * 3}px`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* Primary ambient orb — top-left, stronger */}
      <div style={{
        position: "absolute", top: "8%", left: "3%",
        width: 500, height: 500, borderRadius: "50%",
        background: "hsl(174 85% 56%)",
        filter: "blur(160px)", opacity: 0.07,
        animation: "orb-drift 18s ease-in-out infinite",
      }} />

      {/* Accent orb — right side */}
      <div style={{
        position: "absolute", top: "45%", right: "4%",
        width: 380, height: 380, borderRadius: "50%",
        background: "hsl(265 72% 68%)",
        filter: "blur(130px)", opacity: 0.07,
        animation: "orb-drift 24s ease-in-out 5s infinite",
      }} />

      {/* Deep void — bottom center, pure black pool */}
      <div style={{
        position: "absolute", bottom: "0%", left: "20%", right: "20%",
        height: 300, borderRadius: "50%",
        background: "hsl(220 30% 1%)",
        filter: "blur(80px)", opacity: 0.9,
      }} />

      {/* Secondary accent — lower left */}
      <div style={{
        position: "absolute", bottom: "20%", left: "5%",
        width: 280, height: 280, borderRadius: "50%",
        background: "hsl(174 85% 56%)",
        filter: "blur(110px)", opacity: 0.04,
        animation: "orb-drift 20s ease-in-out 10s infinite",
      }} />

      {/* Corner darkness — top-right void */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 400, height: 400,
        background: "radial-gradient(circle at top right, hsl(220 30% 1% / 0.8), transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Corner darkness — bottom-left void */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: 400, height: 400,
        background: "radial-gradient(circle at bottom left, hsl(220 30% 1% / 0.8), transparent 70%)",
        pointerEvents: "none",
      }} />
    </div>
  </>
);

export default DepthScene;
