'use client';

import Link from 'next/link';
import { motion, easeOut, useInView } from 'motion/react';
import { useRef } from 'react';

import NavLink from '@/components/links/NavLink';
import { useTranslations } from 'next-intl';

interface DescriptionContentProps {
	description: string;
	cvHref: string;
	cvFileName: string;
}

const VIEWPORT = { once: true, amount: 0.25 } as const;

export default function DescriptionContent({ description, cvHref, cvFileName }: DescriptionContentProps) {
	const t = useTranslations('homePage');
	const rootRef = useRef<HTMLDivElement>(null);
	const inView = useInView(rootRef, VIEWPORT);

	return (
		<div ref={rootRef} className="flex flex-col gap-6">
			<motion.p
				className="max-w-none font-normal text-[#e2e8f0] max-xl:text-[15px] max-xl:leading-relaxed xl:text-base xl:leading-[1.6]"
				initial={{ opacity: 0, y: 14 }}
				animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
				transition={{ duration: 0.45, ease: easeOut }}
			>
				{t('aboutSection.description')}
			</motion.p>

			<div
				className="flex max-xl:flex-col max-xl:gap-2.5 xl:flex-wrap xl:gap-3"
				data-name="aboutCta"
			>
				<motion.div
					className="w-full xl:w-fit"
					initial={{ opacity: 0, y: 12 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
					transition={{ duration: 0.42, ease: easeOut, delay: 0.12 }}
				>
					<Link
						href={cvHref}
						download={cvFileName}
						className="inline-flex w-full items-center justify-center rounded-lg bg-yellow-300 px-6 py-3 text-[15px] font-semibold text-[#0c0c0c] outline-none ring-0 transition-opacity hover:opacity-90 focus:opacity-90 focus:outline-none focus-visible:opacity-90 focus-visible:outline-none focus-visible:ring-0 max-xl:justify-center xl:w-auto"
					>
						{t('aboutSection.downloadCv')}
					</Link>
				</motion.div>
				<motion.div
					className="w-full xl:w-fit"
					initial={{ opacity: 0, y: 12 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
					transition={{ duration: 0.42, ease: easeOut, delay: 0.24 }}
				>
					<NavLink
						variant="home"
						pathName="#projectsSection"
						title={t('aboutSection.viewProjects')}
						aria-label={t('aboutSection.viewProjects')}
						linkClass="inline-flex w-full items-center justify-center rounded-lg border border-yellow-300 bg-transparent px-6 py-3 text-[15px] font-normal text-[#facc15] outline-none ring-0 transition-colors hover:bg-[#facc15]/10 focus:bg-[#facc15]/10 focus:outline-none focus-visible:bg-[#facc15]/10 focus-visible:outline-none focus-visible:ring-0 max-xl:justify-center xl:w-auto"
					>
						{t('aboutSection.viewProjects')}
					</NavLink>
				</motion.div>
			</div>
		</div>
	);
}
