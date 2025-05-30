import { z } from 'zod';
import { validatedString } from './basicValidation';
import { idSchema } from './idSchema';


export const baseProjectSchema = z.object({
    project_name: validatedString(1,300),
    project_category: validatedString(1,300),
    project_URL: validatedString(1,300),
    project_screenName: validatedString(1,100),
    goal: validatedString(),
    project_description:validatedString(1,300).nullable(),
    repo: validatedString(1,100).nullable(),
    technologies: validatedString(1,250).nullable(),
    difficulty: validatedString(1,10).nullable(),
    end_date: z.string().trim().optional().transform(val => val ? new Date(val) : null),
    long_text: z.string().trim().nullable(),
});

export const updateProjectSchema = baseProjectSchema.extend({
    id: idSchema,
});