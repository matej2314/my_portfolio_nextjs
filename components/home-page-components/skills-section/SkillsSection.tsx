import { getMessages, getTranslations } from 'next-intl/server';

import { type GetSkillsType } from '@/types/actionsTypes/actionsTypes';
import { groupSkillsIntoColumns, skillCategorySlug } from '@/lib/utils/utils';

import SkillsList from './components/SkillsList';
import ToolsGrid from './components/ToolsGrid';
import SectionShell from '@/components/home-page-components/shared/SectionShell';
import SectionHeading from '@/components/home-page-components/shared/SectionHeading';
import SectionBody from '@/components/home-page-components/shared/SectionBody';
import { type SkillsGridColumn } from '@/types/skillsGrid';

export default async function SkillsSection({ skills }: { skills: GetSkillsType | undefined }) {
	const t = await getTranslations('homePage');
	const messages = await getMessages();
	const categoryTitles = (messages.homePage?.skillsSection?.categoryTitles as Record<string, string> | undefined) ?? {};

	if (!skills || 'error' in skills) {
		return (
			<SectionShell id='skillsSection'>
				<p className='text-ink-2 xl:col-span-12'>{t('skillsSection.fetchError')}</p>
			</SectionShell>
		);
	}

	const toolSkills = skills.skills.filter(skill => skill.isTool === true);

	const columns: SkillsGridColumn[] = groupSkillsIntoColumns(toolSkills).map(({ category, skills: list }) => ({
		categoryKey: category,
		title: categoryTitles[skillCategorySlug(category)] ?? category,
		skills: list,
	}));

	const competenciesList = skills.skills.filter(skill => skill.isTool === false);

	return (
		<SectionShell id='skillsSection'>
			<SectionHeading
				index={t('skillsSection.sectionIndex')}
				title={t('skillsSection.title')}
				lead={t('skillsSection.subtitle')}
			/>
			<SectionBody>
				<SkillsList competenciesList={competenciesList} />
				{columns.length === 0 ? (
					<p className='text-ink-3'>{t('skillsSection.emptyState')}</p>
				) : (
					<ToolsGrid columns={columns} />
				)}
			</SectionBody>
		</SectionShell>
	);
}
