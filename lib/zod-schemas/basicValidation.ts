import { z } from 'zod';

export function validatedString(min: number = 1, max?: number) {
	let base = z.string().trim().min(min);

	if (typeof max === 'number') {
		base = base.max(max);
	}

	return base;
}
