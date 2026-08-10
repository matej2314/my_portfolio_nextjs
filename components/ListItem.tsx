'use client';

import { Icon } from '@iconify/react';
import { motion } from 'motion/react';

import { scaleIn } from '@/lib/motion/variants';
import { type ListItemType } from '@/types/ListItemTypes';

export const ListItem = ({ itemClass, linkClass, iconName, label, pathName }: ListItemType) => {
	return (
		<motion.li variants={scaleIn} className={itemClass}>
			<a href={pathName} className={linkClass}>
				{iconName && <Icon icon={iconName} width={30} aria-label={`${label} icon`} />}
				<span className=' md:text-lg'>{label}</span>
			</a>
		</motion.li>
	);
};
