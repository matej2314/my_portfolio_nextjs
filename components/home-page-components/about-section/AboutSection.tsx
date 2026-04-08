import { getTranslations, getLocale } from 'next-intl/server';

import DescriptionContent from './components/DescriptionContent';
import MetricsSection from './components/MetricsSection';
import { metricsArray } from '@/lib/arrays/metricsArray';

import { type AboutTextType } from '@/types/actionsTypes/actionsTypes';
import { getCvHref } from '@/lib/utils/getCvHref';

export default async function AboutSection({ aboutText }: { aboutText: AboutTextType | null | undefined }) {
	const t = await getTranslations('homePage');
	const locale = await getLocale();
	const { cvHref, cvFileName } = getCvHref(locale);
	const metrics = metricsArray.map((m) => ({
		stat: m.stat,
		label: t(`aboutSection.metricLabels.${m.id}`),
	}));

	const description = aboutText ? t('aboutSection.description') : 'Failed to load text.';

	return (
		<section
			id="aboutSection"
			tabIndex={-1}
			className="flex min-h-dvh w-full flex-col justify-center bg-[#0c0c0c] max-xl:mx-auto max-xl:max-w-[100vw] max-xl:gap-6 max-xl:px-4 max-xl:py-8 xl:gap-8 xl:px-12 xl:py-12"
		>
			<header className="flex flex-col gap-2 max-xl:gap-1.5 xl:gap-2">
				<p className="font-semibold tracking-wide text-slate-500 max-xl:text-xs xl:text-[13px]">
					{t('aboutSection.sectionIndex')}
				</p>
				<h2 className="font-light leading-tight text-slate-50 max-xl:text-[1.625rem] max-xl:leading-snug xl:text-[2.375rem]">
					{t('aboutSection.title')}
				</h2>
				<div className="h-[3px] rounded-full bg-[#facc15] max-xl:w-10 xl:w-12" aria-hidden />
			</header>

			<MetricsSection metrics={metrics} />
			<DescriptionContent description={description} cvHref={cvHref} cvFileName={cvFileName} />
		</section>
	);
}
