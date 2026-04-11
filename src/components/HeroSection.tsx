import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

/* Floating 3D geometry piece */
const FloatShape = ({
  className,
  delay = 0,
  size = 60,
}: {
  className?: string;
  delay?: number;
  size?: number;
}) => (
  <motion.div
    className={`absolute rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm ${className}`}
    style={{ width: size, height: size }}
    initial={{ opacity: 0, scale: 0.5, rotateX: 45, rotateY: 45 }}
    animate={{
      opacity: [0.3, 0.6, 0.3],
      rotateX: [20, 50, 20],
      rotateY: [30, 60, 30],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 8 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

/* Tilt card wrapper */
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 scene-3d scanlines">

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.06] animate-grid-drift"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-[2px] animate-scan-line pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.6), transparent)" }}
      />

      {/* Ambient orbs — brighter for contrast against dark bg */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] animate-orb-drift animate-pulse-glow"
        style={{ background: "hsl(var(--primary))", opacity: 0.18 }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[440px] h-[440px] rounded-full blur-[140px] animate-orb-drift animate-pulse-glow"
        style={{ background: "hsl(var(--accent))", opacity: 0.14, animationDelay: "3s" }}
      />

      {/* Floating 3D shapes */}
      <FloatShape className="top-[15%] left-[8%]"  size={50} delay={0} />
      <FloatShape className="top-[25%] right-[10%]" size={70} delay={1.5} />
      <FloatShape className="bottom-[20%] left-[12%]" size={40} delay={3} />
      <FloatShape className="bottom-[30%] right-[8%]" size={55} delay={2} />
      <FloatShape className="top-[55%] left-[5%]"  size={30} delay={4} />
      <FloatShape className="top-[10%] right-[25%]" size={35} delay={2.5} />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-ui text-primary text-xs font-medium tracking-[0.5em] uppercase mb-6 text-shimmer">
            Full Stack Developer & AI Engineer
          </p>
        </motion.div>

        <TiltCard>
          <motion.h1
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-[7rem] font-extrabold tracking-[-0.04em] mb-6 leading-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            Ethan{" "}
            <span
              className="text-gradient"
              style={{
                filter: "drop-shadow(0 0 30px hsl(174 80% 52% / 0.5))",
                display: "inline-block",
              }}
            >
              Potter
            </span>
          </motion.h1>
        </TiltCard>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="font-body text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-[1.75] mb-12 font-light"
        >
          Building intelligent, scalable web applications at the intersection of
          full-stack development and artificial intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.a
            href="#experience"
            whileHover={{ scale: 1.05, translateZ: 10 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-ui text-sm font-semibold tracking-wide glow-primary"
            style={{ transformStyle: "preserve-3d" }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, translateZ: 10 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border text-foreground font-ui text-sm font-medium tracking-wide hover:border-primary/50 hover:bg-primary/5 transition-colors"
            style={{ transformStyle: "preserve-3d" }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-ui text-[9px] font-medium tracking-[0.4em] text-muted-foreground uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
