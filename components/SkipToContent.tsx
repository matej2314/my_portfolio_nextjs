import { getTranslations } from 'next-intl/server';

/** First focusable control — jumps past chrome into primary content. */
export default async function SkipToContent() {
	const t = await getTranslations('common.a11y');

	return (
		<a
			href='#main-content'
			className='fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-surface-0 opacity-0 shadow-lift transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus:translate-y-0 focus:opacity-100 focus:outline-none focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0'
		>
			{t('skipToContent')}
		</a>
	);
}
