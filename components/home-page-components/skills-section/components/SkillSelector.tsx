'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { type Category, SkillSelectorProps } from '@/types/skillSelectorTypes';

const categories: Category[] = [
    { name: 'WebDev', label: 'WebDev' },
    { name: 'DevOps', label: 'DevOps' },
    { name: 'SEO', label: 'SEO' },
    { name: 'Security', label: 'Security' },
    { name: null, label: 'All' },
];

export default function SkillSelector({ clickAction, selectedCategory }: SkillSelectorProps) {

    return (
        <motion.ul
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ amount: 0.4, once: false }}
            className='h-fit flex gap-7'
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
                            } text-slate-950 hover:bg-yellow-300 hover:shadow-md hover:scale-110`}
                    >
                        {category.label}
                    </Button>
                </li>
            ))}
        </motion.ul>
    )

}