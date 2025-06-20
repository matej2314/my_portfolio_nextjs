import { type Project } from './actionsTypes/actionsTypes';

export type DetailsPageProps = {
	params: { id: string };
};

export interface DetailsHeaderProps {
	selectedProject: Project;
}
