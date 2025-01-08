/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Avenir", "Helvetica", "Arial", "sans-serif"], // For general sans-serif text
        prata: ["Prata", "serif"], // For serif text
        outfit: ["Outfit", "sans-serif"], // For outfit-specific text
      },
    },
  },
  plugins: [],
};
