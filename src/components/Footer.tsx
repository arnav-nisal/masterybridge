import { Sparkles } from "lucide-react";

const Footer = () => (
  <footer className="py-10 border-t border-border">
    <div className="container mx-auto px-6 text-center space-y-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Sparkles className="text-primary" size={16} />
        <span className="text-sm font-bold text-foreground">MasteryBridge AI</span>
      </div>
      <p className="text-muted-foreground text-sm">
        Built by <span className="text-foreground font-medium">Arnav, Rohit, Samarth, Parth, and Yash</span> for DESPU Design Thinking 2026.
      </p>
      <p className="text-muted-foreground/50 text-xs">
        Powered by the Feynman Technique • Active Recall • Spaced Repetition
      </p>
    </div>
  </footer>
);

export default Footer;
