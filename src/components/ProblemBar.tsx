import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const useCountUp = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
};

const stats = [
  { value: 60, suffix: "%", label: "suffer from Illusion of Competence" },
  { value: 3, suffix: "x", label: "better retention with active recall" },
  { value: 89, suffix: "%", label: "of students improved with Feynman method" },
];

const ProblemBar = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-10 border-y border-border"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-3 text-center mb-8">
          <AlertTriangle className="text-secondary shrink-0" size={20} />
          <p className="text-muted-foreground text-sm md:text-base">
            <span className="text-foreground font-semibold">Did you know?</span> 60% of students suffer from the "Illusion of Competence"—thinking they know the material just because they highlighted it.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {stats.map((stat) => {
            const { count, ref } = useCountUp(stat.value);
            return (
              <div key={stat.label} ref={ref} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-gradient">
                  {count}{stat.suffix}
                </p>
                <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default ProblemBar;
