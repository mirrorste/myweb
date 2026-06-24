import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal, ChevronRight } from "lucide-react";
import { profile } from "@/data/profile";

const terminalLines = [
  { prompt: "$ whoami", output: "STEMirror" },
  { prompt: "$ location", output: "Earth, Solar System, Orion Arm, Milky Way" },
  { prompt: "$ echo $ROLE", output: "全栈开发工程师 & 系统编程爱好者" },
  { prompt: "$ ls ~/projects/", output: "web-apps  kernel-hacks  tools  ..." },
  { prompt: "$ status", output: "Coding with passion ✨" },
];

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= terminalLines.length) return;

    const line = terminalLines[lineIndex];
    const fullText = `${line.prompt}\n${line.output}`;

    if (currentText.length < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        setCurrentText("");
        setLineIndex((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentText, lineIndex]);

  return (
    <section className="relative min-h-[80vh] flex items-center py-20">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gh-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gh-purple/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gh-green/10 border border-gh-green/30 text-gh-green text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-gh-green animate-pulse" />
              欢迎来到我的博客
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="text-gh-text">你好，我是</span>
              <br />
              <span className="text-gradient font-mono">{profile.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg text-gh-text-muted mb-8 leading-relaxed max-w-xl"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => {
                  const postsEl = document.getElementById("posts");
                  if (postsEl) {
                    postsEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="gh-btn-primary"
              >
                浏览文章
                <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href="#/about"
                className="gh-btn"
              >
                了解更多
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-12 flex items-center gap-8"
            >
              <div>
                <div className="text-3xl font-bold text-gh-green font-mono">6+</div>
                <div className="text-sm text-gh-text-muted">年开发经验</div>
              </div>
              <div className="w-px h-12 bg-gh-border" />
              <div>
                <div className="text-3xl font-bold text-gh-blue font-mono">50+</div>
                <div className="text-sm text-gh-text-muted">技术文章</div>
              </div>
              <div className="w-px h-12 bg-gh-border" />
              <div>
                <div className="text-3xl font-bold text-gh-purple font-mono">1k+</div>
                <div className="text-sm text-gh-text-muted">GitHub Stars</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-gh-green/20 via-gh-blue/20 to-gh-purple/20 rounded-2xl blur-xl opacity-50" />
            <div className="relative gh-card overflow-hidden">
              <div className="terminal-header">
                <div className="terminal-dot bg-gh-red" />
                <div className="terminal-dot bg-gh-orange" />
                <div className="terminal-dot bg-gh-green" />
                <div className="flex-1 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-gh-text-muted" />
                  <span className="ml-2 text-sm text-gh-text-muted font-mono">
                    terminal
                  </span>
                </div>
              </div>

              <div className="p-6 font-mono text-sm h-96 overflow-hidden">
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className="mb-2">
                    <div className="text-gh-green flex items-center gap-2">
                      <span>$</span>
                      <span>{line.prompt.replace("$ ", "")}</span>
                    </div>
                    <div className="text-gh-text mt-1 ml-4">{line.output}</div>
                  </div>
                ))}

                {lineIndex < terminalLines.length && (
                  <div className="mb-2">
                    <div className="text-gh-green flex items-center gap-2">
                      <span>$</span>
                      <span>
                        {currentText.split("\n")[0]?.replace("$ ", "") || ""}
                      </span>
                      <span className="w-2 h-5 bg-gh-green animate-blink inline-block" />
                    </div>
                    {currentText.includes("\n") && (
                      <div className="text-gh-text mt-1 ml-4">
                        {currentText.split("\n")[1]}
                      </div>
                    )}
                  </div>
                )}

                {lineIndex >= terminalLines.length && (
                  <div className="text-gh-green flex items-center gap-2">
                    <span>$</span>
                    <span className="w-2 h-5 bg-gh-green animate-blink inline-block" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
