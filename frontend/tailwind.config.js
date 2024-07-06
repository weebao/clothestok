/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2AF0EA",
        secondary: "#4C29F6",
        accent: "#FE2858",
        "accent-hover": "#DE8C9D"
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
        header: ["Montserrat", "sans-serif"],
        apple: ["SF Pro Display", "sans-serif"],
      }
    },
  },
  plugins: [],
};
