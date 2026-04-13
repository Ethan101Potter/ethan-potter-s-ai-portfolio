import { motion, AnimatePresence, useInView } from "framer-motion";
import { Mail, CheckCircle, Loader2, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const WEBHOOK_URL =
  "https://chat.googleapis.com/v1/spaces/AAAAvMSn7Xo/messages?key=AIzaSyDdI0hCZtE_YiTiviwneL0ozVPjDkTMDNA&token=your_token_here";

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200";

/* Auto-type "HIT" into each field in sequence, then clear and loop */
const FIELD_ORDER: (keyof Fields)[] = ["name", "email", "subject", "message"];
const HIT_VALUES: Record<keyof Fields, string> = {
  name:    "IT",
  email:   "HIT",
  subject: "HIT",
  message: "HIT",
};

function useAutoType(active: boolean, onUpdate: (f: keyof Fields, v: string) => void) {
  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const run = async () => {
      while (!cancelled) {
        for (const field of FIELD_ORDER) {
          const target = HIT_VALUES[field];
          // type in
          for (let i = 1; i <= target.length; i++) {
            if (cancelled) return;
            onUpdate(field, target.slice(0, i));
            await sleep(90);
          }
          await sleep(420);
        }
        // erase all
        for (const field of [...FIELD_ORDER].reverse()) {
          const target = HIT_VALUES[field];
          for (let i = target.length - 1; i >= 0; i--) {
            if (cancelled) return;
            onUpdate(field, target.slice(0, i));
            await sleep(45);
          }
          await sleep(120);
        }
        await sleep(800);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [active, onUpdate]);
}

const ContactSection = () => {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", subject: "", message: "" });
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [userEditing, setUserEditing] = useState(false);

  // auto-type disabled — fields start empty
  // useAutoType(inView && !userEditing && !success, ...);

  const validate = (): boolean => {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = "Name is required";
    if (!fields.email.trim()) next.email = "Email is required";
    if (!fields.subject.trim()) next.subject = "Subject is required";
    if (!fields.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const text = `📬 *New Portfolio Contact*\n\n*Name:* ${fields.name}\n*Email:* ${fields.email}\n*Subject:* ${fields.subject}\n*Message:* ${fields.message}`;
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSuccess(true);
      setFields({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch {
      setSubmitError("Failed to send. Please email directly.");
    } finally {
      setLoading(false);
    }
  };

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserEditing(true);
    setFields(f => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  return (
    <section ref={sectionRef} id="contact" className="py-32 px-6 scene-3d overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Background glow ring */}
        <div
          className="absolute inset-0 rounded-full blur-[120px] opacity-10 animate-pulse-glow pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--primary)), hsl(var(--accent)))" }}
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start relative">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 15, rotateY: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="font-ui text-primary text-[11px] font-semibold tracking-[0.4em] uppercase mb-3">Contact</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-6 leading-none">
              Let's build something<br />
              <span className="text-gradient">amazing together</span>.
            </h2>
            <p className="font-body text-muted-foreground text-base mb-10 font-light leading-[1.8]">
              I'm always open to discussing new opportunities, collaborations, or just chatting about tech and AI.
            </p>

            <motion.a
              href="mailto:polishchukserhii702@gmail.com"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.04, x: 6, transition: { duration: 2.0 } }}
              className="inline-flex items-center gap-3 group"
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: "hsl(var(--primary) / 0.12)", boxShadow: "0 0 20px hsl(var(--primary) / 0.2)" }}
              >
                <Mail className="w-4 h-4 text-primary" />
              </span>
              <span
                className="font-ui text-lg md:text-xl font-semibold tracking-tight transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--primary)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                polishchukserhii702@gmail.com
              </span>
            </motion.a>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ rotateX: -2, rotateY: -3, translateZ: 10, transition: { duration: 4.0 } }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="flex flex-col items-center justify-center gap-4 py-16 px-8 rounded-2xl border border-border surface-3d text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-14 h-14 text-primary" />
                  </motion.div>
                  <p className="font-display text-2xl font-extrabold">Message sent!</p>
                  <p className="font-body text-muted-foreground text-sm font-light">I'll get back to you soon.</p>
                  <motion.button
                    onClick={() => { setSuccess(false); setUserEditing(false); }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 px-6 py-2.5 rounded-xl border border-primary/40 font-ui text-sm font-semibold text-primary transition-all duration-200"
                    style={{ background: "hsl(var(--primary) / 0.08)" }}
                  >
                    Send another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  noValidate
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        value={fields.name}
                        onChange={set("name")}
                        className={`${inputClass} ${errors.name ? "border-red-500/60" : ""}`}
                      />
                      {errors.name && <p className="font-body text-xs text-red-400 mt-1 pl-1">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={fields.email}
                        onChange={set("email")}
                        className={`${inputClass} ${errors.email ? "border-red-500/60" : ""}`}
                      />
                      {errors.email && <p className="font-body text-xs text-red-400 mt-1 pl-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={fields.subject}
                      onChange={set("subject")}
                      className={`${inputClass} ${errors.subject ? "border-red-500/60" : ""}`}
                    />
                    {errors.subject && <p className="font-body text-xs text-red-400 mt-1 pl-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <textarea
                      placeholder="Message"
                      rows={4}
                      value={fields.message}
                      onChange={set("message")}
                      className={`${inputClass} resize-none ${errors.message ? "border-red-500/60" : ""}`}
                    />
                    {errors.message && <p className="font-body text-xs text-red-400 mt-1 pl-1">{errors.message}</p>}
                  </div>

                  {submitError && (
                    <p className="font-body text-sm text-red-400 text-center">{submitError}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={loading ? {} : { scale: 1.02, boxShadow: "0 0 30px hsl(var(--primary)/0.3)" }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl font-ui font-semibold text-sm tracking-wide text-primary-foreground flex items-center justify-center gap-2.5 transition-all duration-200 disabled:opacity-60"
                    style={{ background: "hsl(var(--primary))" }}
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
