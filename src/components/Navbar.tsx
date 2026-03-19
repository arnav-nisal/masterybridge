import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary" size={22} />
          <span className="text-lg font-bold text-foreground">MasteryBridge AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("how-it-works")} className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
            How it Works
          </button>
          <button onClick={() => scrollTo("features")} className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
            Features
          </button>
          <button onClick={() => scrollTo("science")} className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
            The Science
          </button>
        </div>
        <button className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-semibold text-sm glow-cyan hover:brightness-110 transition-all">
          Try Beta
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
