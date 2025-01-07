/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DB954',
        secondary: '#191414',
        background: '#121212',
        surface: '#282828',
        text: '#FFFFFF',
      }
    },
  },
  plugins: [],
} 