'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, easeOut, easeIn } from 'motion/react';

import { useActiveSection } from '@/hooks/useActiveSection';
import { useDeviceType } from '@/hooks/useDeviceType';

import NavLink from '../links/NavLink';

import { sections } from '@/lib/arrays/homePageSectionsArr';
import { type Variants } from 'motion/react';

const DotNavigation = () => {
	const [clickedSection, setClickedSection] = useState<string | null>(null);
	const pathName = usePathname();
	const device = useDeviceType();

	const activeSection = useActiveSection(sections);

	const dotContainerVariant: Variants = {
		hidden: { opacity: 0, x: 50 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeIn, staggerChildren: 0.3, delayChildren: 0.3 } },
		exit: { opacity: 0, x: 50, transition: { duration: 0.4, ease: easeOut } },
	};

	const dotVariant: Variants = {
		hidden: { opacity: 0, x: 50 },
		visible: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: 50, transition: { duration: 0.4, ease: easeOut } },
	};

	const handleDotClick = (section: string) => {
		setClickedSection(section);

		setTimeout(() => {
			setClickedSection(null);
		}, 400);
	};

	return (
		<AnimatePresence>
			{device !== 'mobile' && (
				<motion.ul
					variants={dotContainerVariant}
					initial='hidden'
					animate='visible'
					exit='exit'
					transition={{ duration: 0.4, ease: easeIn }}
					className={`w-fit h-full flex pt-[9rem] flex-col gap-3
                 ${pathName?.startsWith('/home/project') || pathName?.startsWith('/home/blog') ? 'hidden' : 'block'}`}
				>
					{sections.map(section => (
						<motion.li key={section} variants={dotVariant} exit='exit' className='w-fit h-fit flex' onClick={() => handleDotClick(section)}>
							{clickedSection === section && (
								<motion.div
									initial={{
										scale: 3,
										opacity: 1,
										width: '1rem',
										height: '1rem',
									}}
									animate={{
										scale: 1,
										opacity: 0,
									}}
									transition={{
										duration: 0.6,
										ease: 'linear',
									}}
									className='absolute rounded-full border-[1px] border-yellow-300 pointer-events-none'
								/>
							)}
							<NavLink pathName={`#${section}`} isActive={activeSection === section} linkClass='w-4 h-4 bg-white border-1 border-black rounded-full hover:bg-yellow-200 cursor-pointer' activeClass='bg-yellow-200' variant='home' title={section} aria-label={`Navigate to ${section} section`} />
						</motion.li>
					))}
				</motion.ul>
			)}
		</AnimatePresence>
	);
};

export default DotNavigation;
