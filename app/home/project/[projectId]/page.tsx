import { getProject } from '@/actions/projects';
import { generatePageMetadata } from '@/lib/generatePageMetadata';
import ProjectDetailsView from '@/components/project-details-page/ProjectDetailsView';

import { type DetailsProjectProps } from '@/types/detailsPageTypes';

export async function generateMetadata({ params }: DetailsProjectProps) {
    const projectId = (await params).projectId;

    return generatePageMetadata('project', projectId);
}

export default async function ProjectDetailsPage({ params }: DetailsProjectProps) {
    const { projectId } = await params;

    const selectedProject = await getProject(projectId);

    if ('error' in selectedProject) {
        console.error(selectedProject.error);
        return <div>Failed to display details.</div>;
    }

    return <ProjectDetailsView selectedProject={selectedProject.project} variant="page" />;
}
