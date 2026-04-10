import { getLocale, getTranslations } from 'next-intl/server';
import ExperienceList from './components/ExperienceList';

import { sortExperienceByDate } from '@/lib/utils/sortExperienceByDate';

import { type GetExperiencesType } from '@/types/actionsTypes/actionsTypes';

export default async function ExperienceSection({ experiences }: { experiences: GetExperiencesType | undefined }) {
	const t = await getTranslations('homePage.experienceSection');
	const locale = await getLocale();

	if (!experiences || 'error' in experiences) {
		return (
			<section id='experienceSection' tabIndex={-1} className='w-full bg-transparent max-xl:mx-auto max-xl:max-w-[100vw] max-xl:px-4 max-xl:py-8 xl:px-12 xl:py-20'>
				<p className='text-slate-400'>{t('fetchError')}</p>
			</section>
		);
	}

	const sorted = sortExperienceByDate(experiences.experiences);

	return (
		<section id='experienceSection' tabIndex={-1} className='flex w-full flex-col bg-transparent max-xl:mx-auto max-xl:max-w-[100vw] max-xl:gap-6 max-xl:px-4 max-xl:py-8 xl:gap-10 xl:px-12 xl:py-20'>
			<header className='flex flex-col gap-2 max-xl:gap-1.5 xl:gap-2'>
				<p className='font-semibold tracking-wide text-slate-500 max-xl:text-xs xl:text-[13px]'>{t('sectionIndex')}</p>
				<h2 className='font-light leading-tight text-slate-50 max-xl:text-[1.625rem] max-xl:leading-snug xl:text-[2.375rem]'>{t('title')}</h2>
				<div className='h-[3px] rounded-full bg-[#facc15] max-xl:w-10 xl:w-12' aria-hidden />
			</header>

			<p className='max-w-3xl font-normal text-slate-400 max-xl:text-[15px] max-xl:leading-relaxed xl:text-base xl:leading-normal'>{t('subtitle')}</p>

			<ExperienceList experiences={sorted} locale={locale} />
		</section>
	);
}
