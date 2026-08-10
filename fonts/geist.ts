import { Geist } from 'next/font/google';

export const geist = Geist({
	subsets: ['latin', 'latin-ext'],
	variable: '--font-geist',
	display: 'swap',
	adjustFontFallback: true,
});
