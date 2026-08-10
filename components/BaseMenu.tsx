'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { LayoutGroup, motion } from 'motion/react';
import { Icon } from '@iconify/react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useTranslations } from 'next-intl';
import { useDeviceType } from '@/hooks/useDeviceType';
import { type MenuItem } from '@/lib/arrays/menuArrays';
import { useActiveSection } from '@/hooks/useActiveSection';
import { sections } from '@/lib/arrays/homePageSectionsArr';
import { cn } from '@/lib/utils/utils';

import NavLink from './links/NavLink';
import MobileMenu from './mobile-menu/MobileMenu';
import CvSelectorWrapper from './CvSelectorWrapper';
import LanguageSwitcher from './LanguageSwitcher';
import MLetter from './ui/elements/MLetterElement';

const showLanguageSwitcher = true;

export default function BaseMenu({ array }: { array: MenuItem[] }) {
	const [isCvOpen, setIsCvOpen] = useState(false);
	const cvClusterRef = useRef<HTMLDivElement>(null);
	const t = useTranslations();
	const device = useDeviceType();
	const activeSection = useActiveSection(sections);

	useClickOutside(cvClusterRef, () => setIsCvOpen(false));

	const { navItems, resumeItem } = useMemo(() => {
		const resume = array.find(item => item.label === 'CV');
		const nav = array.filter(item => item.label !== 'CV');
		return { navItems: nav, resumeItem: resume };
	}, [array]);

	if (device === 'mobile' || device === 'tablet') return <MobileMenu array={array} />;

	return (
		<nav aria-label='Main menu' className='pointer-events-none flex w-full justify-center px-4'>
			<div className={cn('pointer-events-auto flex w-max max-w-[min(100%,72rem)] items-center gap-3 rounded-full border border-line', 'bg-surface-1/55 px-2 py-2 shadow-ambient backdrop-blur-xl')}>
				<Link href='/home' className='flex size-10 shrink-0 items-center justify-center rounded-full text-brand transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60' aria-label={t('mainMenu.Home')}>
					<MLetter mode='button' size={26} aria-hidden className='block' />
				</Link>

				<LayoutGroup id='home-nav-pill'>
					<ul className='flex min-w-0 items-center gap-1'>
						{navItems.map((item, index) => {
							const sectionId = item.path?.startsWith('#') ? item.path.slice(1) : null;
							const isActive = sectionId !== null && activeSection === sectionId;
							return (
								<li key={`${item.label}-${index}`} className='relative shrink-0'>
									{isActive ? <motion.span layoutId='active-nav-pill' className='absolute inset-0 rounded-full bg-brand-tint' transition={{ type: 'spring', stiffness: 380, damping: 32 }} /> : null}
									<NavLink pathName={item.path || ''} variant={item.variant} linkClass={cn('relative z-[1] whitespace-nowrap rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-ink-1', 'transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]', 'hover:text-ink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60', isActive && 'text-brand')} title={t(`mainMenu.${item.label}`)} aria-label={t(`mainMenu.${item.label}`)}>
										{t(`mainMenu.${item.label}`)}
									</NavLink>
								</li>
							);
						})}
					</ul>
				</LayoutGroup>

				<div className='flex shrink-0 items-center gap-2 pl-1'>
					{showLanguageSwitcher ? <LanguageSwitcher /> : null}
					{resumeItem ? (
						<div ref={cvClusterRef} className='relative w-fit'>
							<button
								type='button'
								onClick={() => setIsCvOpen(open => !open)}
								className={cn(
									'group inline-flex h-[32px] items-center gap-1.5 rounded-full bg-brand py-0 pl-3.5 pr-1 text-[12px] font-medium text-surface-0',
									'transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
									'hover:bg-brand-bright active:scale-[0.98]',
									'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0',
								)}
								aria-expanded={isCvOpen}
								aria-haspopup='true'
								aria-label={t(`mainMenu.${resumeItem.label}`)}
							>
								{t(`mainMenu.${resumeItem.label}`)}
								<span className='flex size-6 items-center justify-center rounded-full bg-surface-0/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105'>
									<Icon icon='ph:arrow-up-right-light' width={14} height={14} aria-hidden />
								</span>
							</button>
							{isCvOpen ? <CvSelectorWrapper /> : null}
						</div>
					) : null}
				</div>
			</div>
		</nav>
	);
}
