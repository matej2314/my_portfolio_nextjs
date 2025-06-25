import { z } from 'zod';
import { validatedString } from './basicValidation';
import { containsXSS } from './basicValidation';

export const contactSchema = z.object({
	client: validatedString(1, 20, {
		requiredError: 'Name is required.',
		tooSmall: 'Name must contains at least 1 character.',
		tooBig: 'Name must contains maximum 20 characters. ',
	}).refine(value => !containsXSS(value), {
		message: 'Name contains disallowed characters',
	}),
	email: z.string().email(),
	subject: validatedString(10, 20, {
		requiredError: 'Subject of the message is required.',
		tooSmall: 'Subject must contains at least 10 characters.',
		tooBig: 'Subject must contains maximum 20 characters.',
	}).refine(value => !containsXSS(value), {
		message: 'Subject contains disallowed characters.',
	}),
	content: validatedString(10, 400, {
		requiredError: 'Content of the message is required.',
		tooSmall: 'Message must contains at least 10 characters.',
		tooBig: 'Message must contains maximum 400 characters.',
	}).refine(value => !containsXSS(value), {
		message: 'Message contains disallowed characters.',
	}),
});
