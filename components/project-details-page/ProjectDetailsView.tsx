import { getUserLocale } from '@/lib/locale';
import { getProjectImages } from '@/actions/projects';

import ContactModal from '@/components/ContactModal';
import DisplayConclusion from '@/components/project-details-page/components/DisplayConclusion';
import DisplayGoalDescription from '@/components/project-details-page/components/DisplayGoalDescription';
import GallerySection from '@/components/project-details-page/components/GallerySection';
import ProjectDetailsExpandedHero from '@/components/project-details-page/ProjectDetailsExpandedHero';
import ProjectDetailsMetaRow from '@/components/project-details-page/ProjectDetailsMetaRow';

import { type Project } from '@/types/actionsTypes/actionsTypes';

type Props = {
    selectedProject: Project;
    variant?: 'page' | 'intercept';
};

function techLineFromProject(project: Project) {
    return (
        project.technologies?.split(',')[0]?.trim() || project.project_category || ''
    );
}

function leadFromProject(project: Project, locale: string) {
    return locale === 'en'
        ? project.project_description ?? ''
        : project.description_pl || project.project_description || '';
}

function stackSummaryFromProject(project: Project) {
    const parts = (project.technologies ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    if (parts.length > 0) return parts.join(' · ');
    return project.project_category ?? '';
}

export default async function ProjectDetailsView({ selectedProject, variant = 'page' }: Props) {
    const locale = await getUserLocale();
    const isIntercept = variant === 'intercept';

    const [imgEntry] = await getProjectImages([selectedProject]);
    const coverSrc = imgEntry?.images?.[0];

    const navMode = isIntercept ? 'intercept' : 'page';

    return (
        <div className="relative flex min-h-0 flex-1 flex-col bg-[#0c0c0c] text-slate-200">
            <ProjectDetailsExpandedHero
                project={selectedProject}
                coverSrc={coverSrc}
                techLine={techLineFromProject(selectedProject)}
                leadText={leadFromProject(selectedProject, locale)}
                navMode={navMode}
            />
            <div className="flex w-full min-w-0 flex-col gap-8 px-6 py-[2rem] md:gap-10 md:px-12 md:pb-5">
                <DisplayGoalDescription
                    selectedProject={selectedProject}
                    locale={locale}
                    variant="pen"
                />
                <GallerySection projectId={selectedProject.id} variant="pen" />
                <DisplayConclusion
                    selectedProject={selectedProject}
                    locale={locale}
                    variant="pen"
                />
                <ProjectDetailsMetaRow
                    stackSummary={stackSummaryFromProject(selectedProject)}
                    demoUrl={selectedProject.project_URL}
                    repoUrl={selectedProject.repo ?? null}
                />
            </div>
            <ContactModal />
        </div>
    );
}
