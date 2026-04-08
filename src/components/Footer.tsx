const Footer = () => (
  <footer className="border-t border-border py-8 px-6">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-display text-xs text-muted-foreground tracking-wider">
        © 2026 Ethan Potter. All rights reserved.
      </p>
      <p className="font-display text-xs text-muted-foreground tracking-wider">
        Built with <span className="text-primary">React</span> & <span className="text-primary">TypeScript</span>
      </p>
    </div>
  </footer>
);

export default Footer;
