import { Skill } from '../actionsTypes/actionsTypes';

export interface SkillFormProps {
	skillData?: Skill;
	mode?: 'edit' | 'create';
}
