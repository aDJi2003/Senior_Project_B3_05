/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'bebas-neue': ['var(--font-bebas-neue)', 'sans-serif'], 
        'poppins': ['var(--font-poppins)', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
