import { z } from 'zod';

export function containsXSS(value: string): boolean {
	const patterns = [/<\s*script/gi, /<\s*\/\s*script\s*>/gi, /on\w+\s*=\s*["']?.*?["']/gi, /javascript:/gi, /data:\s*text\/html/gi, /<\s*iframe/gi, /<\s*object/gi, /<\s*embed/gi, /<\s*svg/gi, /<\s*img/gi, /&#[xX]?[0-9a-fA-F]+;/g, /%3C|%3E|%2F/gi, /<[^>]+>/g];

	return patterns.some(pattern => pattern.test(value));
}

export function validatedString(
	min: number = 1,
	max?: number,
	messages?: {
		requiredError?: string;
		tooSmall?: string;
		tooBig?: string;
	}
) {
	let base = z
		.string({
			required_error: messages?.requiredError,
		})
		.trim()
		.min(min, { message: messages?.tooSmall });

	if (typeof max === 'number') {
		base = base.max(max, { message: messages?.tooBig });
	}

	return base;
}
