/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B1F4D',
          red: '#D71920',
          'navy-light': '#152e66',
          'navy-dark': '#060f24',
          gray: '#f4f6fc',
          light: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft-lg': '0 10px 30px -10px rgba(11, 31, 77, 0.1)',
        'premium': '0 20px 40px -15px rgba(11, 31, 77, 0.15)',
        'red-glow': '0 4px 14px 0 rgba(215, 25, 32, 0.3)',
      }
    },
  },
  plugins: [],
}
