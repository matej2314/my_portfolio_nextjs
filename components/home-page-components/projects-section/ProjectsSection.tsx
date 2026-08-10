import { getTranslations } from 'next-intl/server';

import ProjectsGrid from './components/ProjectsGrid';
import SectionShell from '@/components/home-page-components/shared/SectionShell';
import SectionHeading from '@/components/home-page-components/shared/SectionHeading';
import SectionBody from '@/components/home-page-components/shared/SectionBody';
import { GetProjectsType } from '@/types/actionsTypes/actionsTypes';
import { getProjectImages } from '@/actions/projects';

export default async function ProjectsSection({ projects }: { projects: GetProjectsType | undefined }) {
	const t = await getTranslations('homePage.projectsSection');

	if (!projects || 'error' in projects) {
		return (
			<SectionShell id='projectsSection'>
				<p className='text-ink-2 xl:col-span-12'>{t('fetchError')}</p>
			</SectionShell>
		);
	}

	const images = await getProjectImages(projects.projects);

	return (
		<SectionShell id='projectsSection'>
			<SectionHeading index={t('sectionIndex')} title={t('title')} lead={t('description')} />
			<SectionBody className='min-w-0 overflow-x-hidden'>
				<ProjectsGrid projects={projects.projects} images={images} />
			</SectionBody>
		</SectionShell>
	);
}
