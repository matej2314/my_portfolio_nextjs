import { z } from "zod";
import { validatedString } from "./basicValidation";

export const aboutMeSchema = z.object({
    about_text: validatedString(1),
});