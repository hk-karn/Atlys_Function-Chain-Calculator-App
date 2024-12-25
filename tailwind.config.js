/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        xs: "0.625rem",
        sm: "0.75rem",
        base: "0.875rem",
        large: "1.125rem",
      },
      spacing: {
        1: "5px",
        2: "10px",
        3: "15px",
        4: "20px",
      },
    },
  },
  plugins: [],
};