import { z } from 'zod';
import { validatedString } from './basicValidation';

export const courseSchema = z.object({
    id: validatedString(1),
    course_name: validatedString(1, 300),
    course_date: validatedString(1).date(),
    course_organizer: validatedString(1, 300),
    course_category: validatedString(1, 100),
    
});