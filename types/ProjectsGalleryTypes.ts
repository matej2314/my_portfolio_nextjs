import { type Project } from './actionsTypes/actionsTypes';

export type ImageData = {
	id: string;
	images: string[];
};

export type ProjectsGalleryProps = {
	projects: Project[];
	images: ImageData[];
};


export type ProjectSlide = {
	project: Project;
	coverImage: string;
	excerpt: string;
	techLabel: string;
};