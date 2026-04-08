import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const EducationSection = () => {
  return (
    <section id="education" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-primary text-xs tracking-[0.3em] uppercase mb-3">Education</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-16">
            Academic <span className="text-gradient">background</span>.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-xl border border-border bg-card card-hover max-w-lg"
        >
          <GraduationCap className="w-10 h-10 text-primary mb-4" />
          <p className="font-display text-xs text-muted-foreground tracking-wider uppercase mb-2">2014 — 2017</p>
          <h3 className="font-display text-xl font-semibold mb-1">Bachelor's Degree</h3>
          <p className="text-muted-foreground">Vocational Training Council</p>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
