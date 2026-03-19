import { useState } from "react";
import { useConfetti } from "@/hooks/useConfetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy,
  Sparkles, BookOpen, AlertTriangle, Target, ChevronDown, ChevronUp, Baby,
} from "lucide-react";

type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
  childExplanation: string;
};

const questions: Question[] = [
  {
    topic: "Pointers",
    question: "What does a pointer store in C++?",
    options: ["The value of a variable", "The memory address of a variable", "The data type of a variable", "The size of a variable"],
    correct: 1,
    explanation: "A pointer stores the memory address of another variable, not the value itself.",
    childExplanation: "Imagine you have a treasure chest hidden somewhere. A pointer is like a treasure map — it doesn't have the gold, but it tells you exactly which room the chest is in! 🗺️",
  },
  {
    topic: "Pointers",
    question: "What does the '*' operator do when used with a pointer?",
    options: ["Multiplies the pointer", "Declares a new variable", "Dereferences the pointer to access the value", "Deletes the pointer"],
    correct: 2,
    explanation: "The dereference operator (*) accesses the value stored at the memory address the pointer is pointing to.",
    childExplanation: "You have a map that says 'Room 5'. Using the * is like actually walking to Room 5 and opening the door to see what's inside! Without *, you're just staring at the map. ⭐",
  },
  {
    topic: "Memory Management",
    question: "What happens if you try to access memory through a NULL pointer?",
    options: ["It returns 0", "It causes undefined behavior / crash", "It auto-allocates memory", "Nothing happens"],
    correct: 1,
    explanation: "Dereferencing a NULL pointer leads to undefined behavior, typically a segmentation fault or crash.",
    childExplanation: "A NULL pointer is like a treasure map that says 'NOWHERE'. If you try to go to Nowhere to find treasure... you'll trip and fall! The computer crashes because there's nothing there. 💥",
  },
  {
    topic: "Memory Management",
    question: "Which operator is used to dynamically allocate memory in C++?",
    options: ["malloc()", "alloc()", "new", "create()"],
    correct: 2,
    explanation: "The 'new' operator allocates memory on the heap and returns a pointer to that memory. 'malloc()' is from C and works but isn't idiomatic C++.",
    childExplanation: "Think of 'new' like raising your hand in class and asking the teacher for a new notebook. The teacher (computer) gives you one from the supply closet (heap memory) and you get to use it! 📓",
  },
  {
    topic: "OOP Concepts",
    question: "What is encapsulation in Object-Oriented Programming?",
    options: ["Inheriting from a parent class", "Bundling data and methods that operate on it together", "Creating multiple objects", "Overloading operators"],
    correct: 1,
    explanation: "Encapsulation means wrapping data (variables) and the code (methods) that acts on it into a single unit (class), and controlling access via public/private modifiers.",
    childExplanation: "Encapsulation is like a toy capsule machine! 🎰 Everything the toy needs (its parts and instructions) is bundled inside one capsule. You can play with the toy, but you can't see the gears inside — they're hidden and protected!",
  },
];

type TopicNotes = {
  title: string;
  keyPoints: string[];
  example: string;
  tip: string;
};

const topicNotes: Record<string, TopicNotes> = {
  Pointers: {
    title: "Pointers — Quick Revision",
    keyPoints: [
      "A pointer is a variable that holds the memory address of another variable.",
      "Declared with the * symbol: int* ptr = &myVar;",
      "The & (address-of) operator gets the address of a variable.",
      "The * (dereference) operator accesses the value at the stored address.",
      "Pointers can be reassigned to point to different variables.",
    ],
    example: `int x = 42;\nint* ptr = &x;    // ptr holds address of x\ncout << *ptr;     // prints 42 (dereferencing)`,
    tip: "Think of a pointer as a sticky note with a locker number written on it — the sticky note isn't the locker, it just tells you where to find your stuff.",
  },
  "Memory Management": {
    title: "Memory Management — Quick Revision",
    keyPoints: [
      "Stack memory is automatic — allocated when a function is called, freed when it returns.",
      "Heap memory is manual — you allocate with 'new' and must free with 'delete'.",
      "Forgetting to delete causes memory leaks — your program slowly eats RAM.",
      "Accessing freed memory = dangling pointer = crash or weird bugs.",
      "Modern C++ uses smart pointers (unique_ptr, shared_ptr) to manage memory automatically.",
    ],
    example: `int* p = new int(10);  // allocate on heap\ncout << *p;            // prints 10\ndelete p;              // free the memory\np = nullptr;           // avoid dangling pointer`,
    tip: "Treat heap memory like a library book — if you borrow it (new), you must return it (delete). Smart pointers are like auto-return systems.",
  },
  "OOP Concepts": {
    title: "OOP Concepts — Quick Revision",
    keyPoints: [
      "Encapsulation: Bundle data + methods together, hide internals with access modifiers.",
      "Abstraction: Show only essential features, hide complexity behind interfaces.",
      "Inheritance: Create new classes based on existing ones — promotes code reuse.",
      "Polymorphism: Same function name, different behavior depending on the object type.",
    ],
    example: `class Animal {\nprivate:\n  string name;\npublic:\n  void setName(string n) { name = n; }\n  virtual void speak() { cout << "..."; }\n};\nclass Dog : public Animal {\n  void speak() override { cout << "Woof!"; }\n};`,
    tip: "Think of a class like a blueprint for a house. Encapsulation = the walls (hiding plumbing). Inheritance = building a mansion from the house blueprint.",
  },
};

type Phase = "quiz" | "results" | "notes";

const QuizPage = ({ onClose }: { onClose: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [phase, setPhase] = useState<Phase>("quiz");
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  const [showChildExplanation, setShowChildExplanation] = useState<number | null>(null);

  const q = questions[current];
  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const pct = Math.round((score / questions.length) * 100);

  const weakTopics = [...new Set(
    questions
      .filter((qu, i) => answers[i] !== qu.correct)
      .map((qu) => qu.topic)
  )];

  const strongTopics = [...new Set(
    questions
      .filter((qu, i) => answers[i] === qu.correct)
      .map((qu) => qu.topic)
  )].filter((t) => !weakTopics.includes(t));

  const wrongQuestions = questions.filter((_, i) => answers[i] !== questions[i].correct);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setPhase("results");
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setAnswers(Array(questions.length).fill(null));
    setPhase("quiz");
    setExpandedNote(null);
    setShowChildExplanation(null);
  };

  const isPerfect = pct === 100;
  useConfetti(phase === "results" && isPerfect);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass rounded-2xl w-full max-w-lg overflow-hidden my-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={16} />
            <span className="text-sm font-bold text-foreground">
              {phase === "quiz" ? "Micro-Quiz" : phase === "results" ? "Results" : "Study Notes"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {phase !== "quiz" && (
              <div className="flex gap-1">
                {["results", "notes"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPhase(p as Phase)}
                    className={`text-xs px-3 py-1 rounded-full transition-all ${
                      phase === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p === "results" ? "Results" : "Notes"}
                  </button>
                ))}
              </div>
            )}
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-sm">
              Close
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* ─── QUIZ PHASE ─── */}
            {phase === "quiz" && (
              <motion.div
                key={`q-${current}`}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-medium">
                    Question {current + 1} of {questions.length}
                  </span>
                  <span className="text-xs font-medium glass rounded-full px-2.5 py-0.5 text-primary">{q.topic}</span>
                </div>
                <div className="h-1 rounded-full bg-muted mb-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: `${(current / questions.length) * 100}%` }}
                    animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <h3 className="text-foreground font-bold text-lg mb-6">{q.question}</h3>

                <div className="space-y-3">
                  {q.options.map((opt, idx) => {
                    let style = "glass hover:glow-border cursor-pointer";
                    if (answered) {
                      if (idx === q.correct) style = "border border-green-500/50 bg-green-500/10";
                      else if (idx === selected) style = "border border-red-500/50 bg-red-500/10";
                      else style = "glass opacity-40";
                    }
                    return (
                      <motion.button
                        key={idx}
                        whileHover={!answered ? { scale: 1.01 } : {}}
                        whileTap={!answered ? { scale: 0.99 } : {}}
                        onClick={() => handleSelect(idx)}
                        disabled={answered}
                        className={`w-full text-left rounded-xl px-4 py-3 text-sm transition-all duration-200 flex items-center gap-3 ${style}`}
                      >
                        <span className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-foreground flex-1">{opt}</span>
                        {answered && idx === q.correct && <CheckCircle2 className="text-green-400 shrink-0" size={18} />}
                        {answered && idx === selected && idx !== q.correct && <XCircle className="text-red-400 shrink-0" size={18} />}
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-5"
                    >
                      <div className="glass rounded-xl p-4 mb-4">
                        <p className="text-xs text-primary font-semibold mb-1">💡 Explanation</p>
                        <p className="text-muted-foreground text-sm">{q.explanation}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={next}
                        className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                      >
                        {current < questions.length - 1 ? (
                          <>Next Question <ArrowRight size={16} /></>
                        ) : (
                          <>See Results <Trophy size={16} /></>
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ─── RESULTS PHASE ─── */}
            {phase === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* Score circle */}
                <div className="text-center mb-6">
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" strokeWidth="6" className="stroke-muted" />
                      <motion.circle
                        cx="50" cy="50" r="42" fill="none" strokeWidth="6"
                        strokeLinecap="round"
                        className="stroke-primary"
                        strokeDasharray={264}
                        initial={{ strokeDashoffset: 264 }}
                        animate={{ strokeDashoffset: 264 - (264 * pct) / 100 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="text-2xl font-extrabold text-foreground"
                      >
                        {score}/{questions.length}
                      </motion.span>
                      <span className="text-xs text-muted-foreground">{pct}%</span>
                    </div>
                  </div>
                  <h3 className="text-foreground font-bold text-xl mb-1">
                    {isPerfect ? "🎉 Perfect Score!" : pct >= 80 ? "🔥 Excellent!" : pct >= 50 ? "💪 Good Effort!" : "📚 Keep Going!"}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {isPerfect
                      ? "You absolutely nailed it! Every single question correct — you've truly mastered these concepts. 🏆"
                      : pct >= 80 ? "You've got a solid grip on these concepts."
                      : pct >= 50 ? "Almost there — review the topics below to level up."
                      : "Focus on the weak areas below and try again."}
                  </p>

                  {isPerfect && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                      className="mt-4 inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-2"
                    >
                      <Trophy className="text-primary" size={16} />
                      <span className="text-primary text-sm font-semibold">Concept Master — All Topics Cleared!</span>
                    </motion.div>
                  )}
                </div>

                {/* Question breakdown */}
                <div className="space-y-2 mb-6">
                  {questions.map((qu, i) => {
                    const correct = answers[i] === qu.correct;
                    const isChildOpen = showChildExplanation === i;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <div
                          className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm ${
                            correct ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"
                          } ${!correct ? "rounded-b-none" : ""}`}
                        >
                          {correct
                            ? <CheckCircle2 className="text-green-400 shrink-0" size={16} />
                            : <XCircle className="text-red-400 shrink-0" size={16} />}
                          <span className="text-foreground flex-1 text-xs">{qu.question}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            correct ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                          }`}>
                            {qu.topic}
                          </span>
                          {!correct && (
                            <button
                              onClick={() => setShowChildExplanation(isChildOpen ? null : i)}
                              className="shrink-0 flex items-center gap-1 text-xs bg-primary/15 hover:bg-primary/25 text-primary rounded-full px-2 py-1 transition-all"
                              title="Explain like I'm a child"
                            >
                              <Baby size={12} />
                              <span className="hidden sm:inline">ELI5</span>
                            </button>
                          )}
                        </div>
                        <AnimatePresence>
                          {!correct && isChildOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-primary/5 border border-t-0 border-primary/20 rounded-b-xl px-4 py-3">
                                <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1.5">
                                  <Baby size={14} /> Explain Like I'm a Child
                                </p>
                                <p className="text-muted-foreground text-sm leading-relaxed">{qu.childExplanation}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Focus areas */}
                {weakTopics.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass rounded-xl p-4 mb-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="text-red-400" size={16} />
                      <span className="text-sm font-semibold text-foreground">Topics to Focus On</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {weakTopics.map((t) => (
                        <span key={t} className="text-xs bg-red-500/15 text-red-400 border border-red-500/20 rounded-full px-3 py-1 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {strongTopics.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="glass rounded-xl p-4 mb-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="text-green-400" size={16} />
                      <span className="text-sm font-semibold text-foreground">Mastered Topics</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {strongTopics.map((t) => (
                        <span key={t} className="text-xs bg-green-500/15 text-green-400 border border-green-500/20 rounded-full px-3 py-1 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Explain all wrong ones button */}
                {wrongQuestions.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      // Toggle all child explanations
                      if (showChildExplanation !== null) {
                        setShowChildExplanation(null);
                      } else {
                        const firstWrong = questions.findIndex((_, i) => answers[i] !== questions[i].correct);
                        setShowChildExplanation(firstWrong);
                      }
                    }}
                    className="w-full mb-4 bg-primary/10 border border-primary/20 text-primary rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/20 transition-all"
                  >
                    <Baby size={16} /> Explain Like I'm a Child
                  </motion.button>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={restart}
                    className="flex-1 glass glow-border rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 text-foreground hover:bg-muted transition-all"
                  >
                    <RotateCcw size={16} /> Retry
                  </motion.button>
                  {weakTopics.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPhase("notes")}
                      className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                    >
                      <BookOpen size={16} /> Study Notes
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

            {/* ─── NOTES PHASE ─── */}
            {phase === "notes" && (
              <motion.div
                key="notes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="text-primary" size={26} />
                  </div>
                  <h3 className="text-foreground font-bold text-xl mb-1">Quick Revision Notes</h3>
                  <p className="text-muted-foreground text-sm">
                    Based on your quiz results, here's what to review:
                  </p>
                </div>

                <div className="space-y-3">
                  {(weakTopics.length > 0 ? weakTopics : Object.keys(topicNotes)).map((topic, i) => {
                    const notes = topicNotes[topic];
                    if (!notes) return null;
                    const isExpanded = expandedNote === topic;

                    return (
                      <motion.div
                        key={topic}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedNote(isExpanded ? null : topic)}
                          className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="text-sm font-semibold text-foreground">{notes.title}</span>
                          </div>
                          {isExpanded ? <ChevronUp className="text-muted-foreground" size={16} /> : <ChevronDown className="text-muted-foreground" size={16} />}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 space-y-4">
                                {/* Key points */}
                                <div>
                                  <p className="text-xs text-primary font-semibold mb-2 uppercase tracking-wider">Key Points</p>
                                  <ul className="space-y-1.5">
                                    {notes.keyPoints.map((point, j) => (
                                      <motion.li
                                        key={j}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: j * 0.05 }}
                                        className="text-muted-foreground text-sm flex gap-2"
                                      >
                                        <span className="text-primary mt-1">•</span>
                                        {point}
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Code example */}
                                <div>
                                  <p className="text-xs text-primary font-semibold mb-2 uppercase tracking-wider">Code Example</p>
                                  <pre className="bg-background/80 rounded-lg p-3 text-xs text-foreground font-mono overflow-x-auto border border-border">
                                    {notes.example}
                                  </pre>
                                </div>

                                {/* Pro tip */}
                                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                                  <p className="text-xs text-primary font-semibold mb-1">💡 Pro Tip</p>
                                  <p className="text-muted-foreground text-xs leading-relaxed">{notes.tip}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Back to quiz */}
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPhase("results")}
                    className="flex-1 glass glow-border rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 text-foreground hover:bg-muted transition-all"
                  >
                    <ArrowRight size={16} className="rotate-180" /> Back to Results
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={restart}
                    className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                  >
                    <RotateCcw size={16} /> Retry Quiz
                  </motion.button>
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
