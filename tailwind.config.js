const colors = require('tailwindcss/colors')

module.exports = {
	mode: 'jit',
	content: ['./public/**/*.html', './pages/**/*.{js,jsx,ts,tsx,vue}', './components/**/*.{js,jsx,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				heading: ['Montserrat', 'sans-serif'],
			},
			colors: {
				primary: {
					DEFAULT: colors.emerald['400'],
					...colors.emerald,
				},
				accent: {
					DEFAULT: '#262637',
				},
				muted: {
					DEFAULT: '#f8f8fc',
				},
			},
		},
	},
	plugins: [],
}
