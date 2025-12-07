'use client';

import { Icon } from '@iconify/react';
import { motion, easeOut, type Variants } from 'motion/react';

import { type ListItemType } from '@/types/ListItemTypes';

const itemVariants: Variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: easeOut } },
	exit: { opacity: 0, scale: 0.5 },
};

export const ListItem = ({ itemClass, linkClass, iconName, label, pathName }: ListItemType) => {
	return (
		<motion.li variants={itemVariants} className={itemClass}>
			<a href={pathName} className={linkClass}>
				{iconName && <Icon icon={iconName} width={30} aria-label={`${label} icon`} />}
				<span className=' md:text-lg'>{label}</span>
			</a>
		</motion.li>
	);
};
