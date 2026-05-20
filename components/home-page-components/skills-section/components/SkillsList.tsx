'use client';

import { motion, easeInOut, AnimatePresence, useInView } from 'motion/react';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { type Skill } from '@/types/actionsTypes/actionsTypes';

const listVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.05,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 12 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: easeInOut },
	},
};

export default function SkillsList({ competenciesList }: { competenciesList: Skill[] }) {
	const listRef = useRef<HTMLDivElement>(null);
	const inView = useInView(listRef, { once: true, amount: 0.25 });
	const t = useTranslations('homePage.skillsSection');

	return (
		<AnimatePresence>
			<div ref={listRef} className='flex flex-col gap-5 font-jakarta max-xl:gap-4'>
				<motion.h3 className='font-semibold tracking-wide text-[#facc15] max-xl:text-[15px] xl:text-base' initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.35, ease: easeInOut }}>
					{t('competenciesSubsectionTitle')}
				</motion.h3>
				<motion.ul className='flex max-w-3xl flex-col gap-4 max-xl:gap-3.5' initial='hidden' animate={inView ? 'visible' : 'hidden'} variants={listVariants} aria-label={t('competenciesSubsectionTitle')}>
					{competenciesList.map(competency => (
						<motion.li key={competency.id} variants={itemVariants} className='flex gap-3 max-xl:gap-2.5'>
							<span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#facc15]' aria-hidden />
							<span className='text-base font-normal leading-relaxed text-slate-50 max-xl:text-[15px] max-xl:leading-relaxed xl:leading-normal'>{t(`competenciesList.${competency.skill_name}`)}</span>
						</motion.li>
					))}
				</motion.ul>
			</div>
		</AnimatePresence>
	);
}
