# Ethan Potter — Full Stack & AI Engineer Portfolio

> A high-performance, 3D-styled personal portfolio built with React 18, TypeScript, Framer Motion, and Tailwind CSS. Features real-time Hong Kong weather, a physics-based custom cursor, animated skill ratings, client reviews, and a Google Chat contact form.

---

## Live Demo

[https://ethan-potter-portfolio.vercel.app](https://ethan-potter-portfolio.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + custom CSS variables |
| Animation | Framer Motion 11 |
| UI Components | Radix UI + shadcn/ui |
| Icons | Lucide React |
| Fonts | Syne (display) · Space Grotesk (UI) · Inter (body) |
| Weather API | Open-Meteo (no key required) |
| Routing | React Router DOM 6 |
| Testing | Vitest + Testing Library |
| E2E | Playwright |

---

## Features

### Design System
- **3D perspective system** — every section uses `perspective: 1400px` with `preserve-3d` cards that tilt on mouse movement via spring physics
- **Chiaroscuro contrast** — alternating `section-lit` / `section-dark` bands create bright content islands against a deep void background
- **Vignette layer** — fixed radial gradient darkens screen edges, focusing the eye on center content
- **Custom cursor** — physics-based blob that stretches in the direction of movement; switches between a **neon battery glow** in dark areas and a **directional drop shadow** in light areas using real-time luminance sampling

### Sections
| Section | Highlights |
|---|---|
| **Hero** | Animated drifting grid, scan-line beam, 6 floating 3D geometry shapes, mouse-tracking tilt on name |
| **About** | 5-col layout — highlight cards (left) + animated count-up stat counters (right): 40+ projects, 7+ years, 20+ clients, 5 domains |
| **Experience** | 8-year timeline (2017–present) with gradient line that draws on scroll, glowing pulsing dots, Full Stack → Full Stack & AI phase transition |
| **Projects** | 6 projects split into Full Stack + AI categories. Each card has a unique inline SVG illustration. Single ↗ button opens a detail modal with flowing animated hero, stats bar, and tech tags |
| **Skills** | 3-column table with S/A/B/C grade badges, 5-star self-rating, and peer review score with decimal stars and review count |
| **Reviews** | Infinite horizontal marquee (pauses on hover) + "View All" modal. 10 detailed client reviews with full testimonials |
| **Education** | BS Computer Science (GPA 3.7), deeplearning.ai Certificate, AWS Certification — each with graded course table |
| **Contact** | Two-column layout: email address + contact form that POSTs to Google Chat webhook |
| **Footer** | Hong Kong identity card with 🇭🇰 flag, live HK clock (UTC+8, updates every second), live weather (Open-Meteo), GitHub button, README download |

### Theme
- Animated day/night toggle switch — sliding pill with moon emoji + twinkling stars (dark) or sun emoji + radiating rays (light)
- Full light mode palette with proper contrast ratios
- Smooth CSS variable transitions

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Install & Run

```bash
# Clone
git clone https://github.com/polishchukserhii702-alt/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

### Run Tests

```bash
npm test
```

---

## Project Structure

```
src/
├── components/
│   ├── AboutSection.tsx        # Stats counters + highlight cards
│   ├── ContactSection.tsx      # Form + Google Chat webhook
│   ├── CustomCursor.tsx        # Physics blob cursor with luminance detection
│   ├── DepthScene.tsx          # Fixed 3D background (floor grid + particles)
│   ├── EducationSection.tsx    # Degree + certificates with course grades
│   ├── ExperienceSection.tsx   # 8-year timeline
│   ├── Footer.tsx              # HK identity card + live clock/weather
│   ├── HeroSection.tsx         # Animated hero with floating shapes
│   ├── Navbar.tsx              # Scroll-reactive nav + theme toggle
│   ├── ProjectsSection.tsx     # SVG project cards + detail modal
│   ├── ReviewsSection.tsx      # Marquee + modal reviews
│   └── SkillsSection.tsx       # Star-rated skill table
├── hooks/
│   ├── use-theme.tsx           # Dark/light theme context
│   └── use-mobile.tsx
├── pages/
│   └── Index.tsx               # Page composition
├── index.css                   # Design tokens + 3D utilities + animations
└── main.tsx
public/
└── Ethan_Potter_Resume.pdf     # Downloadable CV
```

---

## Configuration

### Google Chat Webhook
In `src/components/ContactSection.tsx`, replace the token placeholder:

```ts
const WEBHOOK_URL =
  "https://chat.googleapis.com/v1/spaces/YOUR_SPACE/messages?key=YOUR_KEY&token=YOUR_TOKEN";
```

### Customization
All design tokens live in `src/index.css` as CSS custom properties:

```css
--primary: 174 85% 56%;   /* Teal */
--accent:  265 72% 68%;   /* Purple */
--background: 220 30% 3%; /* Deep dark */
```

---

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Deploy the dist/ folder
```

---

## License

MIT — free to use as a template. Attribution appreciated.

---

