import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1f2937",
          foreground: "#f9fafb",
        },
        muted: {
          DEFAULT: "#6b7280",
          foreground: "#9ca3af",
        },
        accent: {
          DEFAULT: "#f3f4f6",
          foreground: "#374151",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        border: "#e5e7eb",
        input: "#d1d5db",
        ring: "#6366f1",
        chart: {
          "1": "#6366f1",
          "2": "#8b5cf6",
          "3": "#ec4899",
          "4": "#f59e0b",
          "5": "#10b981",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
        "sec-bg": "#1a1a1a",
        "button-hover": "#4f46e5",
        "muted-foreground": "#9ca3af",
        "primary-foreground": "#ffffff",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        geist: ["var(--font-geist-sans)", "Geist", "sans-serif"],
        "geist-mono": ["var(--font-geist-mono)", "Geist Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
        "bounce-in": "bounceIn 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
