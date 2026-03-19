import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemBar from "@/components/ProblemBar";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import MockupSection from "@/components/MockupSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ProblemBar />
    <HowItWorks />
    <FeaturesGrid />
    <MockupSection />
    <Footer />
  </div>
);

export default Index;
