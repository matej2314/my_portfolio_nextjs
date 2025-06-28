import { z } from 'zod';
import { validatedString, containsXSS } from './basicValidation';
import { idSchema } from './idSchema';

export const aboutTxtSchema = validatedString(100, 500, {
	requiredError: 'About text description is required.',
	tooSmall: 'About description text must contains minimum 100 characters.',
	tooBig: 'About description text must contains maximum 500 characters.',
}).refine(value => !containsXSS(value), {
	message: 'About description text contains disallowed characters.',
});

export const aboutMeSchema = z.object({
	id: aboutTxtSchema,
	about_text: validatedString(1),
});
