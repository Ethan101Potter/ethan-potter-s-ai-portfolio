import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

type Skill = {
  name: string;
  stack: string;
  grade: "S" | "A" | "B" | "C";
  stars: number;
  review: number;
  reviewCount: number;
};

const skillCategories: { title: string; color: string; skills: Skill[] }[] = [
  {
    title: "Full Stack",
    color: "primary",
    skills: [
      { name: "React",       stack: "Frontend",  grade: "S", stars: 5, review: 4.9, reviewCount: 128 },
      { name: "TypeScript",  stack: "Language",  grade: "S", stars: 5, review: 4.8, reviewCount: 114 },
      { name: "Next.js",     stack: "Framework", grade: "S", stars: 5, review: 4.9, reviewCount: 97  },
      { name: "Node.js",     stack: "Backend",   grade: "A", stars: 4, review: 4.6, reviewCount: 83  },
      { name: "PostgreSQL",  stack: "Database",  grade: "A", stars: 4, review: 4.5, reviewCount: 76  },
      { name: "GraphQL",     stack: "API",       grade: "A", stars: 4, review: 4.4, reviewCount: 61  },
      { name: "Docker",      stack: "DevOps",    grade: "B", stars: 3, review: 4.1, reviewCount: 49  },
    ],
  },
  {
    title: "AI & ML",
    color: "accent",
    skills: [
      { name: "Python",      stack: "Language",  grade: "S", stars: 5, review: 4.9, reviewCount: 142 },
      { name: "LangChain",   stack: "AI/LLM",   grade: "A", stars: 4, review: 4.7, reviewCount: 88  },
      { name: "PyTorch",     stack: "ML",        grade: "A", stars: 4, review: 4.5, reviewCount: 72  },
      { name: "TensorFlow",  stack: "ML",        grade: "B", stars: 3, review: 4.2, reviewCount: 58  },
      { name: "R",           stack: "Analytics", grade: "B", stars: 3, review: 3.9, reviewCount: 34  },
      { name: "Java",        stack: "Language",  grade: "C", stars: 2, review: 3.5, reviewCount: 22  },
      { name: "C++",         stack: "Language",  grade: "C", stars: 2, review: 3.4, reviewCount: 18  },
    ],
  },
  {
    title: "Tools & Practices",
    color: "primary",
    skills: [
      { name: "Git",               stack: "VCS",      grade: "S", stars: 5, review: 4.9, reviewCount: 156 },
      { name: "CI/CD",             stack: "DevOps",   grade: "A", stars: 4, review: 4.6, reviewCount: 91  },
      { name: "AWS",               stack: "Cloud",    grade: "A", stars: 4, review: 4.5, reviewCount: 84  },
      { name: "GCP",               stack: "Cloud",    grade: "B", stars: 3, review: 4.1, reviewCount: 47  },
      { name: "Azure",             stack: "Cloud",    grade: "B", stars: 3, review: 4.0, reviewCount: 43  },
      { name: "Agile",             stack: "Process",  grade: "A", stars: 4, review: 4.7, reviewCount: 102 },
      { name: "TDD",               stack: "Testing",  grade: "B", stars: 3, review: 4.2, reviewCount: 55  },
      { name: "Security Auditing", stack: "Security", grade: "B", stars: 3, review: 4.3, reviewCount: 38  },
      { name: "Code Review",       stack: "Process",  grade: "A", stars: 4, review: 4.8, reviewCount: 119 },
    ],
  },
];

/* ── Star row ── */
const StarRow = ({ value, max = 5, color, delay = 0 }: {
  value: number; max?: number; color: string; delay?: number;
}) => {
  const order = Array.from({ length: max }, (_, i) => i).sort(() => Math.random() - 0.5);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        const rank = order.indexOf(i);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4, rotate: (rank % 2 === 0 ? 1 : -1) * (20 + rank * 15) }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: delay + rank * 0.08, ease: [0.23, 1, 0.32, 1] }}
            style={{ width: "14px", height: "14px", position: "relative", flexShrink: 0 }}
          >
            {/* Empty star — always visible */}
            <Star style={{ position: "absolute", top: 0, left: 0, width: "14px", height: "14px", color: "hsl(var(--border))" }} />
            {/* Filled star — clipped from the LEFT, growing rightward */}
            {fill > 0 && (
              <Star style={{
                position: "absolute", top: 0, left: 0, width: "14px", height: "14px",
                color: `hsl(var(--${color}))`, fill: `hsl(var(--${color}))`,
                clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)`,
              }} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

const gradeLabel: Record<Skill["grade"], string> = { S: "Expert", A: "Advanced", B: "Proficient", C: "Familiar" };
const gradeColor: Record<Skill["grade"], string> = {
  S: "text-primary border-primary/40 bg-primary/10",
  A: "text-accent border-accent/40 bg-accent/10",
  B: "text-foreground/70 border-border bg-muted/40",
  C: "text-muted-foreground border-border/50 bg-muted/20",
};

/* ── Skill card with auto-cycling highlight + gyroscope mouse tilt ── */
const SkillCard = ({ cat, ci }: {
  cat: (typeof skillCategories)[number]; ci: number;
}) => {
  const [activeRow, setActiveRow] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Gyroscope tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 26, damping: 28 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 26, damping: 28 });
  const rotZ = useSpring(useTransform(mx, [-0.5, 0.5], [-1.5, 1.5]), { stiffness: 20, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  useEffect(() => {
    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setActiveRow(r => (r + 1) % cat.skills.length);
      }, 1100);
    }, ci * 370);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cat.skills.length, ci]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 48, rotateY: ci === 0 ? 0 : ci === 1 ? -10 : 10 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 * ci, ease: [0.23, 1, 0.32, 1] }}
      style={{ rotateX: rotX, rotateY: rotY, rotateZ: rotZ, transformStyle: "preserve-3d", perspective: 900,
        boxShadow: `0 20px 50px -15px hsl(var(--${cat.color}) / 0.14), inset 0 1px 0 hsl(var(--${cat.color}) / 0.08)` }}
      className="rounded-xl border border-border surface-3d overflow-hidden"
      whileHover={{ translateZ: 16, transition: { duration: 3.0 } }}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between"
        style={{ background: `hsl(var(--${cat.color}) / 0.06)` }}>
        <h3 className="font-ui text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: `hsl(var(--${cat.color}))` }}>{cat.title}</h3>
        <div className="flex gap-3 font-ui text-[9px] font-semibold tracking-wider uppercase text-muted-foreground">
          <span>Self</span><span>Stack</span><span>Review</span>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border/50">
        {cat.skills.map((skill, si) => {
          const isActive = si === activeRow;
          return (
            <motion.div key={skill.name}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.04 * si + 0.08 * ci }}
              animate={{ backgroundColor: isActive ? `hsl(var(--${cat.color}) / 0.07)` : "transparent" }}
              whileHover={{ x: 5, backgroundColor: `hsl(var(--${cat.color}) / 0.1)`, transition: { duration: 1.5 } }}
              className="px-4 py-3 flex items-center gap-3 relative overflow-hidden cursor-default"
            >
              {/* Shimmer sweep */}
              <AnimatePresence>
                {isActive && (
                  <motion.div key="shimmer"
                    initial={{ x: "-100%", opacity: 0.7 }}
                    animate={{ x: "220%", opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.85, ease: "easeOut" }}
                    className="absolute inset-y-0 w-1/3 pointer-events-none"
                    style={{ background: `linear-gradient(90deg, transparent, hsl(var(--${cat.color}) / 0.2), transparent)` }}
                  />
                )}
              </AnimatePresence>

              {/* Grade */}
              <span className={`font-ui text-[9px] font-bold w-[58px] shrink-0 px-1.5 py-0.5 rounded text-center border ${gradeColor[skill.grade]}`}>
                {gradeLabel[skill.grade]}
              </span>

              {/* Name */}
              <span className="font-ui text-[12px] font-semibold text-foreground flex-1 truncate min-w-0">
                {skill.name}
              </span>

              {/* Self stars */}
              <StarRow value={skill.stars} color={cat.color} delay={0.04 * si} />

              {/* Stack tag */}
              <span className="font-ui text-[9px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded border shrink-0"
                style={{
                  color: `hsl(var(--${cat.color}) / 0.9)`,
                  borderColor: `hsl(var(--${cat.color}) / 0.28)`,
                  background: `hsl(var(--${cat.color}) / 0.07)`,
                }}>
                {skill.stack}
              </span>

              {/* Divider */}
              <div className="w-px h-4 bg-border/60 shrink-0" />

              {/* Review */}
              <div className="flex items-center gap-1 shrink-0">
                <StarRow value={skill.review} color={cat.color} delay={0.04 * si + 0.12} />
                <span className="font-ui text-[10px] font-bold text-muted-foreground">{skill.review.toFixed(1)}</span>
                <span className="font-body text-[9px] text-muted-foreground/55 font-light">({skill.reviewCount})</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ── Connector lines for the triangle ── */
const TriangleConnectors = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} aria-hidden>
    <defs>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
      </linearGradient>
    </defs>
    {/* Left diagonal: top-center → bottom-left */}
    <line x1="50%" y1="0" x2="25%" y2="100%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="6 5" />
    {/* Right diagonal: top-center → bottom-right */}
    <line x1="50%" y1="0" x2="75%" y2="100%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="6 5" />
    {/* Bottom horizontal */}
    <line x1="25%" y1="100%" x2="75%" y2="100%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="6 5" />
  </svg>
);

const SkillsSection = () => (
  <section id="skills" className="py-32 px-6 scene-3d">
    <div className="max-w-6xl mx-auto">
      {/* Heading */}
      <motion.div initial={{ opacity: 0, y: 40, rotateX: 12 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
        <p className="font-ui text-primary text-[11px] font-semibold tracking-[0.4em] uppercase mb-3">Skills</p>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4 leading-none">
          My <span className="text-gradient">tech stack</span>.
        </h2>
        <p className="font-body text-muted-foreground text-sm font-light mb-14">
          Self-rating + peer / client evaluation scores across all technologies.
        </p>
      </motion.div>

      {/* Triangle layout */}
      <div className="relative flex flex-col items-center gap-6">
        <TriangleConnectors />

        {/* Apex — Full Stack (centered, narrower) */}
        <div className="relative z-10 w-full max-w-xl">
          <SkillCard cat={skillCategories[0]} ci={0} />
        </div>

        {/* Base row — AI & ML + Tools & Practices */}
        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillCard cat={skillCategories[1]} ci={1} />
          <SkillCard cat={skillCategories[2]} ci={2} />
        </div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
