/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        tierra: {
          50:  '#fdf8f3',
          100: '#f5e6d3',
          200: '#e8c9a0',
          300: '#d4a574',
          400: '#c4845a',
          500: '#a66a42',
          600: '#8a5435',
          700: '#6b3f27',
          800: '#4a2b19',
          900: '#2d1a0e',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}