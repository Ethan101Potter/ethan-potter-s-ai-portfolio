import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ReviewsSection from "@/components/ReviewsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import DepthScene from "@/components/DepthScene";
import PortfolioChat from "@/components/PortfolioChat";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";

const SectionReveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
  >
    {children}
  </motion.div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background cursor-custom">
      <CustomCursor />
      <DepthScene />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <SectionReveal className="section-depth-sep section-dark"><AboutSection /></SectionReveal>
        <SectionReveal className="section-depth-sep section-lit"><ExperienceSection /></SectionReveal>
        <SectionReveal className="section-depth-sep section-dark"><ProjectsSection /></SectionReveal>
        <SectionReveal className="section-depth-sep section-lit"><SkillsSection /></SectionReveal>
        <SectionReveal className="section-depth-sep section-dark"><ReviewsSection /></SectionReveal>
        <SectionReveal className="section-depth-sep section-lit"><EducationSection /></SectionReveal>
        <SectionReveal className="section-depth-sep section-dark"><ContactSection /></SectionReveal>
        <Footer />
      </div>
      <PortfolioChat />
      <ScrollToTop />
    </div>
  );
};

export default Index;
