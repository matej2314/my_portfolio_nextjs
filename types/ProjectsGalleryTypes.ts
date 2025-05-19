import { type Project } from "./actionsTypes/projectsTypes";

type ImageData = {
    id: string;
    images: string[];
};

export type ProjectsGalleryProps = {
    projects: Project[];
    images: ImageData[];
};