import { z } from 'zod';
import { validatedString, containsXSS, validatedUrl } from './basicValidation';
import { idSchema } from './idSchema';

export const baseProjectSchema = z.object({
	project_name: validatedString(10, 300, {
		requiredError: 'Project name is required.',
		tooBig: 'Project name must contains maximum 300 characters.',
		tooSmall: 'Projectt name must contains minimum 10 characters.',
	}).refine(value => !containsXSS(value), {
		message: 'Project name contains dangerous characters.',
	}),
	project_category: validatedString(5, 10, {
		requiredError: 'Project category is required.',
		tooBig: 'Project category must contains maximum 10 characters.',
		tooSmall: 'Project category must contains minimum 5 characters.',
	}).refine(value => !containsXSS(value), {
		message: 'Project category contains dangerous characters.',
	}),
	project_URL: validatedUrl(),
	goal: validatedString(5, 200, {
		requiredError: 'Project goal description is required.',
		tooBig: 'Project goal must contains maximum 200 characters.',
		tooSmall: 'Project goal must contains minimum 5 characters.',
	}).refine(value => !containsXSS(value), {
		message: 'Project goal contains dangerous characters.',
	}),
	project_description: validatedString(20, 300, {
		requiredError: 'Project description is required',
		tooBig: 'Project description must contains maximum 300 characters',
		tooSmall: 'Project description must contains minimum 20 characters',
	})
		.nullable()
		.refine(value => !containsXSS(value as string), {
			message: 'Project description contains dangerous characters.',
		}),
	repo: validatedUrl(),
	technologies: validatedString(10, 250, {
		requiredError: 'Technologies is required',
		tooBig: 'Technologies must contains maximum 250 characters.',
		tooSmall: 'Technologies must contains minimum 10 characters.',
	}).nullable(),
	difficulty: validatedString(1, 10, {
		requiredError: 'Project difficulty is required.',
		tooBig: 'Project difficulty must contains maximum 10 characters.',
		tooSmall: 'Project difficulty must contains minimum 1 character.',
	}).nullable(),
	end_date: z
		.string()
		.trim()
		.optional()
		.transform(val => (val ? new Date(val) : null)),
	long_text: validatedString(20, 500, {
		requiredError: 'Long description text is required.',
		tooBig: 'Long description text must contains maximum 500 characters.',
		tooSmall: 'Long description text must contains minimum 20 characters.',
	}).refine(value => !containsXSS(value), {
		message: 'Long description text contains dangerous characters.',
	}),
});

export const updateProjectSchema = baseProjectSchema.extend({
	id: idSchema,
});
