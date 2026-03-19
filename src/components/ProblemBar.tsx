import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ProblemBar = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="py-6 border-y border-border"
  >
    <div className="container mx-auto px-6 flex items-center justify-center gap-3 text-center">
      <AlertTriangle className="text-secondary shrink-0" size={20} />
      <p className="text-muted-foreground text-sm md:text-base">
        <span className="text-foreground font-semibold">Did you know?</span> 60% of students suffer from the "Illusion of Competence"—thinking they know the material just because they highlighted it.
      </p>
    </div>
  </motion.section>
);

export default ProblemBar;
