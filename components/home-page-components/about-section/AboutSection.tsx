import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';

import NavLink from '@/components/links/NavLink';
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
			className="flex min-h-dvh w-full flex-col justify-center gap-8 bg-[#0c0c0c] px-6 py-10 sm:px-10 md:gap-8 md:px-12 md:py-12"
		>
			<header className="flex flex-col gap-2">
				<p className="text-[13px] font-semibold tracking-wide text-slate-500">{t('aboutSection.sectionIndex')}</p>
				<h2 className="text-[2rem] font-light leading-tight text-slate-50 sm:text-[2.375rem]">{t('aboutSection.title')}</h2>
				<div className="h-[3px] w-12 rounded-full bg-[#facc15]" aria-hidden />
			</header>

			<MetricsSection metrics={metrics} />

			<p className="max-w-none text-base font-normal leading-[1.6] text-[#e2e8f0]">{description}</p>

			<div className="flex flex-wrap gap-3" data-name="aboutCta">
				<Link
					href={cvHref}
					download={cvFileName}
					className="inline-flex items-center justify-center rounded-lg bg-yellow-300 px-6 py-3 text-[15px] font-semibold text-[#0c0c0c] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#facc15]"
				>
					{t('aboutSection.downloadCv')}
				</Link>
				<NavLink
					variant="home"
					pathName="#projectsSection"
					title={t('aboutSection.viewProjects')}
					aria-label={t('aboutSection.viewProjects')}
					linkClass="inline-flex items-center justify-center rounded-lg border border-yellow-300 bg-transparent px-6 py-3 text-[15px] font-normal text-[#facc15] transition-colors hover:bg-[#facc15]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#facc15]"
				>
					{t('aboutSection.viewProjects')}
				</NavLink>
			</div>
		</section>
	);
}
