'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

import { defaultData } from '@/lib/defaultData';
import { type ContactChannelItem } from '@/types/contactChannelTypes';

/** Spójnie z polami w ContactForm (`inputClass` / `textareaClass`). */
const contactCardClass =
	'flex items-center gap-3 rounded-md border border-slate-700 bg-[#0c0c0c] px-5 py-3.5 outline-none transition-[color,box-shadow,border-color] hover:border-slate-600 hover:ring-1 hover:ring-slate-600 focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600 focus-visible:border-slate-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-600';

const listVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.08 },
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 8 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function channelValue(item: ContactChannelItem, linkedinCta: string): string {
	return item.kind === 'linkedin' ? linkedinCta : item.label;
}

export default function ContactItems() {
	const t = useTranslations('homePage.contactSection');
	const contactItems = defaultData.contactItems;

	return (
		<motion.ul
			variants={listVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ amount: 0.2, once: true }}
			className='flex w-full max-w-[520px] flex-col gap-4'
		>
			{contactItems.map(item => (
				<motion.li key={item.pathName} variants={itemVariants}>
					<a
						href={item.pathName}
						className={contactCardClass}
						{...(item.pathName.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
					>
						<span className='h-8 w-1 shrink-0 rounded-sm bg-[#facc15]' aria-hidden />
						<div className='flex min-w-0 flex-col gap-1'>
							<span className='text-xs font-semibold text-slate-500'>{t(`cards.${item.kind}`)}</span>
							<span className={`truncate text-base ${item.kind === 'linkedin' ? 'font-normal text-[#facc15]' : 'text-slate-200'}`}>
								{channelValue(item, t('linkedinCta'))}
							</span>
						</div>
					</a>
				</motion.li>
			))}
		</motion.ul>
	);
}
