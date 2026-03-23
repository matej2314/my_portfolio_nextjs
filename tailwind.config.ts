import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				kanit: ['var(--font-kanit)', 'sans-serif'],
				plusJakartaSans: ['var(--font-jakarta)', 'sans-serif'],
				inter: ['var(--font-inter)', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

export default config;
