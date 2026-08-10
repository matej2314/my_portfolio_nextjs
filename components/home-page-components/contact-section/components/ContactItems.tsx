'use client';

import { Icon } from '@iconify/react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { defaultData } from '@/lib/defaultData';
import { type ContactChannelItem } from '@/types/contactChannelTypes';
import { cn } from '@/lib/utils/utils';
import { fadeUp, listContainer } from '@/lib/motion/variants';

function channelValue(item: ContactChannelItem, linkedinCta: string): string {
	return item.kind === 'linkedin' ? linkedinCta : item.label;
}

function channelIcon(kind: ContactChannelItem['kind']) {
	switch (kind) {
		case 'email':
			return 'ph:envelope-simple-light';
		case 'linkedin':
			return 'ph:linkedin-logo-light';
		case 'github':
			return 'ph:github-logo-light';
		default:
			return 'ph:arrow-up-right-light';
	}
}

export default function ContactItems() {
	const t = useTranslations('homePage.contactSection');
	const contactItems = defaultData.contactItems;
	const reduced = useReducedMotion();
	const itemVariants = fadeUp(!!reduced);

	return (
		<motion.ul
			variants={listContainer()}
			initial='hidden'
			whileInView='visible'
			viewport={{ amount: 0.2, once: true }}
			className='flex w-full max-w-[520px] flex-col md:max-w-none xl:max-w-[520px]'
		>
			{contactItems.map(item => (
				<motion.li key={item.pathName} variants={itemVariants} className='border-b border-line first:border-t'>
					<a
						href={item.pathName}
						className={cn(
							'group flex w-full items-center gap-4 py-5 outline-none',
							'transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
							'hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0',
						)}
						{...(item.pathName.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
					>
						<span className='flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-2 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-brand-line group-hover:text-brand'>
							<Icon icon={channelIcon(item.kind)} width={18} height={18} aria-hidden />
						</span>
						<div className='flex min-w-0 flex-1 flex-col gap-1'>
							<span className='font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-3'>
								{t(`cards.${item.kind}`)}
							</span>
							<span
								className={cn(
									'truncate text-base text-ink-0',
									item.kind === 'linkedin' && 'text-brand',
								)}
							>
								{channelValue(item, t('linkedinCta'))}
							</span>
						</div>
						<span className='flex size-8 shrink-0 items-center justify-center text-ink-3 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:text-brand'>
							<Icon icon='ph:arrow-up-right-light' width={16} height={16} aria-hidden />
						</span>
					</a>
				</motion.li>
			))}
		</motion.ul>
	);
}
