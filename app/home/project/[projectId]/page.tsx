import { headers } from 'next/headers';

import { getProject } from '@/actions/projects';
import { generatePageMetadata } from '@/lib/generatePageMetadata';
import { deviceClassFromUserAgent } from '@/lib/metrics/deviceClass';
import { observeProjectView } from '@/lib/metrics/productMetrics';
import ProjectDetailsView from '@/components/project-details-page/ProjectDetailsView';

import { type DetailsProjectProps } from '@/types/detailsPageTypes';

export async function generateMetadata({ params }: DetailsProjectProps) {
    const projectId = (await params).projectId;

    return generatePageMetadata('project', projectId);
}

export default async function ProjectDetailsPage({ params }: DetailsProjectProps) {
    const { projectId } = await params;
    const h = await headers();
    const isPrefetch =
        h.get('next-router-prefetch') === '1' ||
        h.get('purpose') === 'prefetch';

    if (!isPrefetch) {
        observeProjectView(projectId, deviceClassFromUserAgent(h.get('user-agent')));
    }

    const selectedProject = await getProject(projectId);

    if ('error' in selectedProject) {
        console.error(selectedProject.error);
        return <div>Failed to display details.</div>;
    }

    return <ProjectDetailsView selectedProject={selectedProject.project} variant="page" />;
}
