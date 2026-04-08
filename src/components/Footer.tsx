import { Github, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8 px-6">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-display text-xs text-muted-foreground tracking-wider">
        © 2026 Ethan Potter. All rights reserved.
      </p>
      <div className="flex items-center gap-5">
        <a href="https://github.com/ethanpotter" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Github className="w-4 h-4" />
        </a>
        <a href="https://linkedin.com/in/ethanpotter" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Linkedin className="w-4 h-4" />
        </a>
        <span className="font-display text-xs text-muted-foreground tracking-wider">
          Built with <span className="text-primary">React</span> & <span className="text-primary">TypeScript</span>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
