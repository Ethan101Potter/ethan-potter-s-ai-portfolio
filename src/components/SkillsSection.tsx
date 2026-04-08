import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Full Stack",
    color: "primary",
    skills: ["React", "TypeScript", "Node.js", "Next.js", "GraphQL", "PostgreSQL", "Docker"],
  },
  {
    title: "AI & ML",
    color: "accent",
    skills: ["Python", "R", "Java", "C++", "TensorFlow", "PyTorch"],
  },
  {
    title: "Tools & Practices",
    color: "primary",
    skills: ["Git", "CI/CD", "AWS", "GCP", "Azure", "Agile", "TDD", "Security Auditing", "Code Review", "Docker"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-primary text-xs tracking-[0.3em] uppercase mb-3">Skills</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-16">
            My <span className="text-gradient">tech stack</span>.
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * ci }}
              className="p-6 rounded-xl border border-border bg-card card-hover"
            >
              <h3 className="font-display text-sm font-semibold text-primary mb-5 tracking-wide uppercase">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
