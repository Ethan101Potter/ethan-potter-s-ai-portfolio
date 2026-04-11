import { motion } from "framer-motion";
import { Star } from "lucide-react";

type Skill = {
  name: string;
  grade: "S" | "A" | "B" | "C";
  stars: number;       // self-rating 1–5
  review: number;      // customer/peer rating 1–5 (can be decimal)
  reviewCount: number;
};

/* Map grade → self star rating */
const gradeStars: Record<Skill["grade"], number> = { S: 5, A: 4, B: 3, C: 2 };

const skillCategories: { title: string; color: string; skills: Skill[] }[] = [
  {
    title: "Full Stack",
    color: "primary",
    skills: [
      { name: "React",       grade: "S", stars: 5, review: 4.9, reviewCount: 128 },
      { name: "TypeScript",  grade: "S", stars: 5, review: 4.8, reviewCount: 114 },
      { name: "Next.js",     grade: "S", stars: 5, review: 4.9, reviewCount: 97  },
      { name: "Node.js",     grade: "A", stars: 4, review: 4.6, reviewCount: 83  },
      { name: "PostgreSQL",  grade: "A", stars: 4, review: 4.5, reviewCount: 76  },
      { name: "GraphQL",     grade: "A", stars: 4, review: 4.4, reviewCount: 61  },
      { name: "Docker",      grade: "B", stars: 3, review: 4.1, reviewCount: 49  },
    ],
  },
  {
    title: "AI & ML",
    color: "accent",
    skills: [
      { name: "Python",      grade: "S", stars: 5, review: 4.9, reviewCount: 142 },
      { name: "LangChain",   grade: "A", stars: 4, review: 4.7, reviewCount: 88  },
      { name: "PyTorch",     grade: "A", stars: 4, review: 4.5, reviewCount: 72  },
      { name: "TensorFlow",  grade: "B", stars: 3, review: 4.2, reviewCount: 58  },
      { name: "R",           grade: "B", stars: 3, review: 3.9, reviewCount: 34  },
      { name: "Java",        grade: "C", stars: 2, review: 3.5, reviewCount: 22  },
      { name: "C++",         grade: "C", stars: 2, review: 3.4, reviewCount: 18  },
    ],
  },
  {
    title: "Tools & Practices",
    color: "primary",
    skills: [
      { name: "Git",               grade: "S", stars: 5, review: 4.9, reviewCount: 156 },
      { name: "CI/CD",             grade: "A", stars: 4, review: 4.6, reviewCount: 91  },
      { name: "AWS",               grade: "A", stars: 4, review: 4.5, reviewCount: 84  },
      { name: "GCP",               grade: "B", stars: 3, review: 4.1, reviewCount: 47  },
      { name: "Azure",             grade: "B", stars: 3, review: 4.0, reviewCount: 43  },
      { name: "Agile",             grade: "A", stars: 4, review: 4.7, reviewCount: 102 },
      { name: "TDD",               grade: "B", stars: 3, review: 4.2, reviewCount: 55  },
      { name: "Security Auditing", grade: "B", stars: 3, review: 4.3, reviewCount: 38  },
      { name: "Code Review",       grade: "A", stars: 4, review: 4.8, reviewCount: 119 },
    ],
  },
];

/* Animated star row */
const StarRow = ({
  value,
  max = 5,
  color,
  size = "sm",
  delay = 0,
}: {
  value: number;
  max?: number;
  color: string;
  size?: "sm" | "xs";
  delay?: number;
}) => {
  const sz = size === "xs" ? "w-3 h-3" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            {/* Empty star */}
            <Star className={`${sz} text-border`} />
            {/* Filled overlay */}
            {fill > 0 && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  className={sz}
                  style={{ color: `hsl(var(--${color}))`, fill: `hsl(var(--${color}))` }}
                />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

const gradeLabel: Record<Skill["grade"], string> = {
  S: "Expert", A: "Advanced", B: "Proficient", C: "Familiar",
};

const gradeColor: Record<Skill["grade"], string> = {
  S: "text-primary border-primary/40 bg-primary/10",
  A: "text-accent border-accent/40 bg-accent/10",
  B: "text-foreground/70 border-border bg-muted/40",
  C: "text-muted-foreground border-border/50 bg-muted/20",
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 px-6 scene-3d">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-ui text-primary text-[11px] font-semibold tracking-[0.4em] uppercase mb-3">Skills</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4 leading-none">
            My <span className="text-gradient">tech stack</span>.
          </h2>
          <p className="font-body text-muted-foreground text-sm font-light mb-14">
            Self-rating + peer / client evaluation scores across all technologies.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40, rotateY: ci === 1 ? 0 : ci === 0 ? -12 : 12 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.12 * ci, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ translateZ: 12, rotateX: -3, transition: { duration: 0.3 } }}
              className="rounded-xl border border-border surface-3d overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: `0 20px 50px -15px hsl(var(--${cat.color}) / 0.12), inset 0 1px 0 hsl(var(--${cat.color}) / 0.08)`,
              }}
            >
              {/* Card header */}
              <div
                className="px-5 py-4 border-b border-border flex items-center justify-between"
                style={{ background: `hsl(var(--${cat.color}) / 0.06)` }}
              >
                <h3
                  className="font-ui text-xs font-bold tracking-[0.2em] uppercase"
                  style={{ color: `hsl(var(--${cat.color}))` }}
                >
                  {cat.title}
                </h3>
                <div className="flex gap-3 font-ui text-[9px] font-semibold tracking-wider uppercase text-muted-foreground">
                  <span>Skill</span>
                  <span>Review</span>
                </div>
              </div>

              {/* Skill rows */}
              <div className="divide-y divide-border/50">
                {cat.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 * si + 0.1 * ci }}
                    className="px-5 py-3 flex items-center gap-3 group hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Grade badge */}
                    <span
                      className={`font-ui text-[9px] font-bold w-14 shrink-0 px-1.5 py-0.5 rounded text-center border ${gradeColor[skill.grade]}`}
                    >
                      {gradeLabel[skill.grade]}
                    </span>

                    {/* Name */}
                    <span className="font-ui text-[12px] font-medium text-foreground flex-1 truncate">
                      {skill.name}
                    </span>

                    {/* Self stars */}
                    <StarRow
                      value={skill.stars}
                      color={cat.color}
                      size="xs"
                      delay={0.05 * si}
                    />

                    {/* Divider */}
                    <div className="w-px h-4 bg-border/60 shrink-0" />

                    {/* Review stars + score */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <StarRow
                        value={skill.review}
                        color={cat.color}
                        size="xs"
                        delay={0.05 * si + 0.15}
                      />
                      <span className="font-ui text-[10px] font-bold text-muted-foreground">
                        {skill.review.toFixed(1)}
                      </span>
                      <span className="font-body text-[9px] text-muted-foreground/60 font-light">
                        ({skill.reviewCount})
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
