/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:   '#8B6F47',
        secondary: '#E8DCC8',
        accent:    '#D4A574',
        dark:      '#3E2723',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body:    ['system-ui', 'sans-serif'],
      },
      keyframes: {
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(20px,-30px) scale(1.05)' },
          '66%':     { transform: 'translate(-15px,15px) scale(0.95)' },
        },
      },
      animation: {
        blob: 'blob 8s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
