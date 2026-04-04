'use client';

import { motion, easeInOut } from 'framer-motion';

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.05,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 6 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.35, ease: easeInOut },
	},
};

export default function TechList({ techArray }: { techArray: string[] }) {
	return (
		<motion.span className="inline" variants={containerVariants} initial="hidden" animate="visible">
			{techArray.map((tech, index) => (
				<motion.span key={`${index}-${tech}`} className="inline" variants={itemVariants}>
					{tech}
					{index < techArray.length - 1 ? ' · ' : null}
				</motion.span>
			))}
		</motion.span>
	);
}
