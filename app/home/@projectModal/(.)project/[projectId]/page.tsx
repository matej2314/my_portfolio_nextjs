import { getProject } from '@/actions/projects';
import ProjectDetailsView from '@/components/project-details-page/ProjectDetailsView';
import ProjectInterceptedShell from '@/components/project-details-page/ProjectInterceptedShell';

import { type DetailsProjectProps } from '@/types/detailsPageTypes';

export default async function InterceptedProjectPage({ params }: DetailsProjectProps) {
    const { projectId } = await params;
    const selectedProject = await getProject(projectId);

    if ('error' in selectedProject) {
        console.error(selectedProject.error);
        return null;
    }

    return (
        <ProjectInterceptedShell projectId={projectId}>
            <ProjectDetailsView selectedProject={selectedProject.project} variant="intercept" />
        </ProjectInterceptedShell>
    );
}
