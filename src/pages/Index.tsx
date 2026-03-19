import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemBar from "@/components/ProblemBar";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import MockupSection from "@/components/MockupSection";
import Footer from "@/components/Footer";
import QuizPage from "@/components/QuizPage";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection onStartQuiz={() => setShowQuiz(true)} />
      <ProblemBar />
      <HowItWorks />
      <FeaturesGrid />
      <MockupSection />
      <Footer />
      <AnimatePresence>
        {showQuiz && <QuizPage onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
