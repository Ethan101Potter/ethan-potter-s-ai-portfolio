import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Brain, Users, Zap } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const highlights = [
  { icon: Code2, title: "Full Stack", desc: "End-to-end web development with modern frameworks", color: "primary" },
  { icon: Brain, title: "AI Engineering", desc: "ML models, automation & intelligent solutions", color: "accent" },
  { icon: Users, title: "Collaborative", desc: "Strong communicator, team-oriented approach", color: "primary" },
  { icon: Zap, title: "Fast Learner", desc: "Continuously growing through real-world projects", color: "accent" },
];

const stats = [
  { value: "40+", label: "Projects Completed", color: "primary" },
  { value: "7+",  label: "Years Experience",   color: "accent"  },
  { value: "20+", label: "Happy Clients",      color: "primary" },
  { value: "5",   label: "Domains Covered",    color: "accent"  },
] as const;

const domains = ["Web Apps", "SaaS", "E-Commerce", "AI/ML", "DevOps"];

const Card3D = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StatCounter = ({ value, label, color, index }: {
  value: string; label: string; color: "primary" | "accent"; index: number;
}) => {
  const numeric = parseInt(value);
  const suffix = value.replace(String(numeric), "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = numeric / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numeric) {
        setCount(numeric);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [numeric]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 * index, ease: [0.23, 1, 0.32, 1] }}
    >
      <Card3D>
        <div
          className={`p-6 rounded-xl border border-border surface-3d border-l-2 transition-all duration-300`}
          style={{
            borderLeftColor: `hsl(var(--${color}))`,
            boxShadow: `0 20px 40px -12px hsl(var(--${color}) / 0.12), inset 0 1px 0 hsl(var(--${color}) / 0.08)`,
          }}
        >
          <p
            className={`font-display text-5xl font-extrabold leading-none mb-2 ${color === "primary" ? "text-gradient" : ""}`}
            style={color === "accent" ? { color: `hsl(var(--accent))` } : undefined}
          >
            {count}{suffix}
          </p>
          <p className="font-ui text-xs tracking-wider uppercase text-muted-foreground">{label}</p>
          {label === "Domains Covered" && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {domains.map(d => (
                <span
                  key={d}
                  className="font-ui text-[10px] font-semibold px-2 py-0.5 rounded-md border"
                  style={{
                    borderColor: `hsl(var(--accent) / 0.3)`,
                    background: `hsl(var(--accent) / 0.08)`,
                    color: `hsl(var(--accent))`,
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card3D>
    </motion.div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6 scene-3d">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: 3 cols */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="font-ui text-primary text-[11px] font-semibold tracking-[0.4em] uppercase mb-3">About Me</p>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-6 leading-none">
                Driven by curiosity,<br />powered by <span className="text-gradient">code & AI</span>.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="font-body text-muted-foreground text-base leading-[1.8] mb-10 font-light"
            >
              Motivated and detail-oriented Full Stack Developer and AI Engineer with a strong foundation
              in both front-end and back-end development, along with emerging expertise in artificial
              intelligence. Passionate about creating efficient, scalable, and user-friendly web and
              AI-driven applications with clean, maintainable code.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30, rotateY: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Card3D className="h-full">
                    <div
                      className="flex items-center gap-4 p-4 rounded-xl border border-border surface-3d h-full"
                      style={{
                        boxShadow: `0 16px 32px -10px hsl(var(--${item.color}) / 0.12), inset 0 1px 0 hsl(var(--${item.color}) / 0.08)`,
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: `hsl(var(--${item.color}) / 0.15)`,
                          boxShadow: `0 0 16px hsl(var(--${item.color}) / 0.2)`,
                        }}
                      >
                        <item.icon className="w-4 h-4" style={{ color: `hsl(var(--${item.color}))` }} />
                      </div>
                      <div>
                        <h3 className="font-ui text-sm font-semibold tracking-tight mb-0.5">{item.title}</h3>
                        <p className="font-body text-muted-foreground text-xs leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {stats.map((stat, i) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} color={stat.color} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
