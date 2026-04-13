import { motion } from "framer-motion";
import { Layers, Brain } from "lucide-react";
import { useHoverLight } from "@/hooks/use-hover-light";
import { LightFlow } from "@/components/LightFlow";

type Role = {
  period: string;
  title: string;
  company: string;
  type: "fullstack" | "ai";
  bullets: string[];
};

const experiences: Role[] = [
  {
    period: "Jan 2017 – Dec 2018",
    title: "Junior Full Stack Developer",
    company: "Freelance & Agency Projects",
    type: "fullstack",
    bullets: [
      "Built and shipped client-facing web apps using React and Node.js/Express, covering both UI and REST API layers.",
      "Designed relational schemas in PostgreSQL and MySQL; wrote optimized queries for reporting dashboards.",
      "Integrated third-party APIs (Stripe, Twilio, SendGrid) and maintained CI/CD pipelines on GitHub Actions.",
    ],
  },
  {
    period: "Jan 2019 – Dec 2020",
    title: "Full Stack Developer",
    company: "Mid-size Product Startup",
    type: "fullstack",
    bullets: [
      "Led front-end architecture migration from CRA to Next.js, reducing TTFB by 40% across core pages.",
      "Developed microservices in Node.js and containerized them with Docker; orchestrated deployments on AWS ECS.",
      "Implemented WebSocket-based real-time features (notifications, live dashboards) serving 20k+ daily active users.",
      "Mentored two junior developers and introduced code-review standards that cut regression bugs by 30%.",
    ],
  },
  {
    period: "Jan 2021 – Dec 2021",
    title: "Senior Full Stack Developer",
    company: "B2B SaaS Company",
    type: "fullstack",
    bullets: [
      "Owned end-to-end delivery of a multi-tenant SaaS platform — from database design to production deployment.",
      "Architected a GraphQL API layer with DataLoader batching, eliminating N+1 query patterns at scale.",
      "Drove performance audits that improved Lighthouse scores from 62 to 94 across the product suite.",
      "Collaborated with product and design to define technical requirements and sprint planning.",
    ],
  },
  {
    period: "Jan 2022 – Dec 2023",
    title: "Full Stack & AI Engineer",
    company: "AI-First Product Company",
    type: "ai",
    bullets: [
      "Integrated OpenAI and Hugging Face models into production web apps, building prompt-engineering pipelines and streaming UIs with the Vercel AI SDK.",
      "Designed and deployed a RAG system using LangChain, pgvector, and FastAPI — reducing support ticket volume by 35% through intelligent document search.",
      "Built automated data pipelines with Python (Pandas, SQLAlchemy) feeding ML model training workflows on AWS SageMaker.",
      "Maintained full-stack ownership: Next.js front end, tRPC API, PostgreSQL, and Terraform-managed cloud infra.",
    ],
  },
  {
    period: "Jan 2024 – Present",
    title: "Senior Full Stack & AI Engineer",
    company: "Independent Consulting",
    type: "ai",
    bullets: [
      "Architected agentic AI systems using LangGraph and multi-step reasoning loops for autonomous task execution across client workflows.",
      "Built multimodal pipelines combining Whisper (STT), Stable Diffusion XL, and ElevenLabs TTS, deployed on serverless edge infrastructure.",
      "Delivered edge-native full-stack applications on Cloudflare Workers + Hono with Drizzle ORM and Turso, achieving sub-50ms global response times.",
      "Advised clients on AI adoption strategy, model evaluation, and responsible deployment practices.",
    ],
  },
];

const badgeConfig = {
  fullstack: { label: "Full Stack", icon: Layers, className: "text-primary border-primary/40 bg-primary/10" },
  ai: { label: "Full Stack & AI", icon: Brain, className: "text-accent border-accent/40 bg-accent/10" },
};

const ExperienceCard = ({ exp, i }: { exp: Role; i: number }) => {
  const badge = badgeConfig[exp.type];
  const BadgeIcon = badge.icon;
  const light = useHoverLight();
  const color = exp.type === "ai" ? "accent" : "primary";
  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, x: -40, rotateY: -8 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.23, 1, 0.32, 1] }}
      className="relative pl-12"
    >
      <motion.div
        className={`absolute left-2.5 top-2 w-3 h-3 rounded-full border-2 bg-background border-${color}`}
        style={{ boxShadow: `0 0 12px hsl(var(--${color}) / 0.6)` }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
      />
      <motion.div
        ref={light.ref}
        {...light.handlers}
        whileHover={{ x: 8, scale: 1.01, rotateZ: 0.6, translateZ: 14, boxShadow: `0 24px 60px -8px hsl(var(--${color}) / 0.3), 0 0 0 1px hsl(var(--${color}) / 0.15)`, transition: { duration: 2.0 } }}
        className="relative p-5 rounded-xl border border-border surface-3d overflow-hidden"
        style={{ boxShadow: `0 8px 32px -8px hsl(var(--${color}) / 0.1)`, transformStyle: "preserve-3d" }}
      >
        <LightFlow hovered={light.hovered} spotX={light.spotX} spotY={light.spotY} color={color} />
        <div className="relative z-30">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <span className="font-ui text-[11px] font-medium text-muted-foreground tracking-wide">{exp.period}</span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-ui font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border ${badge.className}`}>
              <BadgeIcon className="w-3 h-3" />
              {badge.label}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-foreground leading-tight">{exp.title}</h3>
          <p className="font-ui text-sm font-medium text-primary/80 mb-3">{exp.company}</p>
          <ul className="space-y-1.5">
            {exp.bullets.map((b, j) => (
              <li key={j} className="font-body text-sm text-muted-foreground leading-[1.7] flex gap-2 font-light">
                <span className="mt-2 w-1 h-1 rounded-full bg-muted-foreground/50 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-32 px-6 scene-3d" style={{ perspective: "1600px" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-ui text-primary text-[11px] font-semibold tracking-[0.4em] uppercase mb-3">Experience</p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4 leading-none">
            What I <span className="text-gradient">bring</span> to the table.
          </h2>
          <p className="font-body text-muted-foreground text-sm font-light mb-16">
            8+ years building production software — from full-stack web apps to AI-powered systems.
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, hsl(var(--primary)/0.6), hsl(var(--accent)/0.6))" }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
