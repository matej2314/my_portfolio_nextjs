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
	project_category: validatedString(5, 300, {
		requiredError: 'Project category is required.',
		tooBig: 'Project category must contains maximum 300 characters.',
		tooSmall: 'Project category must contains minimum 5 characters.',
	}).refine(value => !containsXSS(value), {
		message: 'Project category contains dangerous characters.',
	}),
	project_URL: validatedUrl(5, 300, {
		requiredError: 'Project URL is required.',
		tooSmall: 'Project URL must contains minimum 5 characters.',
		tooBig: 'Project URL must contains maximum 300 characters.',
	}),
	goal: validatedString(5, 300, {
		requiredError: 'Project goal description is required.',
		tooBig: 'Project goal must contains maximum 300 characters.',
		tooSmall: 'Project goal must contains minimum 5 characters.',
	})
		.refine(value => !containsXSS(value), {
			message: 'Project goal contains dangerous characters.',
		})
		.nullable(),
	goal_pl: validatedString(5, 300, {
		requiredError: 'Project goal description in Polish is required.',
		tooBig: 'Project goal in Polish must contains maximum 300 characters.',
		tooSmall: 'Project goal in Polish must contains minimum 5 characters.',
	})
		.refine(value => !containsXSS(value), {
			message: 'Project goal in Polish contains dangerous characters.',
		})
		.nullable(),
	project_description: validatedString(20, 300, {
		requiredError: 'Project description is required',
		tooBig: 'Project description must contains maximum 300 characters',
		tooSmall: 'Project description must contains minimum 20 characters',
	})
		.nullable()
		.refine(value => !containsXSS(value as string), {
			message: 'Project description contains dangerous characters.',
		}),
	description_pl: validatedString(20, 400, {
		requiredError: 'Project description in Polish is required',
		tooBig: 'Project description in Polish must contains maximum 400 characters.',
		tooSmall: 'Project description in Polish must contains minimum 20 characters.',
	})
		.nullable()
		.refine(value => !containsXSS(value as string), {
			message: 'Project description in Polish contains dangerous characters.',
		}),
	repo: validatedUrl(5, 100, {
		requiredError: 'Repository URL is required.',
		tooSmall: 'Repository URL must contains minimum 5 characters.',
		tooBig: 'Repository URL must contains maximum 100 characters.',
	}).nullable(),
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
	long_text: validatedString(20, 65535, {
		requiredError: 'Long description text is required.',
		tooBig: 'Long description text must contains maximum 65535 characters.',
		tooSmall: 'Long description text must contains minimum 20 characters.',
	})
		.refine(value => !containsXSS(value), {
			message: 'Long description text contains dangerous characters.',
		})
		.nullable(),
	long_text_pl: validatedString(20, 65535, {
		requiredError: 'Long description text in Polish is required.',
		tooBig: 'Long description text in Polish must contains maximum 65535 characters.',
		tooSmall: 'Long description text in Polish must contains minimum 20 characters.',
	})
		.refine(value => !containsXSS(value), {
			message: 'Long description text in Polish contains dangerous characters.',
		})
		.nullable(),
	conclusion: validatedString(20, 65535, {
		requiredError: 'Project conclusion is required.',
		tooBig: 'Project conclusion must contains maximum 65535 characters.',
		tooSmall: 'Project conclusion must contains minimum 20 characters.',
	})
		.refine(value => !containsXSS(value), {
			message: 'Project conclusion contains dangerous characters.',
		})
		.nullable(),
	conclusion_pl: validatedString(20, 65535, {
		requiredError: 'Project conclusion in Polish is required.',
		tooBig: 'Project conclusion in Polish must contains maximum 65535 characters.',
		tooSmall: 'Project conclusion in Polish must contains minimum 20 characters.',
	})
		.refine(value => !containsXSS(value), {
			message: 'Project conclusion in Polish contains dangerous characters.',
		})
		.nullable(),
});

export const updateProjectSchema = baseProjectSchema.extend({
	id: idSchema,
	project_screenName: validatedString(5, 100, {
		requiredError: 'Project screen name is required.',
		tooBig: 'Project screen name must contains maximum 100 characters.',
		tooSmall: 'Project screen name must contains minimum 10 characters.',
	})
		.refine(value => !containsXSS(value), {
			message: 'Project screen name contains dangerous characters.',
		})
		.nullable()
		.optional(),
});
