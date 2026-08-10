'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useProjectInterceptClose } from '@/components/project-details-page/ProjectInterceptCloseContext';

type Props = {
	projectName: string;
	mode: 'intercept' | 'page';
};

export default function ProjectDetailsBackNav({ projectName, mode }: Props) {
	const router = useRouter();
	const requestClose = useProjectInterceptClose();
	const t = useTranslations('homePage.projectsSection');

	const className =
		'inline-flex items-center gap-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ink-3 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60';

	return (
		<div className='flex w-full flex-row items-center justify-between gap-4'>
			{mode === 'page' ? (
				<Link href='/home#projectsSection' scroll className={className} aria-label={t('backToProjects')}>
					← {t('breadcrumbPrefix')}
					<span className='text-ink-3/50'> / </span>
					<span className='normal-case tracking-normal text-ink-2'>{projectName}</span>
				</Link>
			) : (
				<button
					type='button'
					onClick={() => {
						if (requestClose) void requestClose();
						else router.back();
					}}
					className={className}
					aria-label={t('backToProjects')}
				>
					← {t('backToProjects')}
				</button>
			)}
		</div>
	);
}
