import { getTranslations, getLocale } from 'next-intl/server';

import DescriptionContent from './components/DescriptionContent';
import MetricsSection from './components/MetricsSection';
import SectionShell from '@/components/home-page-components/shared/SectionShell';
import SectionHeading from '@/components/home-page-components/shared/SectionHeading';
import SectionBody from '@/components/home-page-components/shared/SectionBody';
import { metricsArray } from '@/lib/arrays/metricsArray';

import { type AboutTextType } from '@/types/actionsTypes/actionsTypes';
import { getCvHref } from '@/lib/utils/getCvHref';

export default async function AboutSection({ aboutText }: { aboutText: AboutTextType | null | undefined }) {
	const t = await getTranslations('homePage');
	const locale = await getLocale();
	const { cvHref, cvFileName } = getCvHref(locale);
	const metrics = metricsArray.map(m => ({
		stat: m.stat,
		label: t(`aboutSection.metricLabels.${m.id}`),
	}));

	const description = aboutText ? t('aboutSection.description') : 'Failed to load text.';

	return (
		<SectionShell id='aboutSection'>
			<SectionHeading index={t('aboutSection.sectionIndex')} title={t('aboutSection.title')} />
			<SectionBody>
				<MetricsSection metrics={metrics} />
				<DescriptionContent description={description} cvHref={cvHref} cvFileName={cvFileName} />
			</SectionBody>
		</SectionShell>
	);
}
