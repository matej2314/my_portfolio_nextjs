import { type Experience } from "../actionsTypes/actionsTypes";

export interface ExperienceFormProps {
    experienceData?: Experience;
    mode?: 'edit' | 'create';
}