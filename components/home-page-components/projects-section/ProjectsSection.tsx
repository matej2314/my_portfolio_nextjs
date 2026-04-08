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
                tabIndex={-1}
                className="flex w-full flex-col text-slate-200 max-xl:mx-auto max-xl:max-w-[100vw]"
            >
                <p className="text-slate-400">{t('fetchError')}</p>
            </section>
        );
    }

    const images = await getProjectImages(projects.projects);

    return (
        <section
            id="projectsSection"
            tabIndex={-1}
            className="flex w-full min-w-0 flex-col justify-center overflow-x-hidden bg-[#0c0c0c] max-xl:mx-auto max-xl:max-w-[100vw] max-xl:gap-6 max-xl:px-4 max-xl:py-8 xl:gap-10 xl:px-12 xl:py-20"
        >
            <ProjectsGrid projects={projects.projects} images={images} />
        </section>
    );
}
