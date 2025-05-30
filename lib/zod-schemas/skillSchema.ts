import { z } from "zod";
import { validatedString } from "./basicValidation";
import { idSchema } from "./idSchema";

export const baseSkillSchema = z.object({
    skill_name: validatedString(1, 100),
    skill_cat: validatedString(1, 100),
    icon_name: validatedString(1, 100),
    icon_color: validatedString(1, 100),
});

export const updateSkillSchema = baseSkillSchema.extend({
    id: idSchema,
});