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
			className="flex min-h-dvh w-full flex-col justify-center gap-8 bg-[#0c0c0c] px-6 py-10 max-[480px]:mx-auto max-[480px]:max-w-[100vw] max-[480px]:gap-6 max-[480px]:px-4 max-[480px]:py-8 sm:px-10 md:gap-8 md:px-12 md:py-12"
		>
			<header className="flex flex-col gap-2 max-[480px]:gap-1.5">
				<p className="text-[13px] font-semibold tracking-wide text-slate-500 max-[480px]:text-xs">
					{t('aboutSection.sectionIndex')}
				</p>
				<h2 className="text-[2rem] font-light leading-tight text-slate-50 max-[480px]:text-[1.625rem] max-[480px]:leading-snug sm:text-[2.375rem]">
					{t('aboutSection.title')}
				</h2>
				<div className="h-[3px] w-12 rounded-full bg-[#facc15] max-[480px]:w-10" aria-hidden />
			</header>

			<MetricsSection metrics={metrics} />

			<p className="max-w-none text-base font-normal leading-[1.6] text-[#e2e8f0] max-[480px]:text-[15px] max-[480px]:leading-relaxed">
				{description}
			</p>

			<div
				className="flex flex-wrap gap-3 max-[480px]:flex-col max-[480px]:gap-2.5 [&>a]:max-[480px]:w-full [&>a]:max-[480px]:justify-center"
				data-name="aboutCta"
			>
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
