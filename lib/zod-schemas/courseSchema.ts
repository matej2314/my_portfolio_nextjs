import { z } from 'zod';
import { validatedString, containsXSS } from './basicValidation';
import { idSchema } from './idSchema';

export const baseCourseSchema = z.object({
	course_name: validatedString(10, 300, {
		requiredError: 'Course name is required.',
		tooBig: 'Course name must contains maximum 300 characters.',
		tooSmall: 'Course name must contains minimum 10 characters ',
	}).refine(value => !containsXSS(value), {
		message: 'Course name contains dangerous characters.',
	}),
	course_date: validatedString(1).date(),
	course_organizer: validatedString(10, 300, {
		requiredError: 'Course organizer name is required.',
		tooBig: 'Course organizer name must contains maximum 300 characters',
		tooSmall: 'Course organizer name must contains minimum 10 characters.',
	}),
	course_category: validatedString(1, 20, {
		requiredError: 'Course category is required.',
		tooBig: 'Course category name must contains max 20 characters.',
		tooSmall: 'Course category name must contains minimum 1 character.',
	}).refine(value => !containsXSS(value), {
		message: 'Course category name contains dangerous characters.',
	}),
});

export const updateCourseSchema = baseCourseSchema.extend({
	id: idSchema,
});
