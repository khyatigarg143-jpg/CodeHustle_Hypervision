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
          950: '#060606',
          900: '#0b0b0b',
          850: '#11100f',
          800: '#181615',
          700: '#282421',
          600: '#38302b',
        },
        crimson: {
          base: '#dc2626',
          dark: '#991b1b',
          deep: '#7f1d1d',
          accent: '#e13a36',
          glow: 'rgba(220, 38, 38, 0.18)',
        },
        paper: {
          light: '#f5f2ed',
          DEFAULT: '#ece9e4',
          muted: '#8e8780',
          dim: '#615b55',
        }
      },
      fontFamily: {
        display: ['MrRobot', 'Impact', 'sans-serif'],
        mono: ['"Share Tech Mono"', '"Courier New"', 'monospace'],
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
        shake: 'shake 0.28s linear',
        pulseSlow: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blink: {
          'to': { visibility: 'hidden' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-3px)' },
        }
      }
    },
  },
  plugins: [],
}
