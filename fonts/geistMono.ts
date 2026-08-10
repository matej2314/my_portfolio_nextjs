import { Geist_Mono } from 'next/font/google';

export const geistMono = Geist_Mono({
	subsets: ['latin', 'latin-ext'],
	variable: '--font-geist-mono',
	display: 'swap',
	adjustFontFallback: true,
});
