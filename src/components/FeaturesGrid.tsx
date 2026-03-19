import { motion } from "framer-motion";
import { Zap, Mic, LayoutGrid, ShieldCheck } from "lucide-react";

const features = [
  { icon: Zap, title: "Contextual Micro-Quizzes", desc: "AI generates targeted questions from your actual notes—not generic textbook questions.", color: "text-primary" },
  { icon: Mic, title: "Vocal Explanations", desc: "Explain concepts out loud or in text. Our AI evaluates your depth of understanding.", color: "text-secondary" },
  { icon: LayoutGrid, title: "Knowledge Heatmap", desc: "Visual dashboard showing green for mastered topics and red for weak areas at a glance.", color: "text-primary" },
  { icon: ShieldCheck, title: "Zero Exam Anxiety", desc: "Know exactly what you know and what you don't—walk into every exam with real confidence.", color: "text-secondary" },
];

const FeaturesGrid = () => (
  <section id="features" className="py-24">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-16"
      >
        Built for <span className="text-gradient">Real Learning</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-8 group hover:glow-border transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <f.icon className={f.color} size={24} />
            </div>
            <h3 className="text-foreground font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesGrid;
