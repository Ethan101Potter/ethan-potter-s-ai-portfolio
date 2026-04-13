import { motion, useAnimationFrame, useMotionValue, AnimatePresence } from "framer-motion";
import { Star, Quote, X, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { useHoverLight } from "@/hooks/use-hover-light";
import { LightFlow } from "@/components/LightFlow";

type Review = {
  name: string;
  role: string;
  company: string;
  avatar: string;
  photo: string;
  rating: number;
  text: string;
  detail: string;
  project: string;
  date: string;
  color: "primary" | "accent";
};

const reviews: Review[] = [
  {
    name: "Alex Mitchell", role: "CTO", company: "Nexlayer Inc.",
    avatar: "AM", photo: "https://randomuser.me/api/portraits/men/44.jpg",
    rating: 5,
    text: "Ethan delivered our entire SaaS platform in record time. The code quality was exceptional — clean architecture, full test coverage, and zero critical bugs at launch.",
    detail: "Working with Ethan was a transformative experience for our engineering team. He didn't just write code — he shaped our entire technical strategy. From the initial architecture review to the final deployment, every decision was deliberate and well-reasoned. He introduced us to edge-native patterns we hadn't considered, and the result was a platform that handles 10x our original load estimate without breaking a sweat. His communication was proactive, his estimates were accurate, and he flagged risks before they became problems. Genuinely one of the best engineers we've ever contracted.",
    project: "CollabFlow SaaS", date: "Mar 2025", color: "primary",
  },
  {
    name: "James Okafor", role: "Head of AI", company: "DeepMind Ventures",
    avatar: "JO", photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "The RAG system Ethan built cut our support ticket volume by 35% in the first month. The hybrid retrieval approach was exactly what we needed — precise, fast, and fully auditable.",
    detail: "We had tried two other vendors before Ethan, and neither could get the retrieval accuracy above 70%. Ethan's hybrid vector + BM25 approach with Reciprocal Rank Fusion pushed us to 94% on our internal benchmark. More importantly, every answer comes with inline citations so our compliance team can audit any response. He also built a document versioning system we hadn't asked for but immediately realized we needed. The FastAPI backend is clean, well-documented, and our own engineers can maintain it without his help. That's the mark of a true professional.",
    project: "ContextIQ RAG", date: "Jan 2025", color: "accent",
  },
  {
    name: "Priya Sharma", role: "Product Manager", company: "ShopBase",
    avatar: "PS", photo: "https://randomuser.me/api/portraits/men/68.jpg",
    rating: 5,
    text: "Our headless commerce migration was seamless. Ethan handled everything from architecture to deployment, and the performance gains were immediate — page loads dropped from 4s to under 800ms.",
    detail: "We were on a legacy Magento setup that was costing us conversions every day. Ethan proposed a full headless migration to Next.js App Router with Upstash Redis for cart state, and delivered it in 6 weeks — on time and under budget. The checkout conversion rate improved by 22% in the first month post-launch, which more than justified the investment. He also set up automatic preview environments for every PR, which completely changed how our design team reviews changes. I'd hire him again without hesitation.",
    project: "ShopStream Commerce", date: "Nov 2024", color: "primary",
  },
  {
    name: "Lucas Fernández", role: "Engineering Lead", company: "Pulse Systems",
    avatar: "LF", photo: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    text: "DevPulse transformed how our team handles incidents. We went from 45-minute MTTR down to under 8 minutes. The observability dashboard is intuitive and the anomaly detection is surprisingly accurate.",
    detail: "Before DevPulse, our on-call engineers were jumping between four different tools to diagnose an incident. Now everything is in one timeline — logs, traces, metrics, and the anomaly alert that triggered the page. Ethan built the ClickHouse ingestion pipeline to handle our peak load of 1.2M events per second without breaking a sweat. The Grafana embedding was a smart touch — our existing dashboards still work, but now they're contextually linked to the incident timeline. The ROI on this project was visible within the first week.",
    project: "DevPulse Dashboard", date: "Oct 2024", color: "accent",
  },
  {
    name: "Aiko Tanaka", role: "Founder", company: "VoiceAI Labs",
    avatar: "AT", photo: "https://randomuser.me/api/portraits/men/90.jpg",
    rating: 5,
    text: "The multimodal pipeline Ethan built is genuinely magical. Speak an idea, get an image, hear it narrated back — all in under 8 seconds. Our demo conversion rate tripled after we launched VoiceCanvas.",
    detail: "I came to Ethan with a napkin sketch and a tight deadline. He turned it into a production-ready studio in 5 weeks. The technical challenges were significant — streaming progressive image previews, real-time WebRTC audio, voice cloning with ElevenLabs — and he solved each one elegantly. What impressed me most was his product instinct. He suggested the progressive image streaming (showing the diffusion steps as they happen) rather than waiting for the final result, and that single UX decision became the most-talked-about feature in our launch. He thinks like a founder.",
    project: "VoiceCanvas Studio", date: "Sep 2024", color: "primary",
  },
  {
    name: "Daniel Weiss", role: "VP Engineering", company: "CodeCraft GmbH",
    avatar: "DW", photo: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    text: "CodeReview AI caught a critical SQL injection vulnerability in our codebase that had been there for two years. The agent's reasoning is transparent and the inline GitHub comments are exactly what our team needed.",
    detail: "We were skeptical that an AI agent could do meaningful code review, but Ethan's implementation changed our minds. The LangGraph reasoning loop is genuinely sophisticated — it reads the PR diff in context of the surrounding codebase, not just the changed lines. The distinction between blocking issues and suggestions is critical for our team's workflow. In the first month, it caught 23 security issues across 140 PRs, including that SQL injection that had survived two human reviews. Our senior engineers now use it as a first-pass filter, which frees them to focus on architecture and design feedback.",
    project: "CodeReview AI", date: "Aug 2024", color: "accent",
  },
  {
    name: "Mia Johansson", role: "Tech Lead", company: "Nordik Digital",
    avatar: "MJ", photo: "https://randomuser.me/api/portraits/men/17.jpg",
    rating: 4.8,
    text: "Ethan's TypeScript and Next.js expertise is top-tier. He refactored our entire frontend in 3 weeks, introduced proper type safety throughout, and the codebase is now a joy to work in.",
    detail: "Our frontend was a 3-year-old Create React App codebase with almost no TypeScript coverage and a component library that had grown organically into a mess. Ethan came in, assessed the situation, and proposed a phased migration plan that let us ship features while refactoring. He introduced strict TypeScript, a proper design token system, and a component architecture that our junior developers can actually follow. The bundle size dropped by 40% as a side effect of the cleanup. He also wrote thorough documentation for every architectural decision, which is rare and invaluable.",
    project: "Frontend Architecture", date: "Jul 2024", color: "primary",
  },
  {
    name: "Carlos Reyes", role: "Data Scientist", company: "Analytix Corp",
    avatar: "CR", photo: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 4.9,
    text: "The ML pipeline Ethan built on SageMaker is rock solid. Data flows cleanly from ingestion to training to deployment, and the monitoring dashboards give us full visibility.",
    detail: "Our data science team is strong on modeling but weak on MLOps. Ethan bridged that gap perfectly. He built a pipeline that takes raw data from our S3 buckets, runs it through a Pandas/SQLAlchemy preprocessing layer, triggers SageMaker training jobs, and automatically deploys the best-performing model to a FastAPI endpoint — all with full observability. Model deployment time went from 2 days of manual work to 45 minutes of automated pipeline. He also set up drift detection so we get alerted when model performance degrades in production. This is infrastructure that will serve us for years.",
    project: "ML Data Pipeline", date: "Jun 2024", color: "accent",
  },
  {
    name: "Fatima Al-Hassan", role: "CEO", company: "Launchpad MENA",
    avatar: "FA", photo: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
    text: "We hired Ethan to build our MVP from scratch. In 6 weeks we had a fully functional product with auth, payments, real-time features, and a polished UI. He thinks like a founder, not just a developer.",
    detail: "As a non-technical founder, I was nervous about hiring a developer for such a critical project. Ethan immediately put me at ease by asking the right questions — not about technology, but about our users, our business model, and our growth assumptions. He made technology choices that matched our stage: fast to build, easy to iterate, cheap to run. When we needed to pivot our core feature in week 4, he adapted without drama. We launched on time, raised our seed round two months later, and our investors specifically called out the product quality. I credit Ethan for that.",
    project: "MVP Full Stack Build", date: "Apr 2024", color: "primary",
  },
  {
    name: "Tom Blackwell", role: "Platform Architect", company: "CloudNine SaaS",
    avatar: "TB", photo: "https://randomuser.me/api/portraits/men/64.jpg",
    rating: 4.9,
    text: "The edge-native architecture Ethan designed on Cloudflare Workers is a masterclass in modern infrastructure. Sub-50ms globally, zero cold starts, and the Drizzle ORM integration is clean and maintainable.",
    detail: "We had a traditional Node.js monolith that was struggling with latency for our international users. Ethan proposed a full migration to Cloudflare Workers with Turso for distributed SQLite and Drizzle ORM for type-safe queries. The migration was complex — we had 200+ API endpoints — but Ethan's phased approach meant we could migrate incrementally without downtime. The results exceeded our expectations: p99 latency dropped from 800ms to 45ms globally, our infrastructure bill dropped by 60%, and the codebase is significantly simpler. He also wrote a detailed architecture decision record that our team references constantly.",
    project: "Edge Infrastructure", date: "Feb 2024", color: "accent",
  },
];

/* ── Star display ── */
const StarDisplay = ({ value, color, delay = 0, size = "md" }: {
  value: number; color: "primary" | "accent"; delay?: number; size?: "sm" | "md";
}) => {
  const px = size === "sm" ? 12 : 14;
  const order = Array.from({ length: 5 }, (_, i) => i).sort(() => Math.random() - 0.5);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        const rank = order.indexOf(i);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4, rotate: (rank % 2 === 0 ? 1 : -1) * (20 + rank * 15) }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: delay + rank * 0.09, ease: [0.23, 1, 0.32, 1] }}
            style={{ width: `${px}px`, height: `${px}px`, position: "relative", flexShrink: 0 }}
          >
            {/* Empty star */}
            <Star style={{ position: "absolute", top: 0, left: 0, width: `${px}px`, height: `${px}px`, color: "hsl(var(--border))" }} />
            {/* Filled star — clipped from the LEFT, growing rightward */}
            {fill > 0 && (
              <Star style={{
                position: "absolute", top: 0, left: 0, width: `${px}px`, height: `${px}px`,
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

/* ── Avatar with photo + fallback initials ── */
const Avatar = ({ review, size = "md" }: { review: Review; size?: "sm" | "md" | "lg" }) => {
  const [imgError, setImgError] = useState(false);
  const dim = size === "lg" ? "w-12 h-12" : size === "md" ? "w-9 h-9" : "w-7 h-7";
  const txt = size === "lg" ? "text-xs" : "text-[10px]";
  return imgError ? (
    <div className={`${dim} rounded-full flex items-center justify-center font-ui ${txt} font-bold shrink-0`}
      style={{ background: `hsl(var(--${review.color}) / 0.18)`, color: `hsl(var(--${review.color}))`, boxShadow: `0 0 12px hsl(var(--${review.color}) / 0.25)` }}>
      {review.avatar}
    </div>
  ) : (
    <img
      src={review.photo}
      alt={review.name}
      onError={() => setImgError(true)}
      className={`${dim} rounded-full object-cover shrink-0`}
      style={{ boxShadow: `0 0 0 2px hsl(var(--${review.color}) / 0.35), 0 0 12px hsl(var(--${review.color}) / 0.2)` }}
    />
  );
};

/* ── Detail modal ── */
const ReviewModal = ({ review, onClose }: { review: Review; onClose: () => void }) => (
  <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }} onClick={onClose}>
    <div className="absolute inset-0 bg-background/85 backdrop-blur-2xl" />
    <motion.div
      className="relative z-10 w-full max-w-xl rounded-2xl border border-border surface-3d overflow-hidden"
      initial={{ opacity: 0, scale: 0.88, y: 40, rotateX: 14, rotateY: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 16, rotateX: 6 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      style={{ boxShadow: `0 40px 100px -20px hsl(var(--${review.color}) / 0.35), 0 0 0 1px hsl(var(--${review.color}) / 0.15)` }}
      onClick={e => e.stopPropagation()}
    >
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, hsl(var(--${review.color})), hsl(var(--${review.color === "primary" ? "accent" : "primary"})))` }} />
      <div className="relative h-28 overflow-hidden">
        {[0,1,2].map(i => (
          <motion.div key={i} className="absolute rounded-full blur-3xl"
            style={{ width: 160 + i*50, height: 160 + i*50, background: `hsl(var(--${i%2===0 ? review.color : review.color === "primary" ? "accent" : "primary"}) / 0.2)`, left: `${i*30}%`, top: "-40%" }}
            animate={{ x: [0, 20*(i%2===0?1:-1), 0], y: [0, 12, 0] }}
            transition={{ duration: 5+i*1.5, repeat: Infinity, ease: "easeInOut", delay: i*0.6 }} />
        ))}
        <div className="absolute inset-0 flex items-end p-5">
          <div className="flex items-center gap-3">
            <Avatar review={review} size="lg" />
            <div>
              <p className="font-ui text-sm font-bold text-foreground leading-tight">{review.name}</p>
              <p className="font-body text-xs text-muted-foreground font-light">{review.role} · {review.company}</p>
            </div>
          </div>
        </div>
        <motion.button onClick={onClose} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 w-7 h-7 rounded-full border border-border bg-background/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-3.5 h-3.5" />
        </motion.button>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <StarDisplay value={review.rating} color={review.color} delay={0.1} />
            <span className="font-ui text-xs font-bold" style={{ color: `hsl(var(--${review.color}))` }}>{review.rating.toFixed(1)}</span>
          </div>
          <div className="text-right">
            <p className="font-ui text-[9px] font-semibold tracking-wider uppercase" style={{ color: `hsl(var(--${review.color}) / 0.8)` }}>{review.project}</p>
            <p className="font-body text-[9px] text-muted-foreground/60 font-light">{review.date}</p>
          </div>
        </div>
        <p className="font-body text-sm text-foreground/80 leading-[1.7] mb-4 italic font-light border-l-2 pl-3"
          style={{ borderColor: `hsl(var(--${review.color}) / 0.4)` }}>
          "{review.text}"
        </p>
        <motion.p className="font-body text-sm text-muted-foreground leading-[1.85] font-light"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, ease: [0.23, 1, 0.32, 1] }}>
          {review.detail}
        </motion.p>
      </div>
    </motion.div>
  </motion.div>
);

/* ── Single review card ── */
const ReviewCard = ({ review, index, onOpen }: { review: Review; index: number; onOpen: (r: Review) => void }) => {
  const light = useHoverLight();
  return (
  <motion.div
    ref={light.ref}
    {...light.handlers}
    initial={{ opacity: 0, y: 48, rotateX: 10, rotateY: index % 2 === 0 ? -5 : 5 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay: 0.05 * (index % 4), ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ translateZ: 18, rotateX: -4, rotateY: index % 2 === 0 ? 3 : -3, rotateZ: index % 3 === 0 ? 1.5 : index % 3 === 1 ? -1 : 0.5, scale: 1.02, transition: { duration: 3.0 } }}
    className="relative rounded-2xl border border-border surface-3d p-5 flex flex-col gap-3 overflow-hidden group"
    style={{ transformStyle: "preserve-3d", boxShadow: `0 16px 40px -12px hsl(var(--${review.color}) / 0.1), inset 0 1px 0 hsl(var(--${review.color}) / 0.07)` }}
  >
    <LightFlow hovered={light.hovered} spotX={light.spotX} spotY={light.spotY} color={review.color} />
    <div className="absolute top-0 left-0 right-0 h-0.5 z-30" style={{ background: `linear-gradient(90deg, hsl(var(--${review.color})), transparent)` }} />
    <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl opacity-[0.08] pointer-events-none" style={{ background: `hsl(var(--${review.color}))` }} />
    <div className="relative z-30 flex items-start justify-between">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `hsl(var(--${review.color}) / 0.12)`, boxShadow: `0 0 12px hsl(var(--${review.color}) / 0.15)` }}>
        <Quote className="w-3.5 h-3.5" style={{ color: `hsl(var(--${review.color}))` }} />
      </div>
      <div className="flex items-center gap-1.5">
        <StarDisplay value={review.rating} color={review.color} delay={0.04 * index} size="sm" />
        <span className="font-ui text-[10px] font-bold" style={{ color: `hsl(var(--${review.color}))` }}>{review.rating.toFixed(1)}</span>
      </div>
    </div>
    <p className="relative z-30 font-body text-sm text-muted-foreground leading-[1.75] font-light flex-1 line-clamp-3">
      "{review.text}"
    </p>
    <div className="relative z-30 flex items-center gap-2.5 pt-2.5 border-t border-border/50">
      <Avatar review={review} size="md" />
      <div className="flex-1 min-w-0">
        <p className="font-ui text-[11px] font-semibold text-foreground truncate">{review.name}</p>
        <p className="font-body text-[10px] text-muted-foreground font-light truncate">{review.role} · {review.company}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-ui text-[9px] font-semibold tracking-wider uppercase" style={{ color: `hsl(var(--${review.color}) / 0.7)` }}>{review.project}</p>
        <p className="font-body text-[9px] text-muted-foreground/50 font-light">{review.date}</p>
      </div>
    </div>
    <motion.button
      onClick={() => onOpen(review)}
      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
      className="relative z-30 w-full mt-1 py-2 rounded-xl border font-ui text-[11px] font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5"
      style={{ borderColor: `hsl(var(--${review.color}) / 0.3)`, background: `hsl(var(--${review.color}) / 0.06)`, color: `hsl(var(--${review.color}))` }}
    >
      Read Full Review
      <ChevronDown className="w-3 h-3" />
    </motion.button>
  </motion.div>
  );
};

/* ── Marquee strip ── */
const MarqueeStrip = ({ onOpen }: { onOpen: (r: Review) => void }) => {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const items = [...reviews, ...reviews];

  useAnimationFrame((_, delta) => {
    if (paused) return;
    const container = containerRef.current;
    if (!container) return;
    const halfWidth = container.scrollWidth / 2;
    const next = x.get() - (36 * delta) / 1000;
    x.set(next <= -halfWidth ? 0 : next);
  });

  return (
    <div className="overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <motion.div ref={containerRef} style={{ x }} className="flex gap-4 w-max">
        {items.map((review, i) => (
          <div key={i} className="w-[320px] shrink-0">
            <ReviewCard review={review} index={i} onOpen={onOpen} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ── Section ── */
const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

const ReviewsSection = () => {
  const [active, setActive] = useState<Review | null>(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <section id="reviews" className="py-32 overflow-hidden scene-3d">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40, rotateX: 12 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="mb-14">
            <p className="font-ui text-primary text-[11px] font-semibold tracking-[0.4em] uppercase mb-3">Client Reviews</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-none mb-6">
              What clients <span className="text-gradient">say</span>.
            </h2>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-5 px-6 py-4 rounded-2xl border border-border surface-3d">
              <div>
                <p className="font-display text-5xl font-extrabold leading-none text-gradient">{avgRating}</p>
                <p className="font-body text-xs text-muted-foreground font-light mt-1">out of 5.0</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <StarDisplay value={parseFloat(avgRating)} color="primary" delay={0.3} />
                <p className="font-ui text-[11px] text-muted-foreground mt-1.5">
                  Based on <span className="text-foreground font-semibold">{reviews.length} verified reviews</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, hsl(var(--background)), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(270deg, hsl(var(--background)), transparent)" }} />
          <MarqueeStrip onOpen={setActive} />
        </div>

        <motion.div className="flex justify-center mt-12 px-6"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          <motion.button
            onClick={() => setShowAll(true)}
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px hsl(var(--primary)/0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-10 py-3.5 rounded-xl border border-primary/40 font-ui text-sm font-semibold tracking-wide text-primary transition-all duration-200"
            style={{ background: "hsl(var(--primary) / 0.08)" }}
          >
            <ChevronDown className="w-4 h-4" />
            View All {reviews.length} Reviews
          </motion.button>
        </motion.div>
      </section>

      <AnimatePresence>
        {showAll && (
          <motion.div className="fixed inset-0 z-[150] flex flex-col"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}>
            <div className="absolute inset-0 bg-background/90 backdrop-blur-2xl" onClick={() => setShowAll(false)} />
            <div className="relative z-10 flex flex-col h-full max-w-5xl mx-auto w-full px-6 py-10">
              <div className="flex items-center justify-between mb-8 shrink-0">
                <div className="flex items-center gap-4">
                  <h2 className="font-display text-3xl font-extrabold leading-none">All Reviews</h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border surface-3d">
                    <StarDisplay value={parseFloat(avgRating)} color="primary" />
                    <span className="font-ui text-xs font-bold text-gradient">{avgRating}</span>
                    <span className="font-body text-xs text-muted-foreground font-light">· {reviews.length} reviews</span>
                  </div>
                </div>
                <motion.button onClick={() => setShowAll(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full border border-border bg-background/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="overflow-y-auto flex-1 pr-1">
                <div className="grid gap-5 md:grid-cols-2 pb-6">
                  {reviews.map((review, i) => (
                    <ReviewCard key={review.name} review={review} index={i} onOpen={setActive} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && <ReviewModal review={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
};

export default ReviewsSection;
