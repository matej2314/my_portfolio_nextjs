import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatHeader = (key: string) => {
	return key
		.replace('Count', '')
		.replace(/([A-Z])/g, ' $1')
		.trim()
		.replace(/^./, s => s.toUpperCase());
};
