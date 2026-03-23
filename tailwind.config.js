/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Lato', '"Helvetica Neue"', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#fdf8ee',
          100: '#f9edcf',
          200: '#f2d99a',
          300: '#eac05e',
          400: '#e4a832',
          500: '#d4891a',
          600: '#b86a12',
          700: '#924e13',
          800: '#783f16',
          900: '#643515',
        },
        warm: {
          50: '#fdf6f0',
          100: '#fae8d8',
          200: '#f4ceae',
          300: '#ecad7b',
          400: '#e38447',
          500: '#db6a27',
        },
      },
      animation: {
        'spin-slow': 'spin 28s linear infinite',
        'float': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        scrollDot: {
          '0%, 100%': { opacity: '1', transform: 'translateY(0)' },
          '50%': { opacity: '0.3', transform: 'translateY(8px)' },
        },
      },
    },
  },
  plugins: [],
}
