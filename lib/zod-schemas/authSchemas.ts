import { z } from 'zod';
import { validatedString, containsXSS } from './basicValidation';

const passwordField = z
	.string()
	.min(10, 'Password too short')
	.max(20, 'Password too long')
	.regex(/[a-z]/, 'Password must contain small character')
	.regex(/[A-Z]/, 'Password must contain upper character')
	.regex(/[0-9]/, 'Password must contain numbers between 0-9')
	.regex(/[*!#^%$@?]/, 'Password must contain minimum one special character.')
	.refine(value => !containsXSS(value), {
		message: 'Password contains potentially dangerous characters.',
	});

export const loginSchema = z.object({
	email: validatedString(1)
		.email()
		.refine(value => !containsXSS(value), {
			message: 'Email contains potentially dangerous characters.',
		}),
	password: passwordField,
});

export const signUpSchema = z
	.object({
		login: z.string().min(5).max(10),
		password: passwordField,
		confirmPassword: passwordField,
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords must match!',
		path: ['confirmPassword'],
	});
