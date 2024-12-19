/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : "#c2a482",
        dark : "#372c26",
        light: "#F8EFE0"
      },
      boxShadow: {
        'hard': '8px 8px 5px 0 rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}