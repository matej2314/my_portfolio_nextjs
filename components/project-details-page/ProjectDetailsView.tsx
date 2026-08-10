import { getUserLocale } from '@/lib/locale';
import { getProjectImages, getProjects } from '@/actions/projects';

import ContactModal from '@/components/ContactModal';
import DisplayConclusion from '@/components/project-details-page/components/DisplayConclusion';
import DisplayGoalDescription from '@/components/project-details-page/components/DisplayGoalDescription';
import GallerySection from '@/components/project-details-page/components/GallerySection';
import ProjectDetailsExpandedHero from '@/components/project-details-page/ProjectDetailsExpandedHero';
import ProjectDetailsMetaRow from '@/components/project-details-page/ProjectDetailsMetaRow';
import ProjectDetailsFooterNav from '@/components/project-details-page/ProjectDetailsFooterNav';

import { type Project } from '@/types/actionsTypes/actionsTypes';

type Props = {
	selectedProject: Project;
	variant?: 'page' | 'intercept';
};

function techChipsFromProject(project: Project) {
	return (project.technologies ?? '')
		.split(',')
		.map(s => s.trim())
		.filter(Boolean);
}

function leadFromProject(project: Project, locale: string) {
	return locale === 'en'
		? project.project_description ?? ''
		: project.description_pl || project.project_description || '';
}

function stackSummaryFromProject(project: Project) {
	const parts = techChipsFromProject(project);
	if (parts.length > 0) return parts.join(' · ');
	return project.project_category ?? '';
}

export default async function ProjectDetailsView({ selectedProject, variant = 'page' }: Props) {
	const locale = await getUserLocale();
	const isIntercept = variant === 'intercept';
	const navMode = isIntercept ? 'intercept' : 'page';

	const [imgEntry] = await getProjectImages([selectedProject]);
	const coverSrc = imgEntry?.images?.[0];
	const chips = techChipsFromProject(selectedProject);

	const all = await getProjects();
	const list = !('error' in all) ? all.projects : [];
	const idx = list.findIndex(p => String(p.id) === String(selectedProject.id));
	const prev =
		idx > 0 ? { id: String(list[idx - 1]!.id), name: list[idx - 1]!.project_name } : null;
	const next =
		idx >= 0 && idx < list.length - 1
			? { id: String(list[idx + 1]!.id), name: list[idx + 1]!.project_name }
			: null;

	return (
		<div
			className='relative flex min-h-0 flex-1 flex-col bg-surface-0 text-ink-1'
			data-project-enter-end
			data-project-id={selectedProject.id}
		>
			<ProjectDetailsExpandedHero
				project={selectedProject}
				coverSrc={coverSrc}
				techChips={chips}
				leadText={leadFromProject(selectedProject, locale)}
				navMode={navMode}
			/>
			<div className='mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-10 px-5 py-12 md:gap-12 xl:px-12 xl:pb-20 xl:pt-16'>
				<DisplayGoalDescription selectedProject={selectedProject} locale={locale} variant='pen' />
				<GallerySection
					projectId={selectedProject.id}
					projectName={selectedProject.project_name}
					variant='pen'
				/>
				<DisplayConclusion selectedProject={selectedProject} locale={locale} variant='pen' />
				<ProjectDetailsMetaRow
					stackSummary={stackSummaryFromProject(selectedProject)}
					demoUrl={selectedProject.project_URL}
					repoUrl={selectedProject.repo ?? null}
				/>
				{!isIntercept ? <ProjectDetailsFooterNav prev={prev} next={next} /> : null}
			</div>
			<ContactModal />
		</div>
	);
}
