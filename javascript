/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        btc: {
          DEFAULT: '#F7931A',
          hover: '#E07E07',
          dark: '#935409',
          gold: '#FFD700',
        },
        dark: {
          900: '#07080B',
          800: '#0E1117',
          700: '#161B22',
          600: '#21262D',
          500: '#30363D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
