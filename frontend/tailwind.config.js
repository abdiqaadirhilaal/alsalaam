/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef2f9",
          100: "#d6e0f0",
          200: "#adc1e1",
          300: "#7f9ecf",
          400: "#5379ba",
          500: "#345aa3",
          600: "#254586",
          700: "#1c356a",
          800: "#152850",
          900: "#0d1a35",
          950: "#080f20",
        },
        gold: {
          400: "#e8c56a",
          500: "#d4a935",
          600: "#b3892a",
        },
      },
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideUp: { "0%": { opacity: 0, transform: "translateY(24px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
