import { getTranslations } from 'next-intl/server';

import ProjectsGrid from './components/ProjectsGrid';
import { GetProjectsType } from '@/types/actionsTypes/actionsTypes';
import { getProjectImages } from '@/actions/projects';

export default async function ProjectsSection({ projects }: { projects: GetProjectsType | undefined }) {
    const t = await getTranslations('homePage.projectsSection');

    if (!projects || 'error' in projects) {
        return (
            <section
                id="projectsSection"
                className="flex w-full flex-col text-slate-200 max-[480px]:mx-auto max-[480px]:max-w-[100vw]"
            >
                <p className="text-slate-400">{t('fetchError')}</p>
            </section>
        );
    }

    const images = await getProjectImages(projects.projects);

    return (
        <section
            id="projectsSection"
            className="flex w-full min-w-0 flex-col justify-center gap-10 overflow-x-hidden bg-[#0c0c0c] px-6 py-16 max-[480px]:mx-auto max-[480px]:max-w-[100vw] sm:px-10 md:px-12 md:py-20"
        >
            <ProjectsGrid projects={projects.projects} images={images} />
        </section>
    );
}
