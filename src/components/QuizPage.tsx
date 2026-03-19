import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Sparkles } from "lucide-react";

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
};

const questions: Question[] = [
  {
    topic: "Pointers",
    question: "What does a pointer store in C++?",
    options: ["The value of a variable", "The memory address of a variable", "The data type of a variable", "The size of a variable"],
    correct: 1,
    explanation: "A pointer stores the memory address of another variable, not the value itself. This is what makes pointers powerful for dynamic memory management.",
  },
  {
    topic: "Pointers",
    question: "What does the '*' operator do when used with a pointer?",
    options: ["Multiplies the pointer", "Declares a new variable", "Dereferences the pointer to access the value", "Deletes the pointer"],
    correct: 2,
    explanation: "The dereference operator (*) accesses the value stored at the memory address the pointer is pointing to.",
  },
  {
    topic: "Memory",
    question: "What happens if you try to access memory through a NULL pointer?",
    options: ["It returns 0", "It causes undefined behavior / crash", "It auto-allocates memory", "Nothing happens"],
    correct: 1,
    explanation: "Dereferencing a NULL pointer leads to undefined behavior, typically a segmentation fault or crash. Always check for NULL before dereferencing!",
  },
];

const QuizPage = ({ onClose }: { onClose: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  const pct = Math.round((score / questions.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass rounded-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={16} />
            <span className="text-sm font-bold text-foreground">Micro-Quiz</span>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-sm">
            Close
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={current}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Progress */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-medium">
                    Question {current + 1} of {questions.length}
                  </span>
                  <span className="text-xs text-primary font-medium">{q.topic}</span>
                </div>
                <div className="h-1 rounded-full bg-muted mb-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: `${(current / questions.length) * 100}%` }}
                    animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                  />
                </div>

                <h3 className="text-foreground font-bold text-lg mb-6">{q.question}</h3>

                <div className="space-y-3">
                  {q.options.map((opt, idx) => {
                    let style = "glass hover:glow-border";
                    if (answered) {
                      if (idx === q.correct) style = "border border-green-500/50 bg-green-500/10";
                      else if (idx === selected) style = "border border-red-500/50 bg-red-500/10";
                      else style = "glass opacity-50";
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={answered}
                        className={`w-full text-left rounded-xl px-4 py-3 text-sm transition-all duration-200 flex items-center gap-3 ${style}`}
                      >
                        <span className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-foreground">{opt}</span>
                        {answered && idx === q.correct && <CheckCircle2 className="ml-auto text-green-400 shrink-0" size={18} />}
                        {answered && idx === selected && idx !== q.correct && <XCircle className="ml-auto text-red-400 shrink-0" size={18} />}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5"
                  >
                    <div className="glass rounded-xl p-4 mb-4">
                      <p className="text-xs text-primary font-semibold mb-1">Explanation</p>
                      <p className="text-muted-foreground text-sm">{q.explanation}</p>
                    </div>
                    <button
                      onClick={next}
                      className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                    >
                      {current < questions.length - 1 ? (
                        <>Next Question <ArrowRight size={16} /></>
                      ) : (
                        <>See Results <Trophy size={16} /></>
                      )}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-4"
              >
                <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
                  <Trophy className="text-primary" size={36} />
                </div>
                <h3 className="text-foreground font-bold text-2xl mb-1">Quiz Complete!</h3>
                <p className="text-4xl font-extrabold text-gradient mb-2">{score}/{questions.length}</p>
                <p className="text-muted-foreground text-sm mb-6">
                  {pct >= 80 ? "Excellent! You've mastered this topic." : pct >= 50 ? "Good effort! Review the concepts you missed." : "Keep practicing! Use the Feynman Mirror to strengthen weak areas."}
                </p>

                {/* Mini heatmap */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold ${
                        i < score ? "bg-green-500/30 text-green-400" : "bg-red-500/30 text-red-400"
                      }`}
                    >
                      Q{i + 1}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={restart}
                    className="flex-1 glass glow-border rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 text-foreground hover:bg-muted transition-all"
                  >
                    <RotateCcw size={16} /> Retry
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-sm hover:brightness-110 transition-all"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuizPage;
