import { motion } from "framer-motion";
import { Zap, Mic, LayoutGrid, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Contextual Micro-Quizzes",
    desc: "AI generates targeted questions from your actual notes—not generic textbook questions.",
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Mic,
    title: "Vocal Explanations",
    desc: "Explain concepts out loud or in text. Our AI evaluates your depth of understanding in real-time.",
    gradient: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    icon: LayoutGrid,
    title: "Knowledge Heatmap",
    desc: "Visual dashboard showing green for mastered topics and red for weak areas at a glance. Track progress over time.",
    gradient: "from-primary/20 to-secondary/5",
    iconColor: "text-primary",
    span: "md:col-span-1 md:row-span-1",
    heatmap: true,
  },
  {
    icon: ShieldCheck,
    title: "Zero Exam Anxiety",
    desc: "Know exactly what you know and what you don't—walk into every exam with real confidence.",
    gradient: "from-secondary/20 to-primary/5",
    iconColor: "text-secondary",
    span: "md:col-span-1 md:row-span-1",
  },
];

const heatmapData = [
  [3, 2, 3, 1, 3],
  [2, 1, 3, 3, 2],
  [3, 3, 1, 2, 3],
  [1, 2, 3, 3, 1],
];

const heatColor = (v: number) =>
  v === 3 ? "bg-green-500/60" : v === 2 ? "bg-yellow-500/50" : "bg-red-500/50";

const FeaturesGrid = () => (
  <section id="features" className="py-24">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-4"
      >
        Built for <span className="text-gradient">Real Learning</span>
      </motion.h2>
      <p className="text-muted-foreground text-center mb-16 max-w-md mx-auto">
        Every feature is designed around cognitive science—not just convenience.
      </p>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`glass rounded-2xl p-8 group hover:glow-border transition-all duration-300 ${f.span} relative overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <f.icon className={f.iconColor} size={24} />
              </div>
              <h3 className="text-foreground font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{f.desc}</p>

              {f.heatmap && (
                <div className="grid grid-cols-5 gap-1.5 max-w-[140px]">
                  {heatmapData.flat().map((v, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.03 }}
                      className={`w-6 h-6 rounded-sm ${heatColor(v)}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesGrid;
