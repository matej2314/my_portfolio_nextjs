'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion'

import { type Skill } from '@/types/actionsTypes/actionsTypes';
import SkillSelector from './SkillSelector';

export default function SkillsList({ skills }: { skills: Skill[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredSkills = selectedCategory ? skills.filter(skill => skill.skill_cat === selectedCategory)
        : skills;

    return (
        <div className="relative w-full min-h-[15rem] h-[15rem] text-white flex flex-col items-center gap-5 mb-[6rem]">
            <SkillSelector clickAction={setSelectedCategory} selectedCategory={selectedCategory} />
            <motion.ul
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                viewport={{ amount: 0.4, once: false }}
                className='w-full grid grid-cols-3 gap-x-[12rem] gap-y-6 mr-[8rem]'
            >
                <AnimatePresence mode='wait'>
                    {filteredSkills.map(skill => (
                        <motion.li
                            key={skill.skill_name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className='w-full h-[2rem] flex justify-start items-center gap-3 hover:scale-110'
                        >
                            <span>
                                <Icon
                                    icon={skill.icon_name as string}
                                    color={skill.icon_color as string}
                                    width={28}
                                    height={28}
                                />
                            </span>
                            <span className='text-sm md:text-xl'>
                                {skill.skill_name}
                            </span>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </motion.ul>
        </div>
    )
}