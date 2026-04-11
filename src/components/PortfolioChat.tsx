import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

/* ── Knowledge base ─────────────────────────────────────────── */
type QA = { q: string; a: string; tags: string[] };

const KB: QA[] = [
  {
    q: "Who are you?",
    a: "I'm Ethan Potter — a Senior Full Stack & AI Engineer born and raised in Hong Kong 🇭🇰. I've been building production software for 8+ years, starting as a Full Stack developer and expanding into AI engineering from 2022 onwards.",
    tags: ["who", "about", "ethan", "potter", "yourself", "introduce", "name"],
  },
  {
    q: "What do you specialise in?",
    a: "I specialise in two areas:\n\n**Full Stack** — React, TypeScript, Next.js, Node.js, PostgreSQL, GraphQL, and edge-native architectures on Cloudflare Workers.\n\n**AI Engineering** — RAG systems, agentic pipelines (LangGraph), multimodal AI, LLM integration (OpenAI, Hugging Face), and MLOps on AWS SageMaker.",
    tags: ["specialise", "specialize", "expertise", "focus", "do", "work", "stack", "tech"],
  },
  {
    q: "How many years of experience do you have?",
    a: "8+ years total:\n\n• **2017–2021** — Full Stack Developer (Junior → Senior)\n• **2022–2023** — Full Stack & AI Engineer at an AI-first product company\n• **2024–Present** — Senior Full Stack & AI Engineer, independent consulting",
    tags: ["years", "experience", "long", "how long", "career", "history"],
  },
  {
    q: "What projects have you built?",
    a: "I've built 40+ projects. My featured ones are:\n\n**Full Stack:**\n• **CollabFlow** — Real-time SaaS workspace on Cloudflare Workers (<50ms globally)\n• **ShopStream** — Headless commerce engine handling 10k+ concurrent sessions\n• **DevPulse** — Observability dashboard processing 1M+ events/sec\n\n**AI:**\n• **ContextIQ** — RAG assistant with 94% accuracy, reduced support tickets by 35%\n• **CodeReview AI** — Agentic PR reviewer catching 87% of issues\n• **VoiceCanvas** — Multimodal studio: speech → image → voice in <8 seconds",
    tags: ["projects", "built", "portfolio", "work", "collabflow", "shopstream", "devpulse", "contextiq", "codereview", "voicecanvas"],
  },
  {
    q: "Tell me about CollabFlow",
    a: "**CollabFlow** is a production-grade multi-tenant SaaS workspace.\n\n• Real-time collaborative editing using CRDT conflict resolution\n• Role-based access control at both API and UI layers\n• Live presence indicators (avatar stacks, cursor positions)\n• Built on **Next.js 15 + Hono + Cloudflare Workers** — sub-50ms globally, zero cold starts\n• **Turso (libSQL)** for distributed SQLite with per-tenant isolation",
    tags: ["collabflow", "saas", "workspace", "realtime", "collaborative"],
  },
  {
    q: "Tell me about ContextIQ",
    a: "**ContextIQ** is a production RAG (Retrieval-Augmented Generation) system.\n\n• Ingests PDFs, Notion exports, Confluence pages, and any text\n• Hybrid retrieval: **pgvector** (semantic) + **BM25** (keyword) fused with Reciprocal Rank Fusion\n• **94% accuracy** on internal benchmarks\n• Reduced support ticket volume by **35%** in the first month\n• Every answer includes inline citations with source, page number, and exact passage\n• Built with **LangChain + FastAPI + OpenAI**",
    tags: ["contextiq", "rag", "retrieval", "knowledge", "documents", "langchain"],
  },
  {
    q: "Tell me about CodeReview AI",
    a: "**CodeReview AI** is an autonomous code review agent.\n\n• Reads the PR diff, surrounding codebase, and commit history\n• Built on **LangGraph** — stateful multi-step reasoning loop\n• Detects OWASP Top 10 vulnerabilities, injection risks, auth bypass\n• Posts inline GitHub comments distinguishing blocking issues vs suggestions\n• **87% issue detection rate**, <8% false positives\n• Powered by **GPT-4o** with streaming via Vercel AI SDK",
    tags: ["codereview", "code review", "agent", "pr", "pull request", "security", "langgraph"],
  },
  {
    q: "Tell me about VoiceCanvas",
    a: "**VoiceCanvas** is a browser-based multimodal AI studio.\n\n• Speak an idea → watch it become an image → hear it narrated back in a cloned voice\n• **Whisper** (STT) transcribes in real time via WebRTC\n• **Stable Diffusion XL** generates images with progressive streaming previews\n• **ElevenLabs** synthesises speech with voice cloning from a 30-second sample\n• Full pipeline completes in **under 8 seconds** end-to-end",
    tags: ["voicecanvas", "multimodal", "voice", "image", "speech", "whisper", "elevenlabs", "stable diffusion"],
  },
  {
    q: "What are your strongest skills?",
    a: "My **Expert (S-grade)** skills are:\n\n**Full Stack:** React · TypeScript · Next.js · Git\n**AI/ML:** Python\n\nMy **Advanced (A-grade)** skills include Node.js, PostgreSQL, GraphQL, LangChain, PyTorch, AWS, CI/CD, Agile, and Code Review.\n\nPeer review scores: React 4.9★, Python 4.9★, Git 4.9★, Next.js 4.9★ — all based on 97–156 verified client reviews.",
    tags: ["skills", "strongest", "best", "expert", "proficient", "tech stack", "languages"],
  },
  {
    q: "What is your education background?",
    a: "**Bachelor of Science** — Computer Science & Software Engineering\nVocational Training Council · 2014–2017 · GPA 3.7/4.0 · Dean's List 3 years\n\n**Professional Certificate** — AI & Deep Learning\nCoursera / deeplearning.ai · 2018–2019 · Average score 97.2%\n\n**AWS Certified Solutions Architect** — Associate\nAmazon Web Services · 2022",
    tags: ["education", "degree", "university", "study", "gpa", "aws", "certificate", "background"],
  },
  {
    q: "What do clients say about you?",
    a: "My overall client rating is **4.96 / 5.0** across 10 verified reviews. A few highlights:\n\n• *\"Genuinely one of the best engineers we've ever contracted.\"* — Sarah Mitchell, CTO, Nexlayer Inc.\n• *\"The RAG system cut our support ticket volume by 35% in the first month.\"* — James Okafor, Head of AI, DeepMind Ventures\n• *\"He thinks like a founder, not just a developer.\"* — Aiko Tanaka, Founder, VoiceAI Labs\n• *\"The edge-native architecture is a masterclass in modern infrastructure.\"* — Tom Blackwell, Platform Architect",
    tags: ["clients", "reviews", "testimonials", "feedback", "rating", "say", "opinion"],
  },
  {
    q: "Are you available for hire?",
    a: "Yes! I'm available for:\n\n• **Remote contracts** — full-time or part-time\n• **On-site projects** in Hong Kong and internationally\n• **Consulting** on AI adoption, architecture reviews, and technical strategy\n\nThe best way to reach me is at **polishchukserhii702@gmail.com** or via the Contact form on this page.",
    tags: ["available", "hire", "freelance", "contract", "work", "job", "opportunity", "remote"],
  },
  {
    q: "How can I contact you?",
    a: "You can reach me at:\n\n📧 **polishchukserhii702@gmail.com**\n🐙 **github.com/polishchukserhii702-alt**\n\nOr use the **Contact** form on this page — it sends directly to me via Google Chat. I typically respond within 24 hours.",
    tags: ["contact", "email", "reach", "message", "get in touch", "connect"],
  },
  {
    q: "What technologies do you use for AI?",
    a: "My AI/ML toolkit:\n\n**LLM Integration:** OpenAI (GPT-4o), Hugging Face, Vercel AI SDK\n**Orchestration:** LangChain, LangGraph (agentic workflows)\n**Vector Search:** pgvector, hybrid BM25 + semantic retrieval\n**Speech/Vision:** Whisper (STT), Stable Diffusion XL, ElevenLabs TTS\n**MLOps:** AWS SageMaker, FastAPI, Python (Pandas, SQLAlchemy)\n**Deployment:** Serverless edge, Docker, Terraform",
    tags: ["ai", "ml", "machine learning", "llm", "openai", "langchain", "vector", "tools", "technologies"],
  },
  {
    q: "What is your hourly rate?",
    a: "My rates vary depending on the scope and duration of the engagement. For accurate pricing, please reach out directly at **polishchukserhii702@gmail.com** with a brief description of your project — I'll get back to you within 24 hours with a tailored proposal.",
    tags: ["rate", "price", "cost", "hourly", "fee", "charge", "budget"],
  },
  {
    q: "Where are you based?",
    a: "I'm based in **Hong Kong SAR** 🇭🇰 (UTC+8). I work with clients globally — fully remote-friendly across all time zones. I'm also open to on-site engagements in Hong Kong and occasional travel for key projects.",
    tags: ["based", "location", "where", "hong kong", "timezone", "country", "city"],
  },
];

/* ── Suggested questions shown in the panel ── */
const SUGGESTIONS = [
  "Who are you?",
  "What projects have you built?",
  "What are your strongest skills?",
  "Are you available for hire?",
  "What do clients say about you?",
  "How can I contact you?",
];

/* ── Simple keyword matcher ── */
const findAnswer = (input: string): string => {
  const q = input.toLowerCase().trim();
  // Exact or near-exact match first
  for (const item of KB) {
    if (item.tags.some(t => q.includes(t) || t.includes(q))) {
      return item.a;
    }
  }
  // Fallback
  return "I don't have a specific answer for that, but I'd love to chat! Reach me at **polishchukserhii702@gmail.com** or use the Contact form on this page. I respond within 24 hours. 😊";
};

/* ── Markdown-lite renderer ── */
const renderText = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold
    const parts = line.split(/\*\*(.*?)\*\*/g);
    const rendered = parts.map((p, j) =>
      j % 2 === 1 ? <strong key={j} className="text-foreground font-semibold">{p}</strong> : p
    );
    if (line.startsWith("•")) {
      return (
        <div key={i} className="flex gap-2 items-start">
          <span className="text-primary mt-0.5 shrink-0">›</span>
          <span>{rendered}</span>
        </div>
      );
    }
    if (line === "") return <div key={i} className="h-1.5" />;
    return <div key={i}>{rendered}</div>;
  });
};

/* ── Message type ── */
type Msg = { role: "user" | "bot"; text: string; id: number };

let msgId = 0;

/* ── Chat panel ── */
const ChatPanel = ({ onClose }: { onClose: () => void }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      id: msgId++,
      text: "Hi! 👋 I'm Ethan's AI assistant. Ask me anything about his portfolio, skills, projects, or availability — or pick a question below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setShowSuggestions(false);
    const userMsg: Msg = { role: "user", text: text.trim(), id: msgId++ };
    setMsgs(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const answer = findAnswer(text);
      setTyping(false);
      setMsgs(prev => [...prev, { role: "bot", text: answer, id: msgId++ }]);
    }, 600 + Math.random() * 400);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  // Theme-aware color tokens
  const panelBg    = isDark ? "linear-gradient(160deg, hsl(220 22% 10%) 0%, hsl(220 22% 7%) 100%)"
                            : "linear-gradient(160deg, hsl(0 0% 100%) 0%, hsl(210 25% 97%) 100%)";
  const panelShadow= isDark ? "0 32px 80px -16px hsl(220 30% 1% / 0.8), 0 0 0 1px hsl(var(--primary) / 0.12), inset 0 1px 0 hsl(255 100% 100% / 0.06)"
                            : "0 16px 60px -12px hsl(220 20% 60% / 0.25), 0 0 0 1px hsl(var(--primary) / 0.15)";
  const headerBg   = isDark ? "hsl(var(--primary) / 0.06)" : "hsl(var(--primary) / 0.05)";
  const botBubbleBg= isDark ? "hsl(220 22% 13%)" : "hsl(210 25% 95%)";
  const botBubbleBd= isDark ? "1px solid hsl(220 14% 20%)" : "1px solid hsl(210 20% 86%)";
  const botBubbleFg= isDark ? "hsl(210 20% 92%)" : "hsl(220 25% 12%)";
  const userBubbleBg= isDark ? "linear-gradient(135deg, hsl(var(--primary) / 0.18), hsl(var(--accent) / 0.12))"
                             : "linear-gradient(135deg, hsl(var(--primary) / 0.14), hsl(var(--accent) / 0.08))";
  const userBubbleBd= isDark ? "1px solid hsl(var(--primary) / 0.2)" : "1px solid hsl(var(--primary) / 0.25)";
  const userBubbleFg= isDark ? "hsl(210 20% 92%)" : "hsl(220 25% 10%)";
  const typingBg   = isDark ? "hsl(220 22% 13%)" : "hsl(210 25% 95%)";
  const typingBd   = isDark ? "1px solid hsl(220 14% 20%)" : "1px solid hsl(210 20% 86%)";
  const suggBg     = isDark ? "hsl(220 22% 11%)" : "hsl(210 20% 94%)";
  const inputAreaBg= isDark ? "hsl(220 22% 8%)" : "hsl(210 20% 96%)";
  const sendDisabledBg = isDark ? "hsl(220 14% 16%)" : "hsl(210 20% 88%)";
  const sendDisabledFg = isDark ? "hsl(215 12% 40%)" : "hsl(215 12% 55%)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20, originX: 1, originY: 1 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 16 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className="fixed bottom-24 right-6 z-[200] w-[360px] max-w-[calc(100vw-24px)] rounded-2xl border border-border overflow-hidden flex flex-col"
      style={{
        background: panelBg,
        boxShadow: panelShadow,
        maxHeight: "min(560px, calc(100vh - 120px))",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/60"
        style={{ background: headerBg }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.15))", boxShadow: "0 0 16px hsl(var(--primary) / 0.2)" }}>
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-ui text-xs font-bold text-foreground leading-tight">Ethan's AI Assistant</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-body text-[9px] text-muted-foreground font-light">Online · Powered by portfolio knowledge</span>
            </div>
          </div>
        </div>
        <motion.button onClick={onClose} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
          className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0"
        style={{ scrollbarWidth: "thin", scrollbarColor: "hsl(var(--border)) transparent" }}>
        {msgs.map(msg => (
          <motion.div key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {/* Avatar */}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              msg.role === "bot" ? "bg-primary/15 border border-primary/20" : "bg-accent/15 border border-accent/20"
            }`}>
              {msg.role === "bot"
                ? <Bot className="w-3 h-3 text-primary" />
                : <User className="w-3 h-3 text-accent" />}
            </div>
            {/* Bubble */}
            <div
              className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl font-body text-[12px] leading-[1.7] font-light space-y-0.5 ${
                msg.role === "bot" ? "rounded-tl-sm" : "rounded-tr-sm"
              }`}
              style={{
                background: msg.role === "bot" ? botBubbleBg : userBubbleBg,
                border: msg.role === "bot" ? botBubbleBd : userBubbleBd,
                color: msg.role === "bot" ? botBubbleFg : userBubbleFg,
              }}
            >
              {renderText(msg.text)}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="flex gap-2.5 items-center">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary/15 border border-primary/20 shrink-0">
              <Bot className="w-3 h-3 text-primary" />
            </div>
            <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm flex gap-1 items-center"
              style={{ background: typingBg, border: typingBd }}>
              {[0, 1, 2].map(i => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/60"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Suggestions */}
        {showSuggestions && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }} className="pt-1">
            <p className="font-ui text-[9px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Suggested questions
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map(s => (
                <motion.button key={s} onClick={() => send(s)}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="font-ui text-[10px] font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-150"
                  style={{ background: suggBg }}>
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-border"
        style={{ background: inputAreaBg }}>
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask me anything…"
            className="flex-1 bg-transparent font-body text-[12px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none py-1.5 px-1"
          />
          <motion.button
            onClick={() => send(input)}
            disabled={!input.trim() || typing}
            whileHover={input.trim() ? { scale: 1.08 } : {}}
            whileTap={input.trim() ? { scale: 0.93 } : {}}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0"
            style={{
              background: input.trim()
                ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))"
                : sendDisabledBg,
              boxShadow: input.trim() ? "0 0 16px hsl(var(--primary) / 0.35)" : "none",
            }}>
            <Send className="w-3.5 h-3.5"
              style={{ color: input.trim() ? "hsl(220 20% 4%)" : sendDisabledFg }} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Floating trigger button ── */
const PortfolioChat = () => {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleOpen = () => { setOpen(true); setPulse(false); };

  const fabClosedBg  = isDark ? "linear-gradient(135deg, hsl(220 22% 14%), hsl(220 22% 10%))"
                               : "linear-gradient(135deg, hsl(210 20% 94%), hsl(210 20% 90%))";
  const fabClosedShadow = isDark ? "0 8px 32px hsl(220 30% 1% / 0.6), 0 0 0 1px hsl(var(--border))"
                                 : "0 4px 20px hsl(220 20% 60% / 0.2), 0 0 0 1px hsl(var(--border))";
  const tooltipBg = isDark ? "hsl(220 22% 10%)" : "hsl(0 0% 100%)";
  const tooltipShadow = isDark ? "0 8px 24px hsl(220 30% 1% / 0.5)" : "0 4px 20px hsl(220 20% 60% / 0.2)";

  return (
    <>
      <AnimatePresence>{open && <ChatPanel onClose={() => setOpen(false)} />}</AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={open ? () => setOpen(false) : handleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: open ? fabClosedBg : "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
          boxShadow: open ? fabClosedShadow : "0 8px 32px hsl(var(--primary) / 0.4), 0 0 0 1px hsl(var(--primary) / 0.2)",
        }}
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-5 h-5 text-foreground" />
            </motion.div>
          ) : (
            <motion.div key="open"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-5 h-5" style={{ color: "hsl(220 20% 4%)" }} />
            </motion.div>
          )}
        </AnimatePresence>

        {pulse && !open && (
          <>
            <motion.div className="absolute inset-0 rounded-2xl"
              animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              style={{ background: "hsl(var(--primary))" }} />
            <motion.div className="absolute inset-0 rounded-2xl"
              animate={{ scale: [1, 1.8], opacity: [0.25, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
              style={{ background: "hsl(var(--primary))" }} />
          </>
        )}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {pulse && !open && (
          <motion.div
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }} transition={{ delay: 1.5, duration: 0.4 }}
            className="fixed bottom-8 right-24 z-[199] pointer-events-none"
          >
            <div className="px-3 py-1.5 rounded-xl border border-border font-ui text-[11px] font-semibold text-foreground whitespace-nowrap"
              style={{ background: tooltipBg, boxShadow: tooltipShadow }}>
              Ask me about Ethan ✨
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border-r border-t border-border"
                style={{ background: tooltipBg }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioChat;
