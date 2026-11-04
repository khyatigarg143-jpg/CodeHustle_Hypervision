/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050505',
          900: '#090909',
          850: '#0d0d0d',
          800: '#141414',
          700: '#222222',
          600: '#333333',
        },
        crimson: {
          base: '#dc2626',
          bright: '#ff1a24',
          dark: '#991b1b',
          deep: '#7f1d1d',
          accent: '#e50914',
          glow: 'rgba(220, 38, 38, 0.25)',
        },
      },
      fontFamily: {
        title: ['Orbitron', 'MrRobot', 'sans-serif'],
        display: ['MrRobot', 'Orbitron', 'Impact', 'sans-serif'],
        mono: ['"Share Tech Mono"', '"Courier New"', 'monospace'],
        sans: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'card-glow': '0 0 35px rgba(220, 38, 38, 0.22), inset 0 0 1px rgba(255, 255, 255, 0.05)',
        'btn-glow': '0 0 22px rgba(220, 38, 38, 0.45)',
        'btn-glow-hover': '0 0 32px rgba(255, 26, 36, 0.75)',
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
        shake: 'shake 0.28s linear',
      },
      keyframes: {
        blink: {
          'to': { visibility: 'hidden' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '50%': { transform: 'translateX(4px)' },
          '75%': { transform: 'translateX(-2px)' },
        }
      }
    },
  },
  plugins: [],
}
