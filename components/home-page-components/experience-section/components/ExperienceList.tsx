'use client';

import { useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { Locale, useTranslations } from 'next-intl';

import ResponsibilitiesAccordion from './ResponsibilitiesAccordion';
import { getResponsibilitiesArray } from '@/lib/utils/getResponsibilitiesArray';
import { formatDateRange } from '@/lib/utils/formatDateRange';
import { cn } from '@/lib/utils/utils';
import { fadeUp, stagger } from '@/lib/motion/variants';

import { type Experience } from '@/types/actionsTypes/actionsTypes';

const accordionEase = [0.22, 1, 0.36, 1] as const;

export default function ExperienceList({ experiences, locale }: { experiences: Experience[]; locale: Locale }) {
	const t = useTranslations('homePage.experienceSection');
	const tr = useTranslations('references');
	const listRef = useRef<HTMLDivElement>(null);
	const inView = useInView(listRef, { once: true, amount: 0.35 });
	const reduced = useReducedMotion();
	const listVariants = stagger(0.12, 0.06);
	const itemVariants = fadeUp(!!reduced);

	return (
		<AnimatePresence>
			<motion.div
				ref={listRef}
				className='relative flex flex-col'
				initial={reduced ? false : 'hidden'}
				animate={inView ? 'visible' : 'hidden'}
				variants={listVariants}
			>
				{experiences.length === 0 ? (
					<p className='text-ink-3'>{t('emptyState')}</p>
				) : (
					experiences.map((exp, index) => {
						const respItems = getResponsibilitiesArray(exp, t);
						const isLast = index === experiences.length - 1;

						return (
							<motion.article
								key={exp.id}
								variants={itemVariants}
								className='relative grid grid-cols-[auto_1fr] gap-x-5 max-xl:gap-x-4 xl:gap-x-8'
							>
								<div className='relative flex w-4 flex-col items-center'>
									<span
										className={cn(
											'relative z-[1] mt-1.5 size-2.5 shrink-0 rounded-full border border-brand bg-surface-0',
											'ring-4 ring-brand/15',
										)}
										aria-hidden
									/>
									{!isLast ? (
										<span
											className='absolute top-4 bottom-0 w-px bg-gradient-to-b from-brand-line to-line'
											aria-hidden
										/>
									) : null}
								</div>

								<div
									className={cn('min-w-0 pb-10 max-xl:pb-8', isLast && 'pb-2')}
								>
									<div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'>
										<h3 className='font-display text-lg font-medium tracking-tight text-ink-0 xl:text-xl'>
											{exp.employer_url ? (
												<a
													href={
														exp.employer_url.includes('://')
															? exp.employer_url
															: `https://${exp.employer_url}`
													}
													target='_blank'
													rel='noopener noreferrer'
													className='transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
												>
													{exp.employer}
												</a>
											) : (
												<span>{exp.employer}</span>
											)}
										</h3>
										<p className='font-mono text-xs tracking-wide text-ink-3'>
											{formatDateRange(locale, exp, t('present'))}
										</p>
									</div>

									<p className='mt-1 text-sm text-ink-2 xl:text-base'>{exp.position}</p>

									{respItems.length > 0 ? (
										<div className='mt-3'>
											<ResponsibilitiesAccordion
												title={t('keyResponsibilities')}
												items={respItems}
												itemKeyPrefix={String(exp.id)}
												accordionEase={accordionEase}
											/>
										</div>
									) : null}

									{exp.referencesFile ? (
										<p className='mt-3 font-mono text-[0.6875rem] tracking-wide text-brand'>
											{tr('referencesText')}
										</p>
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
