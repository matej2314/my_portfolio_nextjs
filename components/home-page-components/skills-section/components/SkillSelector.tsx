'use client';

import { motion, easeOut } from 'framer-motion';
import { Button } from '@/components/ui/button';

import { type SkillSelectorProps } from '@/types/skillSelectorTypes';

export default function SkillSelector({ clickAction, selectedCategory, categories }: SkillSelectorProps) {

    return (
        <motion.ul
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easeOut }}
            viewport={{ amount: 0.4, once: false }}
            className='w-full h-fit flex justify-center gap-2 min-[450px]:gap-3 min-[515px]:gap-6 min-[580px]:gap-7'
        >
            {categories.map((category, index) => (
                <li
                    key={`${category.name}-${index}`}
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