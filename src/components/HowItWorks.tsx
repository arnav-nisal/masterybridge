import { motion } from "framer-motion";
import { Upload, Search, Brain, ArrowRight } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload Context", desc: "Drop your syllabus or notes. We process the technical jargon instantly.", color: "bg-primary/10 text-primary" },
  { icon: Search, title: "Find Blind Spots", desc: "Take a 3-question micro-quiz to find exactly what you don't know.", color: "bg-secondary/10 text-secondary" },
  { icon: Brain, title: "The Feynman Mirror", desc: "Explain the concepts you got wrong to our AI like it's a 10-year-old. We'll grade your true understanding.", color: "bg-primary/10 text-primary" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 relative">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-4"
      >
        How It <span className="text-gradient">Works</span>
      </motion.h2>
      <p className="text-muted-foreground text-center mb-16 max-w-md mx-auto">
        Three simple steps to go from passive reading to active mastery.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
        {/* Connector lines (desktop) */}
        <div className="hidden md:block absolute top-[56px] left-[calc(33.33%+16px)] right-[calc(33.33%+16px)] h-0.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30" />

        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass rounded-2xl p-8 text-center group hover:glow-border transition-all duration-300 relative"
          >
            <div className={`w-14 h-14 rounded-xl ${step.color.split(" ")[0]} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
              <step.icon className={step.color.split(" ")[1]} size={26} />
            </div>
            <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
              {i + 1}
            </div>
            <h3 className="text-foreground font-bold text-lg mb-3">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>

            {i < steps.length - 1 && (
              <div className="md:hidden flex justify-center mt-4">
                <ArrowRight className="text-muted-foreground/40" size={20} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
