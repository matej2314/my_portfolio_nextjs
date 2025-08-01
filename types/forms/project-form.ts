import { Project } from '../actionsTypes/actionsTypes';

export interface ProjectFormProps {
	projectData?: Project;
	mode?: 'edit' | 'create';
}
