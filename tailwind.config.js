const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './pages/**/*.{js,jsx,ts,tsx,vue}', './components/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xxl: '1752px',
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: colors.red['400'],
          ...colors.red,
        },
        accent: {
          DEFAULT: '#262637',
        },
        muted: {
          DEFAULT: '#f8f8fc',
        },
        bg: '#1D1D27',
        card: '#2b2b35',
      },
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        full: '9999px',
      },
      boxShadow: {
        DEFAULT: '0 2px 4px rgba(0, 0, 0, .5)',
      },
    },
  },
  plugins: [],
}
