'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { LayoutGroup, motion } from 'motion/react';

import { defaultData } from '@/lib/defaultData';
import { cn } from '@/lib/utils/utils';

export default function LanguageSwitcher() {
	const currentLocale = useLocale();
	const router = useRouter();
	const t = useTranslations('mainMenu');
	const langOptions = defaultData.langOptions;

	async function switchToLocale(locale: string) {
		const res = await fetch('/api/locale', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ locale }),
		});

		if (res.ok) {
			router.refresh();
		}
	}

	const activeLabel = langOptions.find(opt => opt.value === currentLocale)?.label ?? currentLocale;

	return (
		<div
			role='group'
			aria-label={`${t('languageSwitcherLabel')}: ${activeLabel}`}
			className='relative inline-flex items-center rounded-full border border-line bg-surface-0/60 p-0.5'
		>
			<LayoutGroup id='lang-switcher-pill'>
				{langOptions.map(opt => {
					const isActive = opt.value === currentLocale;
					return (
						<button
							key={opt.value}
							type='button'
							onClick={() => {
								if (!isActive) void switchToLocale(opt.value);
							}}
							className={cn(
								'relative z-[1] min-w-[2.5rem] rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
								'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60',
								isActive ? 'text-surface-0' : 'text-ink-2 hover:text-ink-0',
							)}
							aria-pressed={isActive}
						>
							{isActive ? (
								<motion.span
									layoutId='lang-active-pill'
									className='absolute inset-0 rounded-full bg-brand'
									transition={{ type: 'spring', stiffness: 420, damping: 34 }}
								/>
							) : null}
							<span className='relative z-[1]'>{opt.value.toUpperCase()}</span>
						</button>
					);
				})}
			</LayoutGroup>
		</div>
	);
}
