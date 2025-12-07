'use client';

import { easeInOut, motion } from 'motion/react';

export default function AboutMeDescription({ description }: { description: string }) {
	return (
		<motion.div initial={{ opacity: 0, x: 200 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: easeInOut }} viewport={{ amount: 0.4, once: true }} className='w-full flex flex-col items-center text-slate-200 '>
			<p className='text-md xl:text-xl text-justify leading-9 md:pr-0'>{description}</p>
		</motion.div>
	);
}
