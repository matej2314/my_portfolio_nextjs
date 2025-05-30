import { z } from "zod";

import { idSchema } from "./idSchema";
import { validatedString } from "./basicValidation";

export const basePostSchema = z.object({
    post_title: validatedString(1, 200),
    post_lead: validatedString(1, 250),
    post_content: validatedString(1,),
    post_imageName: validatedString(1, 200)
});

export const updatePostSchema = basePostSchema.extend({
    id: idSchema,
});