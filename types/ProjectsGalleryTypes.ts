import { type Project } from './actionsTypes/actionsTypes';

export type ImageData = {
	id: string;
	images: string[];
};

export type ProjectsGalleryProps = {
	projects: Project[];
	images: ImageData[];
};
