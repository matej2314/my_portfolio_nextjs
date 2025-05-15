'use client';

import { motion } from 'framer-motion';


type Category = {
    name: string | null;
    label: string;

}

const categories: Category[] = [
    { name: 'WebDev', label: 'WebDev' },
    { name: 'DevOps', label: 'DevOps' },
    { name: 'SEO', label: 'SEO' },
    { name: 'Security', label: 'Security' },
    { name: null, label: 'All' },
];

export default function SkillSelector() {


    return (
        <motion.ul>

        </motion.ul>
    )

}