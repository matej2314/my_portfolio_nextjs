import { Kanit } from 'next/font/google';

export const kanit = Kanit({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	style: ['normal', 'italic'],
	variable: '--font-kanit',
	display: 'swap',
});
