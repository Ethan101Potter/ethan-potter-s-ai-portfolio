import { motion } from "framer-motion";
import { Code2, Brain, Users, Zap } from "lucide-react";

const highlights = [
  { icon: Code2, title: "Full Stack", desc: "End-to-end web development with modern frameworks" },
  { icon: Brain, title: "AI Engineering", desc: "ML models, automation & intelligent solutions" },
  { icon: Users, title: "Collaborative", desc: "Strong communicator, team-oriented approach" },
  { icon: Zap, title: "Fast Learner", desc: "Continuously growing through real-world projects" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-primary text-xs tracking-[0.3em] uppercase mb-3">About Me</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
            Driven by curiosity,<br />powered by <span className="text-gradient">code & AI</span>.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-16"
        >
          Motivated and detail-oriented Full Stack Developer and AI Engineer with a strong foundation in both front-end and back-end development, along with emerging expertise in artificial intelligence. Passionate about creating efficient, scalable, and user-friendly web and AI-driven applications with clean, maintainable code.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="p-6 rounded-xl border border-border bg-card card-hover"
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-sm font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
