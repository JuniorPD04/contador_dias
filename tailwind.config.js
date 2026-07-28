/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#150F26",
          900: "#1F1638",
          800: "#2A1F4A",
          700: "#372a57",
        },
        violet: {
          700: "#4B2E7A",
          500: "#6B4A9E",
        },
        teal: {
          500: "#2F9C93",
          400: "#45B7AC",
        },
        rose: {
          500: "#E14F8A",
          400: "#EB6FA0",
        },
        gold: {
          400: "#F2C14E",
        },
        paper: {
          100: "#F7EFE1",
          300: "#DCD3EA",
          400: "#C9BFD9",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Figtree", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      boxShadow: {
        glow: "0 0 70px -12px rgba(225, 79, 138, 0.5)",
        goldglow: "0 0 60px -15px rgba(242, 193, 78, 0.55)",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: 0.15 },
          "50%": { opacity: 0.9 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "fade-up": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        twinkle: "twinkle 3.2s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
