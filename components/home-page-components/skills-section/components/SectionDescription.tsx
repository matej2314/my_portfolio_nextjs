'use client';

import { easeInOut, motion } from 'motion/react';

export default function SectionDescription({ description }: { description: string }) {
	return (
		<motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: easeInOut }} viewport={{ amount: 0.4, once: true }} className='w-full h-fit xl:w-[40%] text-justify flex justify-center'>
			<p className='h-fit text-base md:text-xl leading-9 tracking-wide font-kanit'>{description}</p>
		</motion.div>
	);
}
