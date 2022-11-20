/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {

  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'xs': '576px',
      ...defaultTheme.screens,
      '3xl': '1920px'
    },
  },
  plugins: [],
}
