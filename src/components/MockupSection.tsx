import { motion } from "framer-motion";
import { Bot, Send, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "ai" | "user";
  content: string;
  typing?: boolean;
};

const aiResponses: Record<string, string> = {
  default: "That's a good start! But can you be more specific? What exactly does a pointer *store*? Try explaining it like I've never written code before.",
  pointer: "Nice! You're saying a pointer stores a memory address—like a house number that tells you where to find the actual data. That's a solid analogy! Now, can you explain what happens when you *dereference* a pointer?",
  memory: "Great connection to memory! Think of RAM as a giant array of boxes. A pointer is just the index number of one of those boxes. You're really getting it!",
  variable: "Good thinking! So a pointer is related to a variable, but instead of holding data directly, it holds the *location* of that data. Can you think of why that's useful?",
};

const getAIResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("pointer") || lower.includes("address") || lower.includes("point")) return aiResponses.pointer;
  if (lower.includes("memory") || lower.includes("ram") || lower.includes("store")) return aiResponses.memory;
  if (lower.includes("variable") || lower.includes("value") || lower.includes("data")) return aiResponses.variable;
  return aiResponses.default;
};

const MockupSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "You struggled with Pointers in C++. Can you explain it to me simply?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    // Simulate AI "thinking"
    setTimeout(() => {
      const response = getAIResponse(userMsg);
      setMessages((prev) => [...prev, { role: "ai", content: response }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <section id="science" className="py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          The <span className="text-gradient">Feynman Mirror</span> in Action
        </motion.h2>
        <p className="text-muted-foreground text-center mb-4 max-w-lg mx-auto">
          Our AI challenges you to explain concepts simply—the ultimate test of true understanding.
        </p>
        <p className="text-primary text-center mb-12 text-sm font-medium animate-pulse">
          ↓ Try it yourself — type a response below!
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto glass rounded-2xl overflow-hidden"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-secondary/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="text-xs text-muted-foreground ml-3 font-medium">MasteryBridge AI — Study Session</span>
            <span className="ml-auto text-xs text-primary/70 font-medium">Live Demo</span>
          </div>

          {/* Chat area */}
          <div ref={chatRef} className="p-6 space-y-4 min-h-[260px] max-h-[400px] overflow-y-auto scroll-smooth">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="text-primary" size={16} />
                  </div>
                )}
                <div
                  className={`rounded-xl px-4 py-3 max-w-md text-sm ${
                    msg.role === "ai"
                      ? "glass rounded-tl-sm text-foreground"
                      : "bg-primary/15 rounded-tr-sm text-foreground glow-border"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0 mt-1">
                    <User className="text-secondary" size={16} />
                  </div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="text-primary" size={16} />
                </div>
                <div className="glass rounded-xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input bar */}
          <div className="px-4 pb-4">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Explain the concept in your own words..."
                className="bg-transparent flex-1 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="text-primary-foreground" size={14} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MockupSection;
