import { motion } from "framer-motion";
import { Upload, Search, Brain } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Context", desc: "Drop your syllabus or notes. We process the technical jargon instantly." },
  { icon: Search, title: "Find Blind Spots", desc: "Take a 3-question micro-quiz to find exactly what you don't know." },
  { icon: Brain, title: "The Feynman Mirror", desc: "Explain the concepts you got wrong to our AI like it's a 10-year-old. We'll grade your true understanding." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-16"
      >
        How It <span className="text-gradient">Works</span>
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass rounded-2xl p-8 text-center group hover:glow-border transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
              <step.icon className="text-primary" size={26} />
            </div>
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest mb-2">Step {i + 1}</p>
            <h3 className="text-foreground font-bold text-lg mb-3">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
