/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				magic: ['"Cinzel Decorative"', 'cursive'],
			},
			animation: {
				float: 'float 3s ease-in-out infinite',
				glow: 'glow 2s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': {transform: 'translateY(0px)'},
					'50%': {transform: 'translateY(-20px)'},
				},
				glow: {
					'0%, 100%': {filter: 'brightness(1) drop-shadow(0 0 5px currentColor)'},
					'50%': {filter: 'brightness(1.3) drop-shadow(0 0 20px currentColor)'},
				},
			},
		},
	},
	plugins: [],
};
