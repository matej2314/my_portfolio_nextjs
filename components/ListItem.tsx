'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';


import { type ListItemType } from '@/types/ListItemTypes';

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.5 }
}


export const ListItem = ({ itemClass, linkClass, iconName, label, pathName }: ListItemType) => {

    return (
        <motion.li
            variants={itemVariants}
            className={itemClass}
        >
            <a href={pathName} className={linkClass}>
                <Icon icon={iconName} width={30} />
                <span className='text-lg'>{label}</span>
            </a>
        </motion.li>
    )
}