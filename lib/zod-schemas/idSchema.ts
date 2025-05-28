import { validatedString } from "./basicValidation";

export const idSchema = validatedString().uuid();