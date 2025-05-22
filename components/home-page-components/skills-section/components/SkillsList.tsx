'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion'

import { type Skill } from '@/types/actionsTypes/actionsTypes';
import SkillSelector from './SkillSelector';

export default function SkillsList({ skills }: { skills: Skill[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredSkills = selectedCategory ? skills.filter(skill => skill.skill_cat === selectedCategory)
        : skills;

    return (
        <div className="w-full text-white flex flex-col justify-center items-center gap-5">
            <SkillSelector clickAction={setSelectedCategory} selectedCategory={selectedCategory} />
            <motion.ul
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                viewport={{ amount: 0.4, once: false }}
                className='w-full grid grid-cols-3 gap-x-[5rem] gap-y-4'
            >
                {filteredSkills.map(skill => (
                    <li
                        key={skill.skill_name}
                        className='w-full flex justify-start items-center gap-3 hover:scale-110'
                    >
                        <span>
                            <Icon
                                icon={skill.icon_name as string}
                                color={skill.icon_color as string}
                                width={28}
                                height={28}
                            />
                        </span>
                        <span className='text-xl'>
                            {skill.skill_name}
                        </span>
                    </li>
                ))}
            </motion.ul>
        </div>
    )
}