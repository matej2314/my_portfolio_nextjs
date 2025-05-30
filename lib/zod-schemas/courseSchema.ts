import { z } from 'zod';
import { validatedString } from './basicValidation';
import { idSchema } from './idSchema';

export const baseCourseSchema = z.object({
    course_name: validatedString(1, 300),
    course_date: validatedString(1).date(),
    course_organizer: validatedString(1, 300),
    course_category: validatedString(1, 100),
    
});

export const updateCourseSchema = baseCourseSchema.extend({
    id: idSchema,
});

