import { Project } from '../actionsTypes/actionsTypes';

export interface ProjectFormProps {
	projectData?: Project;
	mode?: 'edit' | 'create';
}

export type SelectedDetailsState = {
	selectedCategory: string;
	selectedDifficulty: string;
	selectedTab: string;
};
