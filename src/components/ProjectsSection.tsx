import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";

const projects = [
  {
    title: "AI-Powered Task Manager",
    description:
      "A full-stack productivity app with AI-driven task prioritization and smart scheduling. Built with React, Node.js, and TensorFlow.js for intelligent workflow optimization.",
    tags: ["React", "Node.js", "TensorFlow.js", "PostgreSQL"],
    gradient: "from-primary/20 to-accent/20",
  },
  {
    title: "Real-Time Chat Platform",
    description:
      "Scalable messaging application with WebSocket-based real-time communication, end-to-end encryption, and AI-powered message translation across 50+ languages.",
    tags: ["Next.js", "WebSockets", "Redis", "Docker"],
    gradient: "from-accent/20 to-primary/20",
  },
  {
    title: "ML Model Dashboard",
    description:
      "Interactive dashboard for training, monitoring, and deploying machine learning models. Features real-time metrics visualization and one-click cloud deployment.",
    tags: ["Python", "PyTorch", "React", "AWS"],
    gradient: "from-primary/20 to-accent/20",
  },
  {
    title: "E-Commerce Analytics Engine",
    description:
      "Data pipeline and analytics platform that processes millions of transactions to deliver actionable insights through custom visualizations and predictive models.",
    tags: ["TypeScript", "GraphQL", "GCP", "D3.js"],
    gradient: "from-accent/20 to-primary/20",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProjectsSection = () => (
  <section id="projects" className="py-24 px-6">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <span className="font-display text-xs tracking-widest text-primary uppercase">
          Portfolio
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
          Featured <span className="text-gradient">Projects</span>
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-6"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={item}
            className={`group relative rounded-xl border border-border bg-gradient-to-br ${project.gradient} backdrop-blur-sm p-6 card-hover`}
          >
            {/* decorative icon */}
            <div className="absolute top-5 right-5 text-primary/30 group-hover:text-primary/60 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>

            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-display tracking-wider uppercase px-2.5 py-1 rounded-full border border-border bg-muted/50 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="inline-flex items-center gap-1.5 text-xs font-display tracking-wider text-primary hover:text-primary/80 transition-colors uppercase">
                <Github className="w-3.5 h-3.5" /> Code
              </button>
              <button className="inline-flex items-center gap-1.5 text-xs font-display tracking-wider text-primary hover:text-primary/80 transition-colors uppercase">
                <ExternalLink className="w-3.5 h-3.5" /> Demo
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
