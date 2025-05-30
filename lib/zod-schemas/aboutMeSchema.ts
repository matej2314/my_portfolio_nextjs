import { z } from "zod";
import { validatedString } from "./basicValidation";
import { idSchema } from "./idSchema";

export const aboutMeSchema = z.object({
    id: idSchema,
    about_text: validatedString(1),
});