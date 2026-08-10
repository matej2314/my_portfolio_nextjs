'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { type Skill } from '@/types/actionsTypes/actionsTypes';
import { fadeUp, stagger, EASE_EXPO } from '@/lib/motion/variants';

export default function SkillsList({ competenciesList }: { competenciesList: Skill[] }) {
	const listRef = useRef<HTMLDivElement>(null);
	const inView = useInView(listRef, { once: true, amount: 0.25 });
	const reduced = useReducedMotion();
	const t = useTranslations('homePage.skillsSection');
	const listVariants = stagger(0.08, 0.05);
	const itemVariants = fadeUp(!!reduced);

	return (
		<div ref={listRef} className='rounded-[var(--radius-shell)] border border-line bg-surface-1/50 p-1.5 shadow-ambient'>
			<div className='rounded-[var(--radius-core)] border border-line-soft bg-surface-2 p-6 shadow-inner-top xl:p-8'>
				<motion.h3
					className='font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-brand'
					initial={reduced ? false : { opacity: 0, y: 10 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
					transition={{ duration: 0.4, ease: EASE_EXPO }}
				>
					{t('competenciesSubsectionTitle')}
				</motion.h3>

				<motion.ol
					className='mt-6 flex max-w-3xl flex-col gap-4'
					initial={reduced ? false : 'hidden'}
					animate={inView ? 'visible' : 'hidden'}
					variants={listVariants}
					aria-label={t('competenciesSubsectionTitle')}
				>
					{competenciesList.map((competency, index) => (
						<motion.li key={competency.id} variants={itemVariants} className='grid grid-cols-[auto_1fr] gap-4'>
							<span className='font-mono text-xs tabular-nums text-ink-3'>
								{String(index + 1).padStart(2, '0')}
							</span>
							<span className='text-[15px] leading-relaxed text-ink-0 xl:text-base'>
								{t(`competenciesList.${competency.skill_name}`)}
							</span>
						</motion.li>
					))}
				</motion.ol>
			</div>
		</div>
	);
}
