import { z } from 'zod';
import { validatedString, containsXSS } from './basicValidation';
import { idSchema } from './idSchema';

export const baseSkillSchema = z.object({
	skill_name: validatedString(5, 20, {
		requiredError: 'Skill name is required.',
		tooBig: 'Skill name must contains maximum 20 characters',
		tooSmall: 'Skill name must contains minimum 5 characters.',
	}).refine(value => !containsXSS(value), {
		message: 'Skill name contains dangerous characters.',
	}),
	skill_cat: validatedString(3, 20, {
		requiredError: 'Skill category is required.',
		tooBig: 'Skill category must contains maximum 20 characters.',
		tooSmall: 'Skill category must contains minimum 5 characters.',
	}).refine(value => !containsXSS(value), {
		message: 'Skill category contains dangerous characters.',
	}),
	icon_name: validatedString(5, 30, {
		tooSmall: 'Icon name must contains minimum 5 characters.',
		tooBig: 'Icon name must contains maximum 30 characters.',
	}).refine(value => !containsXSS(value), {
		message: 'Icon name contains dangerous characters.',
	}),
	icon_color: validatedString(5, 10, {
		tooBig: 'Icon color must contain maximum 10 characters.',
		tooSmall: 'Icon color must contains minimum 5 characters.',
	})
		.nullable()
		.optional(),
});

export const updateSkillSchema = baseSkillSchema.extend({
	id: idSchema,
});
