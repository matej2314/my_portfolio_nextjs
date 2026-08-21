'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useTranslations } from 'next-intl';

import NavLink from '../links/NavLink';
import LanguageSwitcher from '../LanguageSwitcher';
import CvSelectorWrapper from '../CvSelectorWrapper';
import ContactItems from '../home-page-components/contact-section/components/ContactItems';
import MLetter from '../ui/elements/MLetterElement';

import { type MenuItem } from '@/lib/arrays/menuArrays';
import { type OpenState } from '@/types/mobileMenuTypes';
import { cn } from '@/lib/utils/utils';

const showLanguageSwitcher = true;
const EASE_SPRING = [0.32, 0.72, 0, 1] as const;

const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function listFocusables(root: HTMLElement): HTMLElement[] {
	return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(el => {
		if (el.closest('[aria-hidden="true"]')) return false;
		const rect = el.getBoundingClientRect();
		return rect.width > 0 && rect.height > 0;
	});
}

export default function MobileMenu({ array }: { array: MenuItem[] }) {
	const [isOpen, setIsOpen] = useState<OpenState>({
		menu: false,
		cv: false,
	});
	const cvRowRef = useRef<HTMLLIElement>(null);
	const menuToggleRef = useRef<HTMLButtonElement>(null);
	const menuPanelRef = useRef<HTMLDivElement>(null);
	const prevMenuOpen = useRef(false);
	const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
	const [portalLock, setPortalLock] = useState(false);
	const t = useTranslations();

	useLayoutEffect(() => {
		setPortalEl(document.body);
	}, []);

	useLayoutEffect(() => {
		if (isOpen.menu) setPortalLock(true);
	}, [isOpen.menu]);

	useClickOutside(cvRowRef, () => setIsOpen(prev => ({ ...prev, cv: false })));

	const handleNavClick = (itemLabel: string) => {
		if (itemLabel !== 'CV') {
			setIsOpen(prev => ({ ...prev, menu: false }));
		} else {
			setIsOpen(prev => ({ ...prev, cv: !prev.cv }));
		}
	};

	useLayoutEffect(() => {
		if (prevMenuOpen.current && !isOpen.menu) {
			menuToggleRef.current?.focus();
		}
		prevMenuOpen.current = isOpen.menu;
	}, [isOpen.menu]);

	useEffect(() => {
		if (!isOpen.menu) return;
		const focusFirst = () => {
			const root = menuPanelRef.current;
			if (!root) return;
			const nodes = listFocusables(root);
			nodes[0]?.focus();
		};
		const id = requestAnimationFrame(focusFirst);
		return () => cancelAnimationFrame(id);
	}, [isOpen.menu]);

	useEffect(() => {
		if (!isOpen.menu) return;
		const onKey = (e: globalThis.KeyboardEvent) => {
			if (e.key === 'Escape') setIsOpen({ menu: false, cv: false });
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen.menu]);

	useEffect(() => {
		document.body.style.overflow = isOpen.menu ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen.menu]);

	const handleMenuKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key !== 'Tab' || !menuPanelRef.current) return;
		const root = menuPanelRef.current;
		const nodes = listFocusables(root);
		if (nodes.length === 0) return;
		const first = nodes[0];
		const last = nodes[nodes.length - 1];
		const active = document.activeElement as HTMLElement | null;
		if (!active || !root.contains(active)) return;
		if (e.shiftKey) {
			if (active === first) {
				e.preventDefault();
				last.focus();
			}
		} else if (active === last) {
			e.preventDefault();
			first.focus();
		}
	}, []);

	const menu = (
		<section aria-label='Mobile menu' role='navigation' id='mobile-menu-wrapper' className='pointer-events-none'>
			<div className='pointer-events-auto fixed left-4 top-4 z-[60] flex size-11 items-center justify-center rounded-full border border-line bg-surface-1/80 text-brand backdrop-blur-xl'>
				<MLetter mode='button' size={26} aria-hidden />
			</div>

			<button
				ref={menuToggleRef}
				type='button'
				aria-expanded={isOpen.menu}
				aria-controls='mobile-menu'
				aria-label='Toggle mobile menu'
				onClick={() => setIsOpen(prev => ({ ...prev, menu: !prev.menu }))}
				className={cn(
					'pointer-events-auto fixed right-4 top-4 z-[60] flex size-11 items-center justify-center rounded-full',
					'border border-line bg-surface-1/80 text-ink-0 backdrop-blur-xl',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60',
				)}
			>
				<span className='relative block size-5' aria-hidden>
					<span
						className={cn(
							'absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
							isOpen.menu ? 'rotate-45' : '-translate-y-[6px]',
						)}
					/>
					<span
						className={cn(
							'absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-opacity duration-300',
							isOpen.menu ? 'opacity-0' : 'opacity-100',
						)}
					/>
					<span
						className={cn(
							'absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
							isOpen.menu ? '-rotate-45' : 'translate-y-[6px]',
						)}
					/>
				</span>
			</button>

			<AnimatePresence onExitComplete={() => setPortalLock(false)}>
				{isOpen.menu ? (
					<motion.div
						ref={menuPanelRef}
						key='mobile-menu'
						id='mobile-menu'
						role='dialog'
						aria-modal='true'
						aria-label='Mobile navigation menu'
						tabIndex={-1}
						onKeyDown={handleMenuKeyDown}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.35, ease: EASE_SPRING }}
						className='pointer-events-auto fixed inset-0 z-[55] overflow-y-auto bg-surface-0/85 px-5 pb-10 pt-24 backdrop-blur-3xl'
					>
						{showLanguageSwitcher ? (
							<motion.div
								className='mb-8'
								initial={{ opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.05, duration: 0.45, ease: EASE_SPRING }}
							>
								<LanguageSwitcher />
							</motion.div>
						) : null}

						<ul className='flex flex-col gap-2'>
							{array.map((item, index) => (
								<motion.li
									key={item.label}
									ref={item.label === 'CV' ? cvRowRef : undefined}
									className='relative'
									initial={{ opacity: 0, y: 28 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.08 + index * 0.07, duration: 0.5, ease: EASE_SPRING }}
								>
									<NavLink
										pathName={item.path as string}
										variant={item.variant}
										title={t(`mainMenu.${item.label}`)}
										aria-label={t(`mainMenu.${item.label}`)}
										aria-haspopup={item.label === 'CV' ? 'menu' : undefined}
										aria-expanded={item.label === 'CV' ? isOpen.cv : undefined}
										onClick={() => handleNavClick(item.label)}
										linkClass='flex w-full items-baseline gap-3 rounded-2xl px-2 py-3 font-display text-2xl font-medium text-ink-0 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'
									>
										<span className='font-mono text-xs text-ink-3'>{String(index + 1).padStart(2, '0')}</span>
										{t(`mainMenu.${item.label}`)}
									</NavLink>
									{item.label === 'CV' && isOpen.cv ? <CvSelectorWrapper cvLinksAsMenuItems /> : null}
								</motion.li>
							))}
						</ul>

						<motion.div
							className='mt-10 border-t border-line pt-6 text-ink-1'
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.35, duration: 0.5, ease: EASE_SPRING }}
						>
							<ContactItems />
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</section>
	);

	const shouldPortal = Boolean(portalEl) && (isOpen.menu || portalLock);
	return shouldPortal && portalEl ? createPortal(menu, portalEl) : menu;
}
