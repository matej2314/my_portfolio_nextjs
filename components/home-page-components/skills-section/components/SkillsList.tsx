'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence, easeOut, useInView, type Variants } from 'motion/react';

import SkillSelector from './SkillSelector';
import TooltipElement from '@/components/ui/elements/TooltipElement';

import { getSkillsCategories, getFilteredSkills } from '@/lib/utils/utils';

import { type Skill } from '@/types/actionsTypes/actionsTypes';
import { type Category } from '@/types/skillSelectorTypes';

export default function SkillsList({ skills }: { skills: Skill[] }) {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const listRef = useRef<HTMLUListElement>(null);
	const isListInView = useInView(listRef, { amount: 0.4, once: true });
	const t = useTranslations('homePage.skillsSection.skillsList');

	const filteredSkills: Skill[] = getFilteredSkills(skills, selectedCategory) as Skill[];

	const categories: Category[] = getSkillsCategories(skills);

	const listVariants: Variants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
		exit: { opacity: 0, scale: 0.5 },
	};

	const itemVariants: Variants = {
		hidden: { opacity: 0, y: -10 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
		exit: { opacity: 0, y: 100 },
	};

	return (
		<div className='relative max-w-screen w-full sm:w-screen xl:w-full min-h-[15rem] h-[15rem] text-white flex flex-col items-center gap-5 xl:gap-7 mb-[6rem]'>
			<SkillSelector clickAction={setSelectedCategory} selectedCategory={selectedCategory} categories={categories} />
			<motion.ul layout variants={listVariants} initial='hidden' whileInView={isListInView ? 'visible' : 'hidden'} ref={listRef} viewport={{ amount: 0.3, once: true }} exit='exit' className='w-full grid grid-cols-3 mr-2 gap-x-[1rem] min-[400px]:ml-[2rem] min-[455px]:gap-x-[0.5rem] min-[455px]:ml-[3.5rem] min-[555px]:ml-[5rem] sm:ml-[3rem] sm:gap-y-2 xl:gap-x-[3rem] xl:gap-y-[2rem] xl:ml-3 gap-y-6 sm:mx-auto'>
				<AnimatePresence mode='wait'>
					{filteredSkills.map(skill => (
						<TooltipElement key={skill.skill_name} content={skill.skill_description ? t(skill.skill_description) : null} side='top' sideOffset={10} className=' bg-[#000805] text-slate-200 border-[1px] border-green-400 text-sm' arrowClassName='bg-[#000805] fill-bg-[#000805] border-b-[1px] border-r-[1px] border-green-400'>
							<motion.li variants={itemVariants} initial='hidden' whileInView='visible' exit='exit' viewport={{ amount: 0.3, once: true }} className='w-fit h-[1.5rem] flex justify-start items-center gap-3 hover:scale-110 xl:text-wrap ml-[0.3rem] md:ml-0'>
								<span>
									<Icon icon={skill.icon_name as string} color={skill.icon_color as string} width={28} height={28} />
								</span>
								<span className='text-[0.7rem] md:text-lg xxl:text-xl'>{skill.skill_name}</span>
							</motion.li>
						</TooltipElement>
					))}
				</AnimatePresence>
			</motion.ul>
		</div>
	);
}
