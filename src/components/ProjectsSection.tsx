import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useInView } from "framer-motion";
import { Layers, Brain, ExternalLink, Bot, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

/* ── Reusable human figure ─────────────────────────────────── */
// A minimal flat-style person: head + torso + arms, seated at a desk or standing
const Figure = ({
  x, y, scale = 1, color, facing = "right", pose = "typing",
}: {
  x: number; y: number; scale?: number; color: string; facing?: "left"|"right"; pose?: "typing"|"standing"|"pointing"|"thinking";
}) => {
  const flip = facing === "left" ? `scale(-1,1) translate(${-2*x - 32*scale},0)` : "";
  const s = scale;
  // head
  const hx = x + 16*s, hy = y;
  // body
  const bx = x + 8*s, by = y + 22*s;
  // arms vary by pose
  const arms: JSX.Element[] = [];
  if (pose === "typing") {
    arms.push(<line key="la" x1={x+8*s} y1={by+10*s} x2={x-4*s} y2={by+22*s} stroke={color} strokeWidth={3*s} strokeLinecap="round"/>);
    arms.push(<line key="ra" x1={x+24*s} y1={by+10*s} x2={x+36*s} y2={by+22*s} stroke={color} strokeWidth={3*s} strokeLinecap="round"/>);
  } else if (pose === "pointing") {
    arms.push(<line key="la" x1={x+8*s} y1={by+10*s} x2={x-2*s} y2={by+20*s} stroke={color} strokeWidth={3*s} strokeLinecap="round"/>);
    arms.push(<line key="ra" x1={x+24*s} y1={by+8*s} x2={x+44*s} y2={by+2*s} stroke={color} strokeWidth={3*s} strokeLinecap="round"/>);
  } else if (pose === "thinking") {
    arms.push(<line key="la" x1={x+8*s} y1={by+10*s} x2={x-2*s} y2={by+22*s} stroke={color} strokeWidth={3*s} strokeLinecap="round"/>);
    arms.push(<line key="ra" x1={x+24*s} y1={by+8*s} x2={x+30*s} y2={by+2*s} stroke={color} strokeWidth={3*s} strokeLinecap="round"/>);
    arms.push(<circle key="hand" cx={x+30*s} cy={by+1*s} r={3*s} fill={color} fillOpacity="0.6"/>);
  } else {
    // standing
    arms.push(<line key="la" x1={x+8*s} y1={by+8*s} x2={x+2*s} y2={by+24*s} stroke={color} strokeWidth={3*s} strokeLinecap="round"/>);
    arms.push(<line key="ra" x1={x+24*s} y1={by+8*s} x2={x+30*s} y2={by+24*s} stroke={color} strokeWidth={3*s} strokeLinecap="round"/>);
  }
  // legs
  const legs = pose === "typing"
    ? [<line key="ll" x1={x+12*s} y1={by+32*s} x2={x+8*s} y2={by+48*s} stroke={color} strokeWidth={3*s} strokeLinecap="round"/>,
       <line key="rl" x1={x+20*s} y1={by+32*s} x2={x+24*s} y2={by+48*s} stroke={color} strokeWidth={3*s} strokeLinecap="round"/>]
    : [<line key="ll" x1={x+12*s} y1={by+32*s} x2={x+8*s} y2={by+52*s} stroke={color} strokeWidth={3*s} strokeLinecap="round"/>,
       <line key="rl" x1={x+20*s} y1={by+32*s} x2={x+24*s} y2={by+52*s} stroke={color} strokeWidth={3*s} strokeLinecap="round"/>];

  return (
    <g transform={flip} opacity="0.82">
      {/* head */}
      <circle cx={hx} cy={hy+8*s} r={8*s} fill={color} fillOpacity="0.25" stroke={color} strokeWidth={1.5*s}/>
      {/* body */}
      <rect x={bx} y={by} width={16*s} height={32*s} rx={5*s} fill={color} fillOpacity="0.18" stroke={color} strokeWidth={1.5*s}/>
      {arms}
      {legs}
    </g>
  );
};

/* ── SVG project illustrations ─────────────────────────────── */
const ProjectImage = ({ id, color }: { id: string; color: "primary" | "accent" }) => {
  const c = color === "primary" ? "hsl(174 80% 52%)" : "hsl(265 70% 65%)";
  const c2 = color === "primary" ? "hsl(265 70% 65%)" : "hsl(174 80% 52%)";

  const images: Record<string, JSX.Element> = {
    CollabFlow: (
      <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="220" fill="hsl(220 22% 9%)"/>
        {[0,1,2,3,4,5,6].map(i=><line key={i} x1={i*60} y1="0" x2={i*60} y2="220" stroke={c} strokeOpacity="0.06"/>)}
        {[0,1,2,3].map(i=><line key={i} x1="0" y1={i*60} x2="400" y2={i*60} stroke={c} strokeOpacity="0.06"/>)}
        {/* Main editor window */}
        <rect x="30" y="24" width="220" height="150" rx="10" fill="hsl(220 22% 12%)" stroke={c} strokeOpacity="0.3" strokeWidth="1"/>
        <rect x="30" y="24" width="220" height="28" rx="10" fill={c} fillOpacity="0.12"/>
        <circle cx="48" cy="38" r="5" fill={c} fillOpacity="0.6"/>
        <circle cx="64" cy="38" r="5" fill={c2} fillOpacity="0.4"/>
        <circle cx="80" cy="38" r="5" fill="hsl(220 14% 30%)"/>
        {[0,1,2,3,4,5].map(i=><rect key={i} x="46" y={64+i*16} width={80+Math.sin(i)*40} height="5" rx="2.5" fill={c} fillOpacity={0.15+i*0.04}/>)}
        <rect x="46" y="64" width="2" height="12" rx="1" fill={c}><animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite"/></rect>
        <circle cx="200" cy="38" r="9" fill={c} fillOpacity="0.8"/>
        <text x="200" y="42" textAnchor="middle" fill="hsl(220 20% 4%)" fontSize="8" fontWeight="bold">A</text>
        <circle cx="218" cy="38" r="9" fill={c2} fillOpacity="0.8"/>
        <text x="218" y="42" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">B</text>
        <rect x="268" y="24" width="100" height="150" rx="10" fill="hsl(220 22% 11%)" stroke={c} strokeOpacity="0.2" strokeWidth="1"/>
        {[0,1,2,3].map(i=><rect key={i} x="280" y={44+i*28} width="76" height="18" rx="6" fill={c} fillOpacity={0.06+i*0.03}/>)}
        {[0,1,2,3].map(i=><circle key={i} cx="290" cy={53+i*28} r="4" fill={c} fillOpacity="0.5"/>)}
        <path d="M250 99 Q259 99 268 99" stroke={c} strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 3"/>
        <ellipse cx="140" cy="110" rx="80" ry="40" fill={c} fillOpacity="0.04"/>
        {/* Developer figure — seated, typing at the editor */}
        <Figure x={-8} y={148} scale={0.72} color={c} facing="right" pose="typing"/>
        {/* Second collaborator — right side, pointing at panel */}
        <Figure x={340} y={148} scale={0.65} color={c2} facing="left" pose="pointing"/>
      </svg>
    ),
    ShopStream: (
      <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="220" fill="hsl(220 22% 9%)"/>
        {[0,1,2,3,4,5,6].map(i=><line key={i} x1={i*60} y1="0" x2={i*60} y2="220" stroke={c} strokeOpacity="0.05"/>)}
        {[[30,20],[150,20],[270,20],[30,120],[150,120],[270,120]].map(([x,y],i)=>(
          <g key={i}>
            <rect x={x} y={y} width="100" height="85" rx="8" fill="hsl(220 22% 12%)" stroke={c} strokeOpacity="0.2" strokeWidth="1"/>
            <rect x={x} y={y} width="100" height="48" rx="8" fill={c} fillOpacity={0.08+i*0.02}/>
            <rect x={x+8} y={y+56} width="60" height="5" rx="2.5" fill={c} fillOpacity="0.4"/>
            <rect x={x+8} y={y+66} width="40" height="5" rx="2.5" fill={c2} fillOpacity="0.5"/>
            <rect x={x+8} y={y+76} width="84" height="5" rx="2.5" fill="hsl(220 14% 25%)"/>
          </g>
        ))}
        <rect x="310" y="16" width="72" height="36" rx="10" fill={c} fillOpacity="0.15" stroke={c} strokeOpacity="0.4" strokeWidth="1"/>
        <text x="346" y="39" textAnchor="middle" fill={c} fontSize="11" fontWeight="bold">Cart 3</text>
        <rect x="310" y="60" width="72" height="24" rx="6" fill="hsl(220 22% 14%)" stroke={c2} strokeOpacity="0.3" strokeWidth="1"/>
        <text x="346" y="76" textAnchor="middle" fill={c2} fontSize="9" fontWeight="600">Stripe ✓</text>
        <ellipse cx="200" cy="110" rx="120" ry="50" fill={c} fillOpacity="0.03"/>
        {/* Shopper figure — standing, browsing products */}
        <Figure x={168} y={148} scale={0.78} color={c2} facing="right" pose="pointing"/>
      </svg>
    ),
    DevPulse: (
      <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="220" fill="hsl(220 22% 9%)"/>
        {[0,1,2,3,4,5,6].map(i=><line key={i} x1={i*60} y1="0" x2={i*60} y2="220" stroke={c} strokeOpacity="0.05"/>)}
        {[["1M+","Events/s",0],["<1s","Query",1],["99.9%","Uptime",2]].map(([v,l,i])=>(
          <g key={String(i)}>
            <rect x={24+Number(i)*126} y="16" width="110" height="52" rx="8" fill="hsl(220 22% 12%)" stroke={c} strokeOpacity="0.25" strokeWidth="1"/>
            <text x={79+Number(i)*126} y="44" textAnchor="middle" fill={c} fontSize="18" fontWeight="800">{v}</text>
            <text x={79+Number(i)*126} y="58" textAnchor="middle" fill="hsl(215 12% 50%)" fontSize="9">{l}</text>
          </g>
        ))}
        <rect x="24" y="82" width="352" height="100" rx="10" fill="hsl(220 22% 11%)" stroke={c} strokeOpacity="0.2" strokeWidth="1"/>
        <line x1="24" y1="106" x2="376" y2="106" stroke={c} strokeOpacity="0.1" strokeWidth="1"/>
        <polyline points="40,150 80,130 120,140 160,110 200,125 240,95 280,115 320,100 360,108" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round"/>
        <polyline points="40,150 80,130 120,140 160,110 200,125 240,95 280,115 320,100 360,108 360,175 40,175" fill={c} fillOpacity="0.06"/>
        <line x1="240" y1="95" x2="240" y2="82" stroke="hsl(0 84% 60%)" strokeWidth="1.5" strokeDasharray="3 2"/>
        <circle cx="240" cy="95" r="4" fill="hsl(0 84% 60%)" fillOpacity="0.9"/>
        <rect x="220" y="84" width="40" height="14" rx="4" fill="hsl(0 84% 60%)" fillOpacity="0.15" stroke="hsl(0 84% 60%)" strokeOpacity="0.4" strokeWidth="1"/>
        <text x="240" y="94" textAnchor="middle" fill="hsl(0 84% 60%)" fontSize="7">ALERT</text>
        {[0,1,2].map(i=><rect key={i} x="36" y={112+i*10} width={200+i*30} height="4" rx="2" fill={c} fillOpacity={0.12+i*0.04}/>)}
        {/* On-call engineer — standing, pointing at the anomaly spike */}
        <Figure x={218} y={148} scale={0.68} color={c} facing="left" pose="pointing"/>
      </svg>
    ),
    ContextIQ: (
      <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="220" fill="hsl(220 22% 9%)"/>
        {[0,1,2,3,4,5,6].map(i=><line key={i} x1={i*60} y1="0" x2={i*60} y2="220" stroke={c} strokeOpacity="0.05"/>)}
        {[2,1,0].map(i=>(
          <g key={i}>
            <rect x={24+i*6} y={20+i*6} width="110" height="140" rx="8" fill="hsl(220 22% 12%)" stroke={c} strokeOpacity={0.15+i*0.1} strokeWidth="1"/>
            {i===0 && [0,1,2,3,4,5].map(j=><rect key={j} x="36" y={40+j*18} width={70+Math.sin(j)*20} height="5" rx="2.5" fill={c} fillOpacity={0.15+j*0.03}/>)}
          </g>
        ))}
        <path d="M148 90 L172 90" stroke={c} strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arr)"/>
        <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={c}/></marker></defs>
        <rect x="176" y="20" width="200" height="180" rx="10" fill="hsl(220 22% 11%)" stroke={c} strokeOpacity="0.3" strokeWidth="1"/>
        <rect x="176" y="20" width="200" height="30" rx="10" fill={c} fillOpacity="0.1"/>
        <text x="276" y="40" textAnchor="middle" fill={c} fontSize="10" fontWeight="600">ContextIQ</text>
        <rect x="188" y="62" width="130" height="28" rx="8" fill={c} fillOpacity="0.12" stroke={c} strokeOpacity="0.2" strokeWidth="1"/>
        <rect x="190" y="68" width="90" height="5" rx="2.5" fill={c} fillOpacity="0.5"/>
        <rect x="190" y="78" width="60" height="5" rx="2.5" fill={c} fillOpacity="0.3"/>
        <rect x="188" y="100" width="150" height="40" rx="8" fill="hsl(220 22% 14%)" stroke={c2} strokeOpacity="0.2" strokeWidth="1"/>
        {[0,1,2].map(i=><rect key={i} x="196" y={106+i*10} width={100+i*20} height="5" rx="2.5" fill={c2} fillOpacity={0.3+i*0.1}/>)}
        <rect x="188" y="148" width="60" height="16" rx="6" fill={c} fillOpacity="0.15" stroke={c} strokeOpacity="0.4" strokeWidth="1"/>
        <text x="218" y="160" textAnchor="middle" fill={c} fontSize="8">📄 p.12</text>
        <rect x="188" y="172" width="176" height="20" rx="8" fill="hsl(220 22% 14%)" stroke={c} strokeOpacity="0.2" strokeWidth="1"/>
        <rect x="348" y="174" width="12" height="16" rx="4" fill={c} fillOpacity="0.6"/>
        {/* Researcher figure — thinking, reading the document */}
        <Figure x={-4} y={148} scale={0.72} color={c} facing="right" pose="thinking"/>
      </svg>
    ),
    "CodeReview AI": (
      <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="220" fill="hsl(220 22% 9%)"/>
        {[0,1,2,3,4,5,6].map(i=><line key={i} x1={i*60} y1="0" x2={i*60} y2="220" stroke={c} strokeOpacity="0.05"/>)}
        <rect x="20" y="16" width="230" height="188" rx="10" fill="hsl(220 22% 11%)" stroke={c} strokeOpacity="0.25" strokeWidth="1"/>
        <rect x="20" y="16" width="230" height="28" rx="10" fill={c} fillOpacity="0.08"/>
        <text x="135" y="34" textAnchor="middle" fill={c} fontSize="9" fontWeight="600">pull_request #142</text>
        {[
          ["hsl(142 70% 45%)", "+", "const query = db.prepare(sql)"],
          ["hsl(0 70% 55%)", "-", "const q = `SELECT * ${input}`"],
          ["hsl(220 14% 35%)", " ", "return await query.run()"],
          ["hsl(220 14% 35%)", " ", "} catch(e) { log(e) }"],
          ["hsl(142 70% 45%)", "+", "validateInput(params)"],
          ["hsl(220 14% 35%)", " ", "const result = await run()"],
        ].map(([col, sym, txt], i) => (
          <g key={i}>
            <rect x="20" y={52+i*22} width="230" height="20" fill={col as string} fillOpacity="0.07"/>
            <text x="32" y={66+i*22} fill={col as string} fontSize="8" fontFamily="monospace">{sym}</text>
            <text x="44" y={66+i*22} fill="hsl(210 20% 70%)" fontSize="8" fontFamily="monospace">{txt as string}</text>
          </g>
        ))}
        <rect x="20" y="74" width="230" height="20" fill="hsl(0 84% 60%)" fillOpacity="0.12"/>
        <text x="32" y="88" fill="hsl(0 84% 60%)" fontSize="8">⚠ SQL Injection risk</text>
        <rect x="262" y="16" width="118" height="188" rx="10" fill="hsl(220 22% 11%)" stroke={c} strokeOpacity="0.2" strokeWidth="1"/>
        <text x="321" y="34" textAnchor="middle" fill={c} fontSize="9" fontWeight="600">AI Review</text>
        {[
          ["🔴","Security","Critical"],
          ["🟡","Style","Suggest"],
          ["🟢","Logic","Pass"],
          ["🔴","Auth","Critical"],
          ["🟢","Tests","Pass"],
        ].map(([icon, label, status], i) => (
          <g key={i}>
            <rect x="270" y={44+i*28} width="102" height="22" rx="6" fill="hsl(220 22% 13%)" stroke={c} strokeOpacity="0.1" strokeWidth="1"/>
            <text x="280" y={59+i*28} fill="white" fontSize="9">{icon} {label}</text>
            <text x="364" y={59+i*28} textAnchor="end" fill={status==="Critical"?"hsl(0 84% 60%)":status==="Pass"?"hsl(142 70% 45%)":"hsl(45 90% 55%)"} fontSize="8">{status}</text>
          </g>
        ))}
        {/* Security engineer — seated, reviewing the diff */}
        <Figure x={-6} y={152} scale={0.68} color={c} facing="right" pose="typing"/>
      </svg>
    ),
    VoiceCanvas: (
      <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="220" fill="hsl(220 22% 9%)"/>
        {[0,1,2,3,4,5,6].map(i=><line key={i} x1={i*60} y1="0" x2={i*60} y2="220" stroke={c} strokeOpacity="0.05"/>)}
        <rect x="20" y="16" width="170" height="60" rx="8" fill="hsl(220 22% 11%)" stroke={c} strokeOpacity="0.25" strokeWidth="1"/>
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i=>{
          const h = 8+Math.abs(Math.sin(i*0.8))*24;
          return <rect key={i} x={30+i*9} y={46-h/2} width="5" rx="2.5" height={h} fill={c} fillOpacity={0.4+Math.abs(Math.sin(i*0.8))*0.5}/>;
        })}
        <text x="105" y="68" textAnchor="middle" fill={c} fontSize="8">🎙 Recording...</text>
        <path d="M196 46 L214 46" stroke={c} strokeWidth="1.5" strokeDasharray="3 2"/>
        <path d="M196 110 L214 110" stroke={c} strokeWidth="1.5" strokeDasharray="3 2"/>
        <path d="M196 174 L214 174" stroke={c} strokeWidth="1.5" strokeDasharray="3 2"/>
        <rect x="214" y="80" width="166" height="120" rx="10" fill="hsl(220 22% 11%)" stroke={c} strokeOpacity="0.25" strokeWidth="1"/>
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>(
          <rect key={i} x={220+(i%4)*38} y={88+Math.floor(i/4)*36} width="34" height="32" rx="4"
            fill={c} fillOpacity={0.04+i*0.025} stroke={c} strokeOpacity="0.1" strokeWidth="0.5"/>
        ))}
        <text x="297" y="196" textAnchor="middle" fill={c} fontSize="8">Generating...</text>
        <rect x="20" y="88" width="170" height="50" rx="8" fill="hsl(220 22% 11%)" stroke={c2} strokeOpacity="0.25" strokeWidth="1"/>
        <text x="105" y="108" textAnchor="middle" fill={c2} fontSize="9" fontWeight="600">ElevenLabs TTS</text>
        {[0,1,2,3,4,5,6,7].map(i=>(
          <rect key={i} x={30+i*18} y={116} width="12" rx="3" height={4+Math.abs(Math.sin(i*1.2))*14} fill={c2} fillOpacity="0.5"/>
        ))}
        <rect x="20" y="152" width="170" height="28" rx="8" fill="hsl(220 22% 11%)" stroke={c} strokeOpacity="0.2" strokeWidth="1"/>
        <text x="105" y="170" textAnchor="middle" fill={c} fontSize="9">Whisper STT · WebRTC</text>
        <ellipse cx="200" cy="110" rx="100" ry="60" fill={c} fillOpacity="0.03"/>
        {/* Creator figure — standing, speaking into mic */}
        <Figure x={-4} y={148} scale={0.72} color={c2} facing="right" pose="standing"/>
      </svg>
    ),
  };

  return (
    <div className="w-full h-full">
      {images[id] ?? (
        <div className="w-full h-full flex items-center justify-center">
          <span style={{ color: c }} className="font-display text-2xl font-extrabold opacity-30">{id[0]}</span>
        </div>
      )}
    </div>
  );
};

/* ── Types & data ─────────────────────────────────────────── */
type Project = {
  title: string;
  subtitle: string;
  description: string;
  detail: string[];
  tags: string[];
  accentColor: "primary" | "accent";
  github: string;
  demo: string;
  demoLabel: string;
  demoIcon: "web" | "ai";
  stats: { label: string; value: string }[];
};

const fullStackProjects: Project[] = [
  {
    title: "CollabFlow",
    subtitle: "Real-Time SaaS Workspace",
    description: "Multi-tenant SaaS platform with real-time collaborative editing, role-based access control, and live presence indicators.",
    detail: [
      "CollabFlow is a production-grade multi-tenant workspace built for distributed teams. Every document, comment, and cursor position is synchronized in real time across all connected clients using a CRDT-based conflict resolution engine.",
      "The backend runs entirely on Cloudflare Workers at the edge, eliminating cold starts and delivering sub-50ms response times globally. Turso (libSQL) provides a distributed SQLite layer with per-tenant database isolation, while Drizzle ORM handles type-safe schema migrations.",
      "Role-based access control is enforced at both the API and UI layer — workspace owners, editors, and viewers each see a tailored interface. Live presence indicators show avatar stacks, cursor positions, and active section highlights in real time.",
      "The frontend is built on Next.js 15 with React Server Components for instant initial loads, and Hono as the lightweight edge API router. The entire stack is deployed as a single Cloudflare Pages + Workers project with zero infrastructure to manage.",
    ],
    tags: ["Next.js 15", "Hono", "Cloudflare Workers", "Turso", "Drizzle ORM"],
    accentColor: "primary",
    github: "https://github.com/polishchukserhii702-alt/collabflow",
    demo: "https://collabflow.vercel.app",
    demoLabel: "Live App",
    demoIcon: "web",
    stats: [
      { label: "Latency", value: "<50ms" },
      { label: "Tenants", value: "Multi" },
      { label: "Uptime", value: "99.9%" },
      { label: "Edge PoPs", value: "300+" },
    ],
  },
  {
    title: "ShopStream",
    subtitle: "Headless Commerce Engine",
    description: "High-performance headless e-commerce platform with server components, optimistic UI updates, and a composable checkout flow.",
    detail: [
      "ShopStream decouples the storefront from the commerce backend, giving teams full control over the customer experience without being locked into a monolithic platform. The architecture is fully composable — swap any layer independently.",
      "Built on Next.js App Router with React Server Components, product pages render at the edge with zero JavaScript overhead for the initial paint. Optimistic UI updates make cart interactions feel instantaneous, with server reconciliation happening silently in the background.",
      "The checkout flow is built as a series of composable steps powered by tRPC for end-to-end type safety between the Next.js frontend and the Node.js API. Stripe handles payments with webhook-driven order fulfillment.",
      "Upstash Redis manages session state, cart persistence, and rate limiting across 10k+ concurrent sessions. The entire stack deploys to Vercel with automatic preview environments for every pull request.",
    ],
    tags: ["Next.js App Router", "tRPC", "Stripe", "Upstash Redis", "Vercel"],
    accentColor: "accent",
    github: "https://github.com/polishchukserhii702-alt/shopstream",
    demo: "https://shopstream.vercel.app",
    demoLabel: "Live Store",
    demoIcon: "web",
    stats: [
      { label: "Concurrent", value: "10k+" },
      { label: "Cold Starts", value: "Zero" },
      { label: "Checkout Steps", value: "3" },
      { label: "Payment Methods", value: "12+" },
    ],
  },
  {
    title: "DevPulse",
    subtitle: "Observability Dashboard",
    description: "Full-stack developer observability tool that aggregates logs, traces, and metrics into a unified timeline.",
    detail: [
      "DevPulse gives engineering teams a single pane of glass for their entire production system. Logs, distributed traces, and infrastructure metrics are ingested in real time and correlated into a unified event timeline.",
      "The ingestion pipeline is built on OpenTelemetry — the emerging open standard for instrumentation — meaning any OTel-compatible service can send data without vendor lock-in. ClickHouse handles the high-throughput analytics queries with sub-second response times on billions of events.",
      "Anomaly detection runs as a background worker that compares rolling baselines against incoming metrics. When a threshold is breached, an alert fires with a pre-populated incident runbook linking directly to the relevant trace spans and log lines.",
      "The frontend is a Remix application with streaming SSR, so dashboards load progressively as data arrives. Grafana panels are embedded for teams that already have existing dashboards, while Docker Compose makes local development a single command.",
    ],
    tags: ["Remix", "OpenTelemetry", "ClickHouse", "Grafana", "Docker"],
    accentColor: "primary",
    github: "https://github.com/polishchukserhii702-alt/devpulse",
    demo: "https://devpulse-demo.fly.dev",
    demoLabel: "Dashboard",
    demoIcon: "web",
    stats: [
      { label: "Events/sec", value: "1M+" },
      { label: "Query Time", value: "<1s" },
      { label: "Retention", value: "90d" },
      { label: "Integrations", value: "40+" },
    ],
  },
];

const aiProjects: Project[] = [
  {
    title: "ContextIQ",
    subtitle: "RAG Knowledge Assistant",
    description: "Production-grade Retrieval-Augmented Generation system that ingests private documents and answers queries with cited sources.",
    detail: [
      "ContextIQ solves the hallucination problem by grounding every LLM response in your actual documents. Upload PDFs, Notion exports, Confluence pages, or any text — the system chunks, embeds, and indexes them automatically.",
      "Retrieval uses a hybrid search strategy: dense vector similarity via pgvector for semantic matching, combined with BM25 keyword search for exact term recall. The two scores are fused using Reciprocal Rank Fusion, consistently outperforming either method alone.",
      "The FastAPI backend orchestrates the retrieval-augmentation pipeline using LangChain. Each answer includes inline citations with source document, page number, and the exact passage used — making every response auditable and trustworthy.",
      "The React frontend streams responses token-by-token using the Vercel AI SDK, with citations appearing as interactive footnotes. A document management panel lets teams upload, tag, and version their knowledge base without touching any code.",
    ],
    tags: ["LangChain", "pgvector", "OpenAI", "FastAPI", "React"],
    accentColor: "accent",
    github: "https://github.com/polishchukserhii702-alt/contextiq",
    demo: "https://contextiq.vercel.app",
    demoLabel: "Try Demo",
    demoIcon: "ai",
    stats: [
      { label: "Accuracy", value: "94%" },
      { label: "Ticket Reduction", value: "35%" },
      { label: "Doc Formats", value: "12+" },
      { label: "Latency", value: "<2s" },
    ],
  },
  {
    title: "CodeReview AI",
    subtitle: "Agentic PR Reviewer",
    description: "Autonomous code review agent that analyzes pull requests, detects security vulnerabilities, and posts inline GitHub comments.",
    detail: [
      "CodeReview AI replaces the first pass of human code review with an autonomous agent that understands context, not just syntax. It reads the PR diff, the surrounding codebase, and the commit history before forming any opinion.",
      "The agent is built on LangGraph — a stateful multi-step reasoning framework. It runs a structured loop: understand the change, check for security issues (OWASP Top 10, injection, auth bypass), evaluate code quality, suggest refactors, then synthesize a final review.",
      "All findings are posted as inline GitHub comments on the exact lines in question, using the GitHub API. The agent distinguishes between blocking issues (security, correctness) and suggestions (style, performance), so developers know what must be fixed vs. what's optional.",
      "GPT-4o powers the reasoning with a carefully engineered system prompt that enforces consistent review standards across the team. The Vercel AI SDK handles streaming so review comments appear progressively as the agent works through the diff.",
    ],
    tags: ["LangGraph", "GPT-4o", "GitHub API", "Python", "Vercel AI SDK"],
    accentColor: "primary",
    github: "https://github.com/polishchukserhii702-alt/codereview-ai",
    demo: "https://codereview-ai.vercel.app",
    demoLabel: "Try Agent",
    demoIcon: "ai",
    stats: [
      { label: "Issues Found", value: "87%" },
      { label: "Review Time", value: "~45s" },
      { label: "False Positives", value: "<8%" },
      { label: "Languages", value: "15+" },
    ],
  },
  {
    title: "VoiceCanvas",
    subtitle: "Multimodal AI Studio",
    description: "Browser-based creative studio combining speech-to-text, image generation, and text-to-speech in a single streaming pipeline.",
    detail: [
      "VoiceCanvas is a real-time creative studio that lets you speak an idea and watch it become an image, then hear it narrated back in a cloned voice — all in the browser, all in one continuous pipeline.",
      "Speech-to-text is powered by OpenAI Whisper running on a WebRTC audio stream, transcribing in real time with word-level timestamps. The transcript feeds directly into a Stable Diffusion XL prompt pipeline with ControlNet for compositional guidance.",
      "Image generation runs on a GPU-backed serverless endpoint, streaming progressive JPEG previews back to the browser as the diffusion steps complete. Users see the image materialize in real time rather than waiting for a final result.",
      "ElevenLabs handles text-to-speech with voice cloning — users can upload a 30-second voice sample and all narration is synthesized in that voice. The entire pipeline from speech input to voiced image description completes in under 8 seconds end-to-end.",
    ],
    tags: ["Whisper", "Stable Diffusion XL", "ElevenLabs", "Next.js", "WebRTC"],
    accentColor: "accent",
    github: "https://github.com/polishchukserhii702-alt/voicecanvas",
    demo: "https://voicecanvas.vercel.app",
    demoLabel: "Open Studio",
    demoIcon: "ai",
    stats: [
      { label: "Pipeline Time", value: "<8s" },
      { label: "Voice Clone", value: "30s clip" },
      { label: "Image Steps", value: "Streamed" },
      { label: "Modalities", value: "3" },
    ],
  },
];

/* ── Detail modal ─────────────────────────────────────────── */
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const isAI = project.accentColor === "accent";
  const alt = isAI ? "primary" : "accent";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-2xl" />

      <motion.div
        className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-border surface-3d"
        initial={{ opacity: 0, scale: 0.93, y: 36, rotateX: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
        style={{ boxShadow: `0 40px 120px -20px hsl(var(--${project.accentColor}) / 0.35), 0 0 0 1px hsl(var(--${project.accentColor}) / 0.15)` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Accent top bar */}
        <div className="h-1 w-full rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, hsl(var(--${project.accentColor})), hsl(var(--${alt})))` }} />

        {/* Hero — SVG illustration */}
        <div className="relative h-56 overflow-hidden bg-[hsl(220_22%_9%)]">
          <ProjectImage id={project.title} color={project.accentColor} />

          {/* Gradient fade bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{ background: "linear-gradient(to top, hsl(220 22% 9%), transparent)" }} />

          {/* Title overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-7 pointer-events-none">
            <motion.p className="font-ui text-[10px] font-semibold tracking-[0.4em] uppercase mb-1"
              style={{ color: `hsl(var(--${project.accentColor}))` }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
              {project.subtitle}
            </motion.p>
            <motion.h2 className="font-display text-3xl md:text-4xl font-extrabold text-foreground leading-none"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, ease: [0.23, 1, 0.32, 1] }}>
              {project.title}
            </motion.h2>
          </div>

          {/* Close */}
          <motion.button onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-border bg-background/70 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 border-b border-border">
          {project.stats.map((stat, i) => (
            <motion.div key={stat.label}
              className="px-4 py-3 text-center border-r border-border last:border-0"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.06 }}>
              <p className="font-display text-lg font-extrabold leading-none"
                style={{ color: `hsl(var(--${project.accentColor}))` }}>{stat.value}</p>
              <p className="font-ui text-[9px] font-medium tracking-wider uppercase text-muted-foreground mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {project.tags.map((tag, i) => (
              <motion.span key={tag}
                initial={{ opacity: 0, scale: 0.75, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -2, scale: 1.06 }}
                className="inline-flex items-center gap-1.5 font-ui text-[10px] font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full border transition-all duration-200 cursor-default"
                style={{
                  borderColor: `hsl(var(--${project.accentColor}) / ${0.25 + (i % 3) * 0.12})`,
                  background: `linear-gradient(135deg, hsl(var(--${project.accentColor}) / 0.1), hsl(var(--${project.accentColor}) / 0.04))`,
                  color: `hsl(var(--${project.accentColor}))`,
                  boxShadow: `0 0 10px hsl(var(--${project.accentColor}) / 0.08), inset 0 1px 0 hsl(var(--${project.accentColor}) / 0.12)`,
                }}>
                {/* Glowing dot */}
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background: `hsl(var(--${project.accentColor}))`,
                    boxShadow: `0 0 5px hsl(var(--${project.accentColor}) / 0.9)`,
                  }}
                />
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Detail paragraphs */}
          <div className="space-y-5">
            {project.detail.map((para, i) => (
              <motion.p key={i}
                className="font-body text-sm text-muted-foreground leading-[1.85] font-light"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.09, ease: [0.23, 1, 0.32, 1] }}>
                {i === 0 && (
                  <span className="font-ui font-semibold"
                    style={{ color: `hsl(var(--${project.accentColor}))` }}>
                    {project.title}{" "}
                  </span>
                )}
                {para.replace(project.title + " ", "")}
              </motion.p>
            ))}
          </div>

          {/* CTA */}
          <motion.div className="flex gap-3 mt-10 pt-6 border-t border-border"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-ui text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all duration-200"
              style={{ borderColor: `hsl(var(--${project.accentColor}) / 0.5)`, background: `hsl(var(--${project.accentColor}) / 0.1)`, color: `hsl(var(--${project.accentColor}))` }}>
              {project.demoIcon === "ai" ? <Bot className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
              {project.demoLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Project card ─────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 14, rotateY: -4 },
  show: { opacity: 1, y: 0, rotateX: 0, rotateY: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
};

const ProjectCard = ({ project, onOpen, isActive }: { project: Project; onOpen: (p: Project) => void; isActive: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 24, damping: 24 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 24, damping: 24 });
  const glowX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      animate={isActive
        ? {
            scale: 1.04,
            rotateZ: [0, -2.5, 2.5, -1.5, 1.5, 0],
            y: [0, -6, -6, -6, -6, 0],
            transition: {
              scale:   { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
              rotateZ: { duration: 1.1, ease: "easeInOut", times: [0, 0.2, 0.45, 0.65, 0.85, 1] },
              y:       { duration: 1.1, ease: "easeInOut", times: [0, 0.2, 0.45, 0.65, 0.85, 1] },
            },
          }
        : {
            scale: 1, rotateZ: 0, y: 0,
            transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
          }
      }
      onMouseMove={e => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 900 }}
      className="group relative"
    >
      <div
        className="relative rounded-2xl border border-border overflow-hidden flex flex-col surface-3d"
        style={{ boxShadow: `0 20px 60px -16px hsl(var(--${project.accentColor}) / 0.15), inset 0 1px 0 hsl(255 100% 100% / 0.04)` }}
      >
        {/* Spotlight follow */}
        <motion.div className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{ background: `radial-gradient(circle at ${glowX} ${glowY}, hsl(var(--${project.accentColor}) / 0.07) 0%, transparent 55%)` }} />

        {/* Active cycle highlight */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="active-ring"
              className="absolute inset-0 rounded-2xl pointer-events-none z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: `0 0 0 2px hsl(var(--${project.accentColor}) / 0.7), 0 0 32px hsl(var(--${project.accentColor}) / 0.25)`,
                background: `radial-gradient(ellipse at 50% 0%, hsl(var(--${project.accentColor}) / 0.1) 0%, transparent 60%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Image area ── */}
        <div className="relative h-44 overflow-hidden bg-[hsl(220_22%_9%)] shrink-0">
          <motion.div className="w-full h-full"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 5.0, ease: [0.23, 1, 0.32, 1] }}>
            <ProjectImage id={project.title} color={project.accentColor} />
          </motion.div>

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
            style={{ background: "linear-gradient(to top, hsl(220 22% 9%), transparent)" }} />

          {/* Accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, hsl(var(--${project.accentColor})), transparent)` }} />

          {/* Category badge */}
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full border font-ui text-[9px] font-bold tracking-wider uppercase backdrop-blur-sm"
            style={{ borderColor: `hsl(var(--${project.accentColor}) / 0.4)`, background: `hsl(var(--${project.accentColor}) / 0.12)`, color: `hsl(var(--${project.accentColor}))` }}>
            {project.subtitle}
          </div>
        </div>

        {/* ── Content area ── */}
        <div className="flex flex-col flex-1 p-5" style={{ transform: "translateZ(12px)" }}>
          <h4 className="font-display text-xl font-extrabold text-foreground leading-tight mb-2">
            {project.title}
          </h4>
          <p className="font-body text-sm text-muted-foreground leading-[1.7] font-light flex-1 mb-5">
            {project.description}
          </p>

          {/* ── Bottom row: tags left, arrow button right ── */}
          <div className="flex items-end justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 2).map(tag => (
                <span key={tag}
                  className="font-ui text-[9px] font-semibold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border border-border bg-muted/40 text-muted-foreground">
                  {tag}
                </span>
              ))}
              {project.tags.length > 2 && (
                <span className="font-ui text-[9px] font-semibold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border border-border bg-muted/40 text-muted-foreground">
                  +{project.tags.length - 2}
                </span>
              )}
            </div>

            <motion.button
              onClick={() => onOpen(project)}
              whileHover={{ scale: 1.12, rotate: -8 }}
              whileTap={{ scale: 0.93 }}
              transition={{ duration: 2.0, ease: [0.23, 1, 0.32, 1] }}
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200"
              style={{
                borderColor: `hsl(var(--${project.accentColor}) / 0.45)`,
                background: `hsl(var(--${project.accentColor}) / 0.1)`,
                color: `hsl(var(--${project.accentColor}))`,
                boxShadow: `0 0 16px hsl(var(--${project.accentColor}) / 0.15)`,
              }}
              aria-label={`View ${project.title}`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Category block ───────────────────────────────────────── */
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

type CategoryProps = {
  label: string;
  icon: React.ReactNode;
  projects: Project[];
  onOpen: (p: Project) => void;
  activeTitle: string | null;
};

const ProjectCategory = ({ label, icon, projects, onOpen, activeTitle }: CategoryProps) => (
  <div className="mb-16">
    <motion.div className="flex items-center gap-2 mb-7"
      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
      <span className="text-primary">{icon}</span>
      <h3 className="font-ui text-xs font-bold text-foreground tracking-[0.2em] uppercase">{label}</h3>
      <div className="flex-1 h-px ml-2"
        style={{ background: "linear-gradient(90deg, hsl(var(--primary)/0.4), transparent)" }} />
    </motion.div>
    <motion.div variants={container} initial="hidden" whileInView="show"
      viewport={{ once: true }} className="grid md:grid-cols-3 gap-6"
      style={{ perspective: 1000 }}>
      {projects.map(p => (
        <ProjectCard key={p.title} project={p} onOpen={onOpen} isActive={activeTitle === p.title} />
      ))}
    </motion.div>
  </div>
);

/* ── Section ──────────────────────────────────────────────── */
const ALL_PROJECTS = [...fullStackProjects, ...aiProjects];

const ProjectsSection = () => {
  const [active, setActive] = useState<Project | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setActiveIdx(i => (i + 1) % ALL_PROJECTS.length);
    }, 1400);
    return () => clearInterval(id);
  }, [inView]);

  const activeTitle = ALL_PROJECTS[activeIdx].title;

  return (
    <>
      <section ref={sectionRef} id="projects" className="py-24 px-6 scene-3d">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mb-14"
          >
            <span className="font-ui text-[11px] font-semibold tracking-[0.4em] text-primary uppercase">Portfolio</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mt-2 text-foreground leading-none">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </motion.div>

          <ProjectCategory label="Full Stack" icon={<Layers className="w-4 h-4" />} projects={fullStackProjects} onOpen={setActive} activeTitle={activeTitle} />
          <ProjectCategory label="Artificial Intelligence" icon={<Brain className="w-4 h-4" />} projects={aiProjects} onOpen={setActive} activeTitle={activeTitle} />
        </div>
      </section>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;
