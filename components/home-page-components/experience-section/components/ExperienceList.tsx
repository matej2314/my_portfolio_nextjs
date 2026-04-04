'use client';

import { motion, easeInOut, AnimatePresence, useInView } from 'motion/react';
import { useRef } from 'react';

import { formatDateRange } from '@/lib/utils/formatDateRange';
import { Locale, useTranslations } from 'next-intl';

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

export default function ExperienceList({ experiences, locale }: { experiences: Experience[]; locale: Locale }) {
	const t = useTranslations('homePage.experienceSection');
	const listRef = useRef<HTMLDivElement>(null);
	const inView = useInView(listRef, { once: true, amount: 0.6 });

	return (
		<AnimatePresence>
			<motion.div
				ref={listRef}
				className='flex flex-col gap-6'
				initial='hidden'
				animate={inView ? 'visible' : 'hidden'}
				variants={listVariants}
			>
				{experiences.length === 0 ? (
					<p className='text-slate-500'>{t('emptyState')}</p>
				) : (
					experiences.map(exp => (
						<motion.article key={exp.id} variants={itemVariants} className='flex gap-5 rounded-xl border border-slate-700 bg-[#0c0c0c] px-7 py-6'>
							<div className='h-[4.5rem] w-1 shrink-0 rounded-sm bg-[#facc15]' aria-hidden />
							<div className='flex min-w-0 flex-1 flex-col gap-2.5'>
								<h3 className='text-lg font-semibold text-slate-50'>{exp.employer}</h3>
								<p className='text-base font-normal text-slate-400'>{exp.position}</p>
								<p className='text-sm leading-[1.5] text-slate-500'>{formatDateRange(locale, exp, t('present'))}</p>
								{exp.employer_url ? (
									<a href={exp.employer_url.includes('://') ? exp.employer_url : `https://${exp.employer_url}`} target='_blank' rel='noopener noreferrer' className='w-fit text-sm font-normal text-[#facc15] hover:underline'>
										{t('visitWebsite')}
									</a>
								) : null}
							</div>
						</motion.article>
					))
				)}
			</motion.div>
		</AnimatePresence>
	);
}
