import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        foreground: "#F3F3F3",
        muted: "#888888",
        subtle: "#161616",
        border: "#262626",
        accent: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Syne", "sans-serif"],
        mono: ["var(--font-mono)", "IBM Plex Mono", "monospace"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marqueeReverse 30s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        widest: "0.25em",
        ultra: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
