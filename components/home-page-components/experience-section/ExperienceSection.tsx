import { getLocale, getTranslations } from 'next-intl/server';

import ExperienceList from './components/ExperienceList';
import SectionShell from '@/components/home-page-components/shared/SectionShell';
import SectionHeading from '@/components/home-page-components/shared/SectionHeading';
import SectionBody from '@/components/home-page-components/shared/SectionBody';

import { sortExperienceByDate } from '@/lib/utils/sortExperienceByDate';

import { type GetExperiencesType } from '@/types/actionsTypes/actionsTypes';

export default async function ExperienceSection({ experiences }: { experiences: GetExperiencesType | undefined }) {
	const t = await getTranslations('homePage.experienceSection');
	const locale = await getLocale();

	if (!experiences || 'error' in experiences) {
		return (
			<SectionShell id='experienceSection'>
				<p className='text-ink-2 xl:col-span-12'>{t('fetchError')}</p>
			</SectionShell>
		);
	}

	const sorted = sortExperienceByDate(experiences.experiences);

	return (
		<SectionShell id='experienceSection'>
			<SectionHeading index={t('sectionIndex')} title={t('title')} lead={t('subtitle')} />
			<SectionBody>
				<ExperienceList experiences={sorted} locale={locale} />
			</SectionBody>
		</SectionShell>
	);
}
