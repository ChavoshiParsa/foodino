/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        lg: "1110px",
        smm: { max: "400px" },
      },
      animation: {
        colorize: "changeColor 15s linear infinite",
        trigger: "trig 10s infinite",
        alertTimerScale: "timerS 5s linear",
        alertTimerFade: "timerF 5s linear",
        loadSpin: "spinner 1s linear infinite",
        loadSpinReverse: "spinnerReverse 1s linear infinite",
      },
      keyframes: {
        changeColor: {
          "0%": { color: "orange" },
          "10%": { color: "red" },
          "20%": { color: "yellow" },
          "30%": { color: "purple" },
          "40%": { color: "green" },
          "50%": { color: "lightblue" },
          "60%": { color: "blue" },
          "70%": { color: "darkblue" },
          "80%": { color: "yellow" },
          "90%": { color: "red" },
          "100%": { color: "orange" },
        },
        trig: {
          "0%, 100% ": {
            transform: "rotate(4deg) scale(0.95)",
          },
          "50% ": {
            transform: "rotate(-4deg) scale(1.05)",
          },
        },
        timerS: {
          "0%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0)" },
        },
        timerF: {
          "85%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        spinner: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spinnerReverse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      colors: {
        gold: {
          light: "#ffe34f",
          DEFAULT: "#ffd700",
          dark: "#e0bd00",
        },
        midnight: {
          DEFAULT: "#0021a3",
          dark: "#040348",
        },
        back: {
          DEFAULT: "#f5f9ff",
        },
        for: {
          DEFAULT: "#111",
        },
      },
      fontFamily: {
        pop: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        ops: ['"Open Sans"', "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        dance: ['"Dancing Script"', "cursive"],
      },
    },
  },
  variants: {
    display: [
      "children",
      "default",
      "children-first",
      "children-last",
      "children-odd",
      "children-even",
      "children-not-first",
      "children-not-last",
      "children-hover",
      "hover",
      "children-focus",
      "focus",
      "children-focus-within",
      "focus-within",
      "children-active",
      "active",
      "children-visited",
      "visited",
      "children-disabled",
      "disabled",
      "responsive",
    ],
  },
  plugins: [
    require("tailwindcss-children"),
    require("prettier-plugin-tailwindcss"),
  ],
};
