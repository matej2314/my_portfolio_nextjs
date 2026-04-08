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
				tabIndex={-1}
				className="flex min-h-dvh w-full flex-col justify-center bg-[#0c0c0c] max-xl:mx-auto max-xl:max-w-[100vw] max-xl:px-4 max-xl:py-8 xl:px-12 xl:py-12"
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
			tabIndex={-1}
			className="flex min-h-dvh w-full flex-col justify-center gap-8 bg-[#0c0c0c] max-xl:mx-auto max-xl:max-w-[100vw] max-xl:px-4 max-xl:py-8 xl:px-12 xl:py-12"
		>
			<header className='flex flex-col gap-2 max-xl:gap-1.5 xl:gap-2'>
				<p className='font-semibold tracking-wide text-slate-500 max-xl:text-xs xl:text-[13px]'>{t('skillsSection.sectionIndex')}</p>
				<h2 className='font-light leading-tight text-slate-50 max-xl:text-[1.625rem] max-xl:leading-snug xl:text-[2.375rem]'>{t('skillsSection.title')}</h2>
				<div className='h-[3px] rounded-full bg-[#facc15] max-xl:w-10 xl:w-12' aria-hidden />
			</header>

			<p className='max-w-3xl font-normal text-slate-400 max-xl:text-[15px] max-xl:leading-relaxed xl:text-base xl:leading-normal'>{t('skillsSection.subtitle')}</p>

			{columns.length === 0 ? <p className='text-slate-500'>{t('skillsSection.emptyState')}</p> : <SkillsGrid columns={columns} />}
		</section>
	);
}
