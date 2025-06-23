import { type Project } from './actionsTypes/actionsTypes';

export interface DetailsHeaderProps {
	selectedProject: Project;
}

export interface DetailsBlogPostProps {
	params: Promise<{ postId: string }>;
}

export interface DetailsProjectProps {
	params: Promise<{ projectId: string }>;
}
