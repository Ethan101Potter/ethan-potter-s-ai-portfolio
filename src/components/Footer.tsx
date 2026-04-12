import { motion } from "framer-motion";
import { Github, MapPin, Thermometer, Clock, Wind, FileText, Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { generateResumePDF } from "@/lib/generateResumePDF";

/* ── Live HK weather via Open-Meteo (no API key) ── */
type Weather = { temp: number; feelsLike: number; windspeed: number; code: number } | null;

const WMO_EMOJI: Record<number, string> = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
  45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌧️",
  61: "🌧️", 63: "🌧️", 65: "🌧️",
  71: "❄️", 73: "❄️", 75: "❄️",
  80: "🌦️", 81: "🌧️", 82: "⛈️",
  95: "⛈️", 96: "⛈️", 99: "⛈️",
};
const WMO_DESC: Record<number, string> = {
  0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Foggy", 48: "Icy fog",
  51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
  61: "Light rain", 63: "Rain", 65: "Heavy rain",
  71: "Light snow", 73: "Snow", 75: "Heavy snow",
  80: "Rain showers", 81: "Heavy showers", 82: "Violent showers",
  95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm",
};

const useHKWeather = () => {
  const [weather, setWeather] = useState<Weather>(null);
  useEffect(() => {
    const fetch_ = async () => {
      try {
        const r = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=22.3193&longitude=114.1694&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m&timezone=Asia%2FHong_Kong"
        );
        const d = await r.json();
        const c = d?.current;
        if (c) setWeather({
          temp: Math.round(c.temperature_2m),
          feelsLike: Math.round(c.apparent_temperature),
          windspeed: Math.round(c.windspeed_10m),
          code: c.weathercode,
        });
      } catch { /* silent */ }
    };
    fetch_();
    const id = setInterval(fetch_, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return weather;
};

/* ── Live HK clock ── */
const useHKTime = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hkTime = new Intl.DateTimeFormat("en-HK", {
        timeZone: "Asia/Hong_Kong",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
      }).format(now);
      const hkDate = new Intl.DateTimeFormat("en-HK", {
        timeZone: "Asia/Hong_Kong",
        weekday: "short", month: "short", day: "numeric",
      }).format(now);
      setTime(hkTime);
      setDate(hkDate);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return { time, date };
};

/* ── Animated colon for clock ── */
const ClockDisplay = ({ time }: { time: string }) => {
  const [h, m, s] = time.split(":");
  return (
    <span className="font-display text-2xl font-extrabold tracking-tight text-foreground tabular-nums">
      {h}
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="text-primary mx-0.5"
      >:</motion.span>
      {m}
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="text-primary mx-0.5"
      >:</motion.span>
      <span className="text-muted-foreground text-lg">{s}</span>
    </span>
  );
};

const Footer = () => {
  const weather = useHKWeather();
  const { time, date } = useHKTime();
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const handleDownloadPDF = () => {
    generateResumePDF(
      () => setGeneratingPDF(true),
      () => setGeneratingPDF(false)
    );
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="border-t border-border px-6 pt-12 pb-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(to top, hsl(220 30% 3%), hsl(220 30% 4% / 0.6))",
      }}
    >
      {/* Subtle glow behind HK card */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[100px] opacity-[0.06] pointer-events-none"
        style={{ background: "hsl(var(--primary))" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── HK Identity Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="rounded-2xl border border-border surface-3d overflow-hidden mb-8"
        >
          {/* Card accent bar */}
          <div className="h-1 w-full" style={{
            background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))"
          }} />

          <div className="p-6 grid md:grid-cols-3 gap-6">

            {/* Left — Identity */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇭🇰</span>
                <div>
                  <p className="font-display text-base font-extrabold text-foreground leading-tight">
                    Hong Kong SAR
                  </p>
                  <p className="font-ui text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                    Born & Raised
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-ui text-xs font-semibold text-foreground">Victoria Harbour</p>
                  <p className="font-body text-[10px] text-muted-foreground font-light">
                    22.3193° N, 114.1694° E
                  </p>
                </div>
              </div>
            </div>

            {/* Center — Live Clock */}
            <div className="flex flex-col items-center justify-center gap-1 border-x border-border/50 px-6">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="w-3 h-3 text-primary" />
                <span className="font-ui text-[9px] font-bold tracking-[0.3em] uppercase text-muted-foreground">
                  HKT · UTC+8
                </span>
              </div>
              {time ? (
                <ClockDisplay time={time} />
              ) : (
                <div className="w-32 h-7 rounded bg-muted/40 animate-pulse" />
              )}
              <p className="font-ui text-[10px] text-muted-foreground mt-0.5">{date}</p>
            </div>

            {/* Right — Live Weather */}
            <div className="flex flex-col justify-center gap-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Thermometer className="w-3 h-3 text-primary" />
                <span className="font-ui text-[9px] font-bold tracking-[0.3em] uppercase text-muted-foreground">
                  Live Weather
                </span>
              </div>
              {weather ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{WMO_EMOJI[weather.code] ?? "🌡️"}</span>
                    <div>
                      <p className="font-display text-2xl font-extrabold text-foreground leading-none">
                        {weather.temp}°C
                      </p>
                      <p className="font-body text-[10px] text-muted-foreground font-light">
                        Feels {weather.feelsLike}°C
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wind className="w-3 h-3 text-muted-foreground" />
                    <span className="font-ui text-[10px] text-muted-foreground">
                      {weather.windspeed} km/h · {WMO_DESC[weather.code] ?? ""}
                    </span>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="w-24 h-7 rounded bg-muted/40 animate-pulse" />
                  <div className="w-32 h-3 rounded bg-muted/30 animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-ui text-xs font-medium text-muted-foreground tracking-wide">
            © 2026 Ethan Potter. All rights reserved.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
            {/* Resume PDF download button */}
            <motion.button
              onClick={handleDownloadPDF}
              disabled={generatingPDF}
              whileHover={generatingPDF ? {} : {
                scale: 1.05,
                boxShadow: "0 0 24px hsl(var(--primary)/0.4)",
              }}
              whileTap={generatingPDF ? {} : { scale: 0.96 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/40 font-ui text-xs font-semibold text-primary transition-colors duration-200 disabled:opacity-70"
              style={{ background: "hsl(var(--primary) / 0.07)" }}
            >
              {generatingPDF ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating…</>
              ) : (
                <><Download className="w-3.5 h-3.5" /> Resume PDF</>
              )}
            </motion.button>

            {/* README button */}
            <motion.a
              href="/README.html"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 24px hsl(var(--accent)/0.35)",
              }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border surface-3d font-ui text-xs font-semibold text-foreground hover:text-accent hover:border-accent/50 transition-colors duration-200"
            >
              <FileText className="w-3.5 h-3.5" />
              README
            </motion.a>

            {/* GitHub button */}
            <motion.a
              href="https://github.com/polishchukserhii702-alt"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 24px hsl(var(--primary)/0.35)",
              }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border surface-3d font-ui text-xs font-semibold text-foreground hover:text-primary hover:border-primary/50 transition-colors duration-200"
            >
              <Github className="w-3.5 h-3.5" />
              polishchukserhii702-alt
            </motion.a>

            <span className="font-ui text-xs font-medium text-muted-foreground tracking-wide hidden sm:block">
              Built with{" "}
              <span className="text-primary font-semibold">React</span>
              {" & "}
              <span className="text-primary font-semibold">TypeScript</span>
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
