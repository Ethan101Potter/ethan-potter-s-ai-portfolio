import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";
import { useHoverLight } from "@/hooks/use-hover-light";
import { LightFlow } from "@/components/LightFlow";

type Course = { name: string; grade: string };
type EducationEntry = {
  period: string;
  degree: string;
  field: string;
  institution: string;
  gpa?: string;
  honors?: string;
  icon: React.ElementType;
  color: string;
  courses: Course[];
};

const education: EducationEntry[] = [
  {
    period: "2014 — 2017",
    degree: "Bachelor of Science",
    field: "Computer Science & Software Engineering",
    institution: "Vocational Training Council",
    gpa: "3.7 / 4.0",
    honors: "Dean's List — 2015, 2016, 2017",
    icon: GraduationCap,
    color: "primary",
    courses: [
      { name: "Data Structures & Algorithms", grade: "A" },
      { name: "Database Systems", grade: "A" },
      { name: "Web Application Development", grade: "A+" },
      { name: "Operating Systems", grade: "A−" },
      { name: "Software Engineering Principles", grade: "A" },
      { name: "Computer Networks", grade: "B+" },
      { name: "Machine Learning Fundamentals", grade: "A" },
      { name: "Capstone Project", grade: "A+" },
    ],
  },
  {
    period: "2018 — 2019",
    degree: "Professional Certificate",
    field: "Artificial Intelligence & Deep Learning",
    institution: "Coursera — deeplearning.ai",
    icon: BookOpen,
    color: "accent",
    courses: [
      { name: "Neural Networks & Deep Learning", grade: "98%" },
      { name: "Improving Deep Neural Networks", grade: "96%" },
      { name: "Structuring ML Projects", grade: "100%" },
      { name: "Convolutional Neural Networks", grade: "97%" },
      { name: "Sequence Models", grade: "95%" },
    ],
  },
  {
    period: "2022",
    degree: "Certification",
    field: "AWS Certified Solutions Architect — Associate",
    institution: "Amazon Web Services",
    icon: Award,
    color: "primary",
    courses: [
      { name: "Cloud Architecture & Design", grade: "Pass" },
      { name: "Security & Compliance", grade: "Pass" },
      { name: "High Availability & Fault Tolerance", grade: "Pass" },
    ],
  },
];

const gradeColor = (g: string) => {
  if (g === "A+" || g === "100%" || g === "Pass") return "text-primary font-bold";
  if (g.startsWith("A") || parseInt(g) >= 95) return "text-accent font-semibold";
  return "text-muted-foreground";
};

const EducationCard = ({ entry, i }: { entry: EducationEntry; i: number }) => {
  const Icon = entry.icon;
  const light = useHoverLight();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10, rotateY: i % 2 === 0 ? -22 : 22, rotateZ: i % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.12 * i, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ translateZ: 22, rotateX: -5, rotateY: i % 2 === 0 ? 4 : -4, rotateZ: i % 2 === 0 ? 1 : -1, scale: 1.015, transition: { duration: 3.0 } }}
      ref={light.ref}
      {...light.handlers}
      className="relative rounded-xl border border-border surface-3d overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        boxShadow: `0 20px 50px -15px hsl(var(--${entry.color}) / 0.12), inset 0 1px 0 hsl(var(--${entry.color}) / 0.08)`,
      }}
    >
      <LightFlow hovered={light.hovered} spotX={light.spotX} spotY={light.spotY} color={entry.color as "primary"|"accent"} />
      <div className="h-0.5 w-full relative z-30" style={{ background: `linear-gradient(90deg, hsl(var(--${entry.color})), transparent)` }} />
      <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-start gap-4 relative z-30">
        <motion.div
          className="p-2.5 rounded-lg w-fit"
          style={{ background: `hsl(var(--${entry.color}) / 0.12)`, boxShadow: `0 0 20px hsl(var(--${entry.color}) / 0.2)` }}
          whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 4.0 } }}
        >
          <Icon className="w-5 h-5" style={{ color: `hsl(var(--${entry.color}))` }} />
        </motion.div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-ui text-[11px] font-medium text-muted-foreground tracking-wide">{entry.period}</span>
            {entry.gpa && (
              <span className="font-ui text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary" style={{ boxShadow: "0 0 10px hsl(var(--primary)/0.2)" }}>
                GPA {entry.gpa}
              </span>
            )}
          </div>
          <h3 className="font-display text-xl font-bold text-foreground leading-tight">{entry.degree}</h3>
          <p className="font-ui text-sm font-semibold mt-0.5" style={{ color: `hsl(var(--${entry.color}) / 0.9)` }}>{entry.field}</p>
          <p className="font-body text-xs text-muted-foreground mt-0.5 font-light">{entry.institution}</p>
          {entry.honors && <p className="font-ui text-xs text-accent mt-1.5 font-medium">🏅 {entry.honors}</p>}
        </div>
      </div>
      <div className="p-6 relative z-30">
        <p className="font-ui text-[9px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3">Key Courses</p>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0">
          {entry.courses.map((c, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.04 * j + 0.1 * i }}
              whileHover={{ x: 6, transition: { duration: 1.5 } }}
              className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0"
            >
              <span className="font-body text-sm text-foreground/80 font-light">{c.name}</span>
              <span className={`font-ui text-xs font-bold ml-4 shrink-0 ${gradeColor(c.grade)}`}>{c.grade}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const EducationSection = () => {
  return (
    <section id="education" className="py-32 px-6 scene-3d">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-ui text-primary text-[11px] font-semibold tracking-[0.4em] uppercase mb-3">Education</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-16 leading-none">
            Academic <span className="text-gradient">background</span>.
          </h2>
        </motion.div>
        <div className="space-y-6">
          {education.map((entry, i) => (
            <EducationCard key={i} entry={entry} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
