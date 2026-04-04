import { getLocale, getTranslations } from 'next-intl/server';
import { parseExperienceDate } from '@/lib/utils/formatDateRange';
import ExperienceList from './components/ExperienceList';

import { type GetExperiencesType } from '@/types/actionsTypes/actionsTypes';

export default async function ExperienceSection({ experiences }: { experiences: GetExperiencesType | undefined }) {
	const t = await getTranslations('homePage.experienceSection');
	const locale = await getLocale();

	if (!experiences || 'error' in experiences) {
		return (
			<section id="experienceSection" className="w-full bg-transparent px-6 py-16 sm:px-10 md:px-12 md:py-20">
				<p className="text-slate-400">{t('fetchError')}</p>
			</section>
		);
	}

	const sorted = [...experiences.experiences].sort((a, b) => {
		const dateA = parseExperienceDate(a.employed_since)?.getTime() ?? 0;
		const dateB = parseExperienceDate(b.employed_since)?.getTime() ?? 0;
		return dateB - dateA;
	});

	return (
		<section
			id="experienceSection"
			className="flex w-full flex-col gap-10 bg-transparent px-6 py-16 sm:px-10 md:gap-10 md:px-12 md:py-20"
		>
			<header className="flex flex-col gap-2">
				<p className="text-[13px] font-semibold tracking-wide text-slate-500">{t('sectionIndex')}</p>
				<h2 className="text-[2rem] font-light leading-tight text-slate-50 sm:text-[2.375rem]">{t('title')}</h2>
				<div className="h-[3px] w-12 rounded-full bg-[#facc15]" aria-hidden />
			</header>

			<p className="max-w-3xl text-base font-normal leading-normal text-slate-400">{t('subtitle')}</p>

			<ExperienceList experiences={sorted} locale={locale} />
		</section>
	);
}
