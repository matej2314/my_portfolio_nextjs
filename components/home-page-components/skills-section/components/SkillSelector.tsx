'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

import { categories } from '@/lib/skillsCategoryArray';

import { type SkillSelectorProps } from '@/types/skillSelectorTypes';

export default function SkillSelector({ clickAction, selectedCategory }: SkillSelectorProps) {

    return (
        <motion.ul
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ amount: 0.4, once: false }}
            className='h-fit flex gap-2 sm:gap-7'
        >
            {categories.map(category => (
                <li
                    key={category.name}
                >
                    <Button
                        onClick={() => clickAction(category.name as string)}
                        className={`w-fit h-fit ${selectedCategory === category.name
                            ? 'bg-yellow-400'
                            : 'bg-yellow-200'
                            } text-slate-950 hover:bg-yellow-300 hover:shadow-md text-[0.75rem] font-semibold sm:tracking-wide md:font-normal md:text-base hover:scale-110`}
                    >
                        {category.label}
                    </Button>
                </li>
            ))}
        </motion.ul>
    )

}