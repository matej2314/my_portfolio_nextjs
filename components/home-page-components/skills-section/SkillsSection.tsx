import { getMessages, getTranslations } from 'next-intl/server';

import { type GetSkillsType } from '@/types/actionsTypes/actionsTypes';
import { groupSkillsIntoColumns, skillCategorySlug } from '@/lib/utils/utils';

import SkillsGrid from './components/SkillsGrid';
import { type SkillsGridColumn } from '@/types/skillsGrid';

export default async function SkillsSection({ skills }: { skills: GetSkillsType | undefined }) {
	const t = await getTranslations('homePage');
	const messages = await getMessages();
	const categoryTitles = (messages.homePage?.skillsSection?.categoryTitles as Record<string, string> | undefined) ?? {};

	if (!skills || 'error' in skills) {
		return (
			<section
				id="skillsSection"
				className="flex min-h-dvh w-full flex-col justify-center bg-[#0c0c0c] px-6 py-10 max-[480px]:mx-auto max-[480px]:max-w-[100vw] sm:px-10 md:px-12 md:py-12"
			>
				<p className="text-slate-400">{t('skillsSection.fetchError')}</p>
			</section>
		);
	}

	const columns: SkillsGridColumn[] = groupSkillsIntoColumns(skills.skills).map(({ category, skills: list }) => ({
		categoryKey: category,
		title: categoryTitles[skillCategorySlug(category)] ?? category,
		skills: list,
	}));

	return (
		<section
			id="skillsSection"
			className="flex min-h-dvh w-full flex-col justify-center gap-8 bg-[#0c0c0c] px-6 py-10 max-[480px]:mx-auto max-[480px]:max-w-[100vw] sm:px-10 md:gap-8 md:px-12 md:py-12"
		>
			<header className='flex flex-col gap-2'>
				<p className='text-[13px] font-semibold tracking-wide text-slate-500'>{t('skillsSection.sectionIndex')}</p>
				<h2 className='text-[2rem] font-light leading-tight text-slate-50 sm:text-[2.375rem]'>{t('skillsSection.title')}</h2>
				<div className='h-[3px] w-12 rounded-full bg-[#facc15]' aria-hidden />
			</header>

			<p className='max-w-3xl text-base font-normal leading-normal text-slate-400'>{t('skillsSection.subtitle')}</p>

			{columns.length === 0 ? <p className='text-slate-500'>{t('skillsSection.emptyState')}</p> : <SkillsGrid columns={columns} />}
		</section>
	);
}
