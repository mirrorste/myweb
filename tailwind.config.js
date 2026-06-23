/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        gh: {
          bg: "#0d1117",
          "bg-secondary": "#161b22",
          "bg-tertiary": "#21262d",
          border: "#30363d",
          "border-muted": "#21262d",
          text: "#c9d1d9",
          "text-muted": "#8b949e",
          "text-link": "#58a6ff",
          green: "#3fb950",
          "green-muted": "#238636",
          purple: "#bc8cff",
          orange: "#d29922",
          red: "#f85149",
          blue: "#58a6ff",
        },
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "SFMono-Regular",
          "Consolas",
          "monospace",
        ],
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(63, 185, 80, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(63, 185, 80, 0.6)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
