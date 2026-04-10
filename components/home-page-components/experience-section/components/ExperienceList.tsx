'use client';

import { useRef } from 'react';
import { motion, easeInOut, AnimatePresence, useInView } from 'motion/react';
import { Locale, useTranslations } from 'next-intl';

import ResponsibilitiesAccordion from './ResponsibilitiesAccordion';
import { getResponsibilitiesArray } from '@/lib/utils/getResponsibilitiesArray';
import { formatDateRange } from '@/lib/utils/formatDateRange';

import { type Experience } from '@/types/actionsTypes/actionsTypes';

const listVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.12,
			delayChildren: 0.06,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 18 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.45, ease: easeInOut },
	},
};

const accordionEase = [0.22, 1, 0.36, 1] as const;

export default function ExperienceList({ experiences, locale }: { experiences: Experience[]; locale: Locale }) {
	const t = useTranslations('homePage.experienceSection');
	const listRef = useRef<HTMLDivElement>(null);
	const inView = useInView(listRef, { once: true, amount: 0.6 });

	return (
		<AnimatePresence>
			<motion.div ref={listRef} className='flex flex-col gap-6' initial='hidden' animate={inView ? 'visible' : 'hidden'} variants={listVariants}>
				{experiences.length === 0 ? (
					<p className='text-slate-500'>{t('emptyState')}</p>
				) : (
					experiences.map(exp => {
						const respItems = getResponsibilitiesArray(exp, t);
						return (
							<motion.article key={exp.id} variants={itemVariants} className='flex rounded-xl border border-slate-700 bg-[#0c0c0c] max-xl:gap-3 max-xl:px-4 max-xl:py-5 xl:gap-5 xl:px-7 xl:py-6'>
								<div className='w-1 shrink-0 self-stretch rounded-sm bg-[#facc15] max-xl:min-h-[3.5rem]' aria-hidden />
								<div className='flex min-w-0 flex-1 flex-col max-xl:gap-2 xl:gap-2.5'>
									<h3 className='font-semibold text-slate-50 max-xl:text-base xl:text-lg'>{exp.employer}</h3>
									<p className='font-normal text-slate-400 max-xl:text-sm xl:text-base'>{exp.position}</p>
									{respItems.length > 0 ? (
										<ResponsibilitiesAccordion title={t('keyResponsibilities')} items={respItems} itemKeyPrefix={String(exp.id)} accordionEase={accordionEase} />
									) : null}
									<p className='text-sm leading-[1.5] text-slate-500'>{formatDateRange(locale, exp, t('present'))}</p>
									{exp.employer_url ? (
										<a href={exp.employer_url.includes('://') ? exp.employer_url : `https://${exp.employer_url}`} target='_blank' rel='noopener noreferrer' className='w-fit text-sm font-normal text-[#facc15] hover:underline focus:underline focus-visible:underline focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0'>
											{t('visitWebsite')}
										</a>
									) : null}
								</div>
							</motion.article>
						);
					})
				)}
			</motion.div>
		</AnimatePresence>
	);
}
