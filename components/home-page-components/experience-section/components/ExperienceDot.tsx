'use client';

import { motion, easeInOut } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { forwardRef } from 'react';
import { type Experience } from '@/types/actionsTypes/actionsTypes';

interface ExperienceDotProps {
	experience: Experience;
	onClick?: () => void;
}

const ExperienceDot = forwardRef<HTMLDivElement, ExperienceDotProps>(({ experience, onClick }, ref) => {
	const t = useTranslations('homePage.experienceSection');

	return (
		<div ref={ref} className='relative snap-center h-screen w-full flex items-center justify-center'>
			<motion.div whileHover={{ backgroundColor: '#fde68a', scale: 1.2 }} transition={{ duration: 0.2, ease: easeInOut }} onClick={onClick} className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-5 h-5 bg-white border-2 border-yellow-300 rounded-full cursor-pointer' />

			<div className='absolute left-[calc(50%+1.5rem)] md:left-[calc(50%+2rem)] lg:left-[calc(50%+2.5rem)] top-1/2 -translate-y-1/2 w-[85%] max-w-[350px] md:max-w-[400px] lg:max-w-[450px]'>
				<div className='bg-linear-green rounded-lg p-4 md:p-6 border border-green-400 shadow-lg'>
					<h3 className='text-xl md:text-2xl lg:text-3xl text-green-400 font-semibold mb-2'>{experience.employer}</h3>
					<p className='text-base md:text-lg lg:text-xl text-yellow-300 font-medium mb-3'>{experience.position}</p>
					<div className='flex flex-col gap-1 text-sm md:text-base text-slate-200'>
						{experience.employed_since && (
							<p>
								{t('employedSince')}: {new Date(experience.employed_since).toLocaleDateString()}
							</p>
						)}
						{experience.employed_to ? (
							<p>
								{t('employedTo')}: {new Date(experience.employed_to).toLocaleDateString()}
							</p>
						) : (
							experience.is_current && <p className='text-green-400'>{t('currentPosition')}</p>
						)}
					</div>
					{experience.employer_url && (
						<a href={experience.employer_url} target='_blank' rel='noopener noreferrer' className='text-green-400 hover:text-yellow-300 text-sm mt-2 inline-block'>
							{t('visitWebsite')} →
						</a>
					)}
				</div>
			</div>
		</div>
	);
});

ExperienceDot.displayName = 'ExperienceDot';

export default ExperienceDot;
