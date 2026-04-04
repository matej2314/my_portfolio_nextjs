'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { defaultData } from '@/lib/defaultData';
import { cn } from '@/lib/utils/utils';

export default function LanguageSwitcher() {
	const currentLocale = useLocale();
	const router = useRouter();
	const t = useTranslations('mainMenu');
	const langOptions = defaultData.langOptions;

	async function handleChange(locale: string) {
		if (locale === currentLocale) return;

		const res = await fetch('/api/locale', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ locale }),
		});

		if (res.ok) {
			router.refresh();
		}
	}

	return (
		<div
			className="inline-flex items-center gap-0.5 rounded-full border border-slate-600 bg-[#000805] p-0.5 font-jakarta"
			role="radiogroup"
			aria-label={t('languageSwitcherLabel')}
		>
			{langOptions.map((opt) => {
				const isActive = opt.value === currentLocale;
				return (
					<button
						key={opt.value}
						type="button"
						role="radio"
						aria-checked={isActive}
						aria-label={opt.ariaLabel}
						onClick={() => void handleChange(opt.value)}
						className={cn(
							'min-w-[2.75rem] rounded-full px-3 py-1.5 text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000805]',
							isActive
								? 'bg-yellow-300 font-semibold text-[#0c0c0c]'
								: 'font-medium text-slate-400 hover:text-slate-200',
						)}
					>
						{opt.value.toUpperCase()}
					</button>
				);
			})}
		</div>
	);
}
