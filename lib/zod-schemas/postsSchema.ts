import { z } from 'zod';

import { idSchema } from './idSchema';
import { validatedString, containsXSS } from './basicValidation';

export const basePostSchema = z.object({
	post_title: validatedString(10, 200, {
		requiredError: 'Post title is required.',
		tooBig: 'Post title must contains maximum 200 characters.',
		tooSmall: 'Post title must contains minimum 10 characters.',
	}).refine(value => !containsXSS(value), {
		message: 'Post title contains dangerous characters.',
	}),
	post_lead: validatedString(10, 250, {
		requiredError: 'Post lead is required.',
		tooBig: 'Post lead must contains maximum 250 characters.',
		tooSmall: 'Post lead must contains minimum 10 characters.',
	}).refine(value => !containsXSS(value), {
		message: 'Post lead contains dangerous characters.',
	}),
	post_content: validatedString(1),
	post_imageName: validatedString(1, 200),
});

export const updatePostSchema = basePostSchema.extend({
	id: idSchema,
});
