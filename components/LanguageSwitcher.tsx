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

	const otherLocale = langOptions.find((opt) => opt.value !== currentLocale)?.value;

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

	function handleToggle() {
		if (!otherLocale) return;
		void switchToLocale(otherLocale);
	}

	const activeLabel =
		langOptions.find((opt) => opt.value === currentLocale)?.label ?? currentLocale;

	return (
		<button
			type="button"
			className="inline-flex items-center gap-0.5 rounded-full border border-slate-600 bg-[#000805] p-0.5 font-jakarta focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000805]"
			aria-label={`${t('languageSwitcherLabel')}: ${activeLabel}`}
			onClick={handleToggle}
		>
			{langOptions.map((opt) => {
				const isActive = opt.value === currentLocale;
				return (
					<span
						key={opt.value}
						aria-hidden
						className={cn(
							'pointer-events-none min-w-[2.75rem] rounded-full px-3 py-1.5 text-[13px] transition-colors select-none',
							isActive
								? 'bg-yellow-300 font-semibold text-[#0c0c0c]'
								: 'font-medium text-slate-400',
						)}
					>
						{opt.value.toUpperCase()}
					</span>
				);
			})}
		</button>
	);
}
