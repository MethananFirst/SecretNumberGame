/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fontThaiMali: ["Mali", "cursive"],
        ramPart: ["Rampart One", "cursive"],
        lilitaOne: ["Lilita One", "cursive"],
        itim: ["Itim", "cursive"]
      }
    },
  },
  plugins: [],
}

