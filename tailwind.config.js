/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./views/pages/*.ejs",
    "./views/pages/partials/*.ejs",
    "./views/pages/tools/*.ejs",
    "./*.html",
  ],
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
