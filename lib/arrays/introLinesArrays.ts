import { type Line } from '@/types/IntroTypes';

export const linesDynamic: Line[] = [
	{ type: 'typing', text: 'npm start' },
	{ type: 'typing', text: 'Starting server...', delayAfter: 600 },
	{ type: 'typing', text: 'Server running on port 443', delayAfter: 300 },
];

export const linesStatic: Line[] = [
	{ type: 'static', text: '(kali@kali)-[~]: $ cd my_portfolio' },
	{ type: 'static', text: '(kali@kali)-[~/my_portfolio]: $ ls' },
	{
		type: 'static',
		text: '(kali@kali)-[~/my_portfolio]: $ package-lock.json package.json index.html index.css index.js public/ tsconfig.json next.config.ts',
	},
];
