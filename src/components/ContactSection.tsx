import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-primary text-xs tracking-[0.3em] uppercase mb-3">Contact</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Let's build something<br /><span className="text-gradient">amazing together</span>.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            I'm always open to discussing new opportunities, collaborations, or just chatting about tech and AI.
          </p>
          <a
            href="mailto:hello@ethanpotter.dev"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-display text-sm font-medium tracking-wide hover:opacity-90 transition-opacity glow-primary"
          >
            <Mail className="w-4 h-4" />
            Say Hello
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
