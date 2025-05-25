import { type Project } from "./actionsTypes/actionsTypes";

export type DetailsPageProps = {
    params: Promise<{ id: string }>
}

export interface DetailsHeaderProps {
    selectedProject: Project;

}