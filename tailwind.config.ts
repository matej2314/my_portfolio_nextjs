import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				kanit: ['var(--font-kanit)', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

export default config;
