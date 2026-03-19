import { CloudUpload, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";

type UploadState = "idle" | "dragging" | "processing" | "done";

const HeroSection = ({ onStartQuiz }: { onStartQuiz?: () => void }) => {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    setUploadState("processing");
    // Simulate processing
    setTimeout(() => setUploadState("done"), 2200);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const reset = () => {
    setUploadState("idle");
    setFileName("");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[150px]"
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground font-medium">Beta — Now Open for Early Testers</span>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
        >
          Stop Reading.{" "}
          <span className="text-gradient">Start Mastering.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          The AI-powered study assistant that transforms static PDF notes into interactive micro-quizzes and simple explanations. Prove you know it before the exam.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={onFileChange}
            className="hidden"
          />

          <AnimatePresence mode="wait">
            {uploadState === "idle" || uploadState === "dragging" ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setUploadState("dragging"); }}
                onDragLeave={() => setUploadState("idle")}
                onDrop={onDrop}
                className={`max-w-xl mx-auto rounded-2xl border-2 border-dashed p-12 transition-all duration-300 cursor-pointer group
                  ${uploadState === "dragging"
                    ? "border-primary bg-primary/10 glow-cyan scale-[1.02]"
                    : "border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5"
                  }`}
              >
                <motion.div
                  animate={uploadState === "dragging" ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CloudUpload className="mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" size={48} />
                </motion.div>
                <p className="text-foreground font-semibold text-lg mb-1">
                  {uploadState === "dragging" ? "Release to upload!" : "Drop your PDF lecture notes here to generate a quiz"}
                </p>
                <p className="text-muted-foreground text-sm">or click to browse files</p>
              </motion.div>
            ) : uploadState === "processing" ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-xl mx-auto rounded-2xl glass glow-border p-12"
              >
                <Loader2 className="mx-auto mb-4 text-primary animate-spin" size={48} />
                <p className="text-foreground font-semibold text-lg mb-1">Processing your notes...</p>
                <p className="text-muted-foreground text-sm">{fileName}</p>
                <div className="mt-4 max-w-xs mx-auto h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto rounded-2xl glass glow-border p-12"
              >
                <CheckCircle2 className="mx-auto mb-4 text-primary" size={48} />
                <p className="text-foreground font-semibold text-lg mb-1">Quiz Generated!</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <FileText className="text-muted-foreground" size={16} />
                  <p className="text-muted-foreground text-sm">{fileName}</p>
                </div>
                <p className="text-primary text-sm mb-4">3 micro-questions ready • Estimated 5 min</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={onStartQuiz}
                    className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm glow-cyan hover:brightness-110 hover:scale-105 transition-all"
                  >
                    Start Quiz
                  </button>
                  <button
                    onClick={reset}
                    className="glass glow-border px-6 py-2.5 rounded-lg text-foreground text-sm font-medium hover:bg-muted transition-all"
                  >
                    Upload Another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
