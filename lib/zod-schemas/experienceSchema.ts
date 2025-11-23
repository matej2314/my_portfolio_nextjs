import { z } from 'zod';
import { idSchema } from './idSchema';
import { validatedString } from './basicValidation';

export const experienceSchema = z.object({
    employer: validatedString(10, 30,
        {
            requiredError: 'Employer is required.',
            tooSmall: 'Employer must contains at least 10 characters.',
            tooBig: 'Employer must contains at most 30 characters.',
        }
    ),
    isCurrent: z.boolean(),
    position: validatedString(10, 30,
        {
            requiredError: 'Position is required.',
            tooSmall: 'Position must contains at least 10 characters.',
            tooBig: 'Position must contains at most 30 characters.',
        }
    ),
    hourlyRate: z.number().min(0).max(150),
    employedSince: z.date(),
    employedTo: z.date(),
});

export const updateExperienceSchema = experienceSchema.extend({
    id: idSchema,
    isCurrent: z.boolean().optional(),
    hourlyRate: z.number().min(0).max(150).optional(),
    employedSince: z.date().optional(),
    employedTo: z.date().optional(),
    position: validatedString(10, 30,
        {
            requiredError: 'Position is required.',
            tooSmall: 'Position must contains at least 10 characters.',
            tooBig: 'Position must contains at most 30 characters.',
        }
    ).optional(),
    employer: validatedString(10, 30,
        {
            requiredError: 'Employer is required.',
            tooSmall: 'Employer must contains at least 10 characters.',
            tooBig: 'Employer must contains at most 30 characters.',
        }
    ).optional(),
    updatedAt: z.date(),
})

