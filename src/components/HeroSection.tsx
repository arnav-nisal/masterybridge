import { CloudUpload } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const HeroSection = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-6"
        >
          Stop Reading.{" "}
          <span className="text-gradient">Start Mastering.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          The AI-powered study assistant that transforms static PDF notes into interactive micro-quizzes using the Feynman Technique. Prove you know it before the exam.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
          className={`max-w-xl mx-auto rounded-2xl border-2 border-dashed p-12 transition-all duration-300 cursor-pointer group
            ${isDragOver
              ? "border-primary bg-primary/10 glow-cyan scale-[1.02]"
              : "border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5"
            }`}
        >
          <CloudUpload className="mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" size={48} />
          <p className="text-foreground font-semibold text-lg mb-1">Drop your PDF lecture notes here to generate a quiz</p>
          <p className="text-muted-foreground text-sm">or click to browse files</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
