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

const Index = () => {
  return (
    <div className="min-h-screen bg-background cursor-custom">
      <CustomCursor />
      <DepthScene />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <div className="section-depth-sep section-dark"><AboutSection /></div>
        <div className="section-depth-sep section-lit"><ExperienceSection /></div>
        <div className="section-depth-sep section-dark"><ProjectsSection /></div>
        <div className="section-depth-sep section-lit"><SkillsSection /></div>
        <div className="section-depth-sep section-dark"><ReviewsSection /></div>
        <div className="section-depth-sep section-lit"><EducationSection /></div>
        <div className="section-depth-sep section-dark"><ContactSection /></div>
        <Footer />
      </div>
      {/* Floating AI chat — above everything */}
      <PortfolioChat />
      {/* Scroll to top */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
