import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // QLED-inspired color palette
        primary: {
          light: "#2563eb", // Vibrant blue
          DEFAULT: "#1d4ed8",
          dark: "#1e40af",
        },
        secondary: {
          light: "#7c3aed", // Rich purple
          DEFAULT: "#6d28d9",
          dark: "#5b21b6",
        },
        background: {
          light: "#ffffff",
          DEFAULT: "#f8fafc",
          dark: "#0f172a",
        },
        surface: {
          light: "#f1f5f9",
          DEFAULT: "#e2e8f0",
          dark: "#1e293b",
        },
        accent: {
          light: "#06b6d4", // Cyan
          DEFAULT: "#0891b2",
          dark: "#0e7490",
        },
        success: {
          light: "#22c55e",
          DEFAULT: "#16a34a",
          dark: "#15803d",
        },
        warning: {
          light: "#f59e0b",
          DEFAULT: "#d97706",
          dark: "#b45309",
        },
        error: {
          light: "#ef4444",
          DEFAULT: "#dc2626",
          dark: "#b91c1c",
        },
        text: {
          primary: {
            light: "#0f172a",
            dark: "#f8fafc",
          },
          secondary: {
            light: "#475569",
            dark: "#94a3b8",
          },
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(37, 99, 235, 0.15)',
        'glow-lg': '0 0 30px rgba(37, 99, 235, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;