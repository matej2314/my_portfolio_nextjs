'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils/utils';
import { EASE_EXPO } from '@/lib/motion/variants';

function bentoClass(index: number, total: number) {
	if (total === 1) return 'col-span-2 md:col-span-6 aspect-[16/10]';
	if (index === 0) return 'col-span-2 row-span-2 md:col-span-4 md:row-span-2 min-h-[16rem] md:min-h-[22rem]';
	if (index === 1 && total === 2) return 'col-span-2 md:col-span-2 aspect-[4/3] md:min-h-[22rem] md:aspect-auto';
	if (index === 1) return 'col-span-1 md:col-span-2 aspect-[4/3]';
	if (index === 2) return 'col-span-1 md:col-span-2 aspect-[4/3]';
	return 'col-span-1 md:col-span-2 aspect-[4/3]';
}

export default function ProjectGalleryBento({ paths, projectName }: { paths: string[]; projectName: string }) {
	const t = useTranslations('projectDetailsPage');
	const reduced = useReducedMotion();
	const [active, setActive] = useState<number | null>(null);

	const close = useCallback(() => setActive(null), []);

	useEffect(() => {
		if (active === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
			if (e.key === 'ArrowRight') setActive(i => (i === null ? i : (i + 1) % paths.length));
			if (e.key === 'ArrowLeft') setActive(i => (i === null ? i : (i - 1 + paths.length) % paths.length));
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [active, close, paths.length]);

	if (paths.length === 0) return null;

	return (
		<section className='w-full min-w-0'>
			<p className='mb-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-brand'>
				{t('galleryLabel')}
			</p>
			<div className='grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4'>
				{paths.map((path, index) => (
					<button
						key={path}
						type='button'
						onClick={() => setActive(index)}
						className={cn(
							'group relative overflow-hidden rounded-[var(--radius-shell)] border border-line bg-surface-1/50 p-1 text-left shadow-ambient',
							'transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
							'hover:-translate-y-0.5 hover:border-brand-line',
							'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60',
							bentoClass(index, paths.length),
						)}
						aria-label={`${t('openLightbox')} ${index + 1}`}
					>
						<div className='relative h-full min-h-[8rem] w-full overflow-hidden rounded-[var(--radius-core)] border border-line-soft bg-surface-2'>
							<Image
								src={path}
								alt={`${projectName} — ${index + 1}`}
								fill
								className='object-cover opacity-85 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03] group-hover:opacity-100'
								sizes='(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 33vw'
								loading={index === 0 ? 'eager' : 'lazy'}
							/>
						</div>
					</button>
				))}
			</div>

			<AnimatePresence>
				{active !== null ? (
					<motion.div
						className='fixed inset-0 z-[80] flex items-center justify-center bg-surface-0/90 p-4 backdrop-blur-xl xl:p-10'
						initial={reduced ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: reduced ? 0 : 0.35, ease: EASE_EXPO }}
						role='dialog'
						aria-modal='true'
						aria-label={t('galleryLabel')}
						onClick={close}
					>
						<button
							type='button'
							onClick={close}
							className='absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-line bg-surface-1/80 text-ink-1 transition-colors hover:border-brand-line hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 xl:right-8 xl:top-8'
							aria-label={t('closeLightbox')}
						>
							<Icon icon='ph:x-light' width={20} height={20} />
						</button>
						<motion.div
							className='relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-[var(--radius-shell)] border border-line bg-surface-2 shadow-lift'
							initial={reduced ? false : { opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 12 }}
							transition={{ duration: reduced ? 0 : 0.45, ease: EASE_EXPO }}
							onClick={e => e.stopPropagation()}
						>
							<Image
								src={paths[active]!}
								alt={`${projectName} — ${active + 1}`}
								fill
								className='object-contain'
								sizes='(max-width: 1280px) 90vw, 1024px'
								priority
							/>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</section>
	);
}
