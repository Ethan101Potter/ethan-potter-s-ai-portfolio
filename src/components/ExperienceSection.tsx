import { motion } from "framer-motion";

const experiences = [
  "Developed and maintained full stack web applications and AI-powered solutions using modern technologies.",
  "Built responsive front-end interfaces and implemented back-end logic for dynamic applications.",
  "Designed and integrated AI/ML models and RESTful APIs for intelligent, data-driven features.",
  "Managed databases, ensured data integrity, and optimized performance for AI-driven applications.",
  "Deployed applications and performed maintenance, troubleshooting, and integration of AI services.",
  "Collaborated with clients to gather requirements and deliver customized full stack and AI solutions.",
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-primary text-xs tracking-[0.3em] uppercase mb-3">Experience</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-16">
            What I <span className="text-gradient">bring</span> to the table.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="relative pl-12"
              >
                <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full border-2 border-primary bg-background" />
                <p className="text-foreground/90 leading-relaxed">{exp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
