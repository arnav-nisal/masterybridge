import { motion } from "framer-motion";
import { Bot, Send } from "lucide-react";

const MockupSection = () => (
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
      <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
        Our AI challenges you to explain concepts simply—the ultimate test of true understanding.
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
        </div>

        {/* Chat area */}
        <div className="p-6 space-y-4 min-h-[220px]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-1">
              <Bot className="text-primary" size={16} />
            </div>
            <div className="glass rounded-xl rounded-tl-sm px-4 py-3 max-w-md">
              <p className="text-foreground text-sm">
                You struggled with <span className="text-primary font-semibold">Pointers in C++</span>. Can you explain it to me simply?
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 justify-end">
            <div className="bg-primary/10 rounded-xl rounded-tr-sm px-4 py-3 max-w-md glow-border">
              <p className="text-foreground text-sm opacity-50 italic">Type your explanation here...</p>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
            <input
              type="text"
              placeholder="Explain the concept in your own words..."
              className="bg-transparent flex-1 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              readOnly
            />
            <button className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center hover:brightness-110 transition-all">
              <Send className="text-primary-foreground" size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default MockupSection;
