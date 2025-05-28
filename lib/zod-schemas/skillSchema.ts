import { z } from "zod";
import { validatedString } from "./basicValidation";

export const skillSchema = z.object({
    skill_name: validatedString(1, 100),
    skill_cat: validatedString(1, 100),
    icon_name: validatedString(1, 100),
    icon_color: validatedString(1, 100),
});