import { z } from 'zod';
import { idSchema } from './idSchema';
import { validatedString } from './basicValidation';

export const experienceSchema = z.object({
	employer: validatedString(5, 30, {
		requiredError: 'Employer is required.',
		tooSmall: 'Employer must contains at least 10 characters.',
		tooBig: 'Employer must contains at most 30 characters.',
	}),
	employer_url: z.string().url().optional().nullable(),
	is_current: z.string().transform(val => val === 'true'),
	position: validatedString(10, 30, {
		requiredError: 'Position is required.',
		tooSmall: 'Position must contains at least 10 characters.',
		tooBig: 'Position must contains at most 30 characters.',
	}),
	hourly_rate: validatedString(2, 3, {
		tooSmall: 'Hourly rate must contains at least 2 characters.',
		tooBig: 'Hourly rate must contains at most 3 characters.',
		requiredError: 'Hourly rate is required.',	
	}).optional().nullable(),
	employed_since: validatedString(5, 10, {
		requiredError: 'Employed since is required.',
		tooSmall: 'Employed since must contains at least 5 characters.',
		tooBig: 'Employed since must contains at most 10 characters.',
	}).optional(),
	employed_to: validatedString(5, 10, {
		requiredError: 'Employed to is required.',
		tooSmall: 'Employed to must contains at least 5 characters.',
		tooBig: 'Employed to must contains at most 10 characters.',
	})
		.optional()
		.nullable(),
});

export const updateExperienceSchema = experienceSchema.extend({
	id: idSchema,
	is_current: z.union([z.string().transform(val => val === 'true'), z.undefined()]).optional(),
	hourlyRate: z.number().min(0).max(150).optional().nullable(),
	employed_since: validatedString(5, 10, {
		requiredError: 'Employed since is required.',
		tooSmall: 'Employed since must contains at least 5 characters.',
		tooBig: 'Employed since must contains at most 10 characters.',
	}).optional(),
	employed_to: validatedString(5, 10, {
		requiredError: 'Employed to is required.',
		tooSmall: 'Employed to must contains at least 5 characters.',
		tooBig: 'Employed to must contains at most 10 characters.',
	})
		.optional()
		.nullable(),
	position: validatedString(10, 30, {
		requiredError: 'Position is required.',
		tooSmall: 'Position must contains at least 10 characters.',
		tooBig: 'Position must contains at most 30 characters.',
	}).optional(),
	employer: validatedString(5, 30, {
		requiredError: 'Employer is required.',
		tooSmall: 'Employer must contains at least 10 characters.',
		tooBig: 'Employer must contains at most 30 characters.',
	}).optional(),
});
