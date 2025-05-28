import { z } from "zod";
import { validatedString } from "./basicValidation";

export const contactSchema = z.object({
    client: validatedString(1, 20),
    email: validatedString(5).email(),
    subject: validatedString(1),
    content: validatedString(1, 250),
});