'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion, AnimatePresence, easeInOut } from 'motion/react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

import NavLink from '../links/NavLink';
import LanguageSwitcher from '../LanguageSwitcher';
import CvSelectorWrapper from '../CvSelectorWrapper';
import ContactItems from '../home-page-components/contact-section/components/ContactItems';
import MLetter from '../ui/elements/MLetterElement';

import { type MenuItem } from '@/lib/arrays/menuArrays';
import { type OpenState } from '@/types/mobileMenuTypes';

/** Zsynchronizuj z BaseMenu.showLanguageSwitcher */
const showLanguageSwitcher = true;

const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function listFocusables(root: HTMLElement): HTMLElement[] {
	return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((el) => {
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
	const menuPanelRef = useRef<HTMLUListElement>(null);
	const prevMenuOpen = useRef(false);
	const t = useTranslations();

	useClickOutside(cvRowRef, () => setIsOpen((prev) => ({ ...prev, cv: false })));

	const handleNavClick = (itemLabel: string) => {
		if (itemLabel !== 'CV') {
			setIsOpen((prev) => ({ ...prev, menu: false }));
		} else {
			setIsOpen((prev) => ({ ...prev, cv: !prev.cv }));
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
			if (e.key === 'Escape') {
				setIsOpen({ menu: false, cv: false });
			}
		};

		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen.menu]);

	const handleMenuKeyDown = useCallback((e: KeyboardEvent<HTMLUListElement>) => {
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

	return (
		<section aria-label="Mobile menu" role="navigation" id="mobile-menu-wrapper">
			<Button
				ref={menuToggleRef}
				variant="ghost"
				aria-expanded={isOpen.menu}
				aria-controls="mobile-menu"
				aria-label="Toggle mobile menu"
				onClick={() => setIsOpen((prev) => ({ ...prev, menu: !prev.menu }))}
				className={`fixed right-1 top-4 z-50 flex h-fit w-fit flex-col text-yellow-400 transition-transform hover:text-yellow-500 focus-visible:text-yellow-500 ${isOpen.menu ? 'scale-115' : 'scale-150'} hover:bg-transparent`}
			>
				<MLetter mode="button" size={30} />
			</Button>

			<AnimatePresence>
				{isOpen.menu ? (
					<motion.ul
						ref={menuPanelRef}
						key="mobile-menu"
						id="mobile-menu"
						role="menu"
						aria-label="Mobile navigation menu"
						tabIndex={-1}
						onKeyDown={handleMenuKeyDown}
						initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 1 }}
						animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
						exit={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }}
						transition={{ duration: 0.35, ease: easeInOut, type: 'tween' }}
						className="fixed inset-0 z-40 flex flex-col gap-4 overflow-y-auto bg-[#000905] px-4 pt-24 text-green-400"
					>
						{showLanguageSwitcher ? (
							<li className="flex w-full justify-start" role="none">
								<LanguageSwitcher />
							</li>
						) : null}

						{array.map((item, index) => (
							<li
								key={index}
								ref={item.label === 'CV' ? cvRowRef : undefined}
								role="none"
								className="relative flex h-[2rem] w-full items-center justify-start gap-4 whitespace-nowrap pl-1 font-jakarta font-semibold tracking-wide"
							>
								<NavLink
									pathName={item.path as string}
									variant={item.variant}
									title={t(`mainMenu.${item.label}`)}
									aria-label={t(`mainMenu.${item.label}`)}
									role="menuitem"
									aria-haspopup={item.label === 'CV' ? 'menu' : undefined}
									aria-expanded={item.label === 'CV' ? isOpen.cv : undefined}
									onClick={() => handleNavClick(item.label)}
								>
									{`${index + 1}`}.&nbsp;{t(`mainMenu.${item.label}`)}
								</NavLink>

								{item.label === 'CV' && isOpen.cv ? <CvSelectorWrapper cvLinksAsMenuItems /> : null}
							</li>
						))}
						<li className="border-t-[1px] border-dotted border-green-300/25 pt-5 text-slate-200" role="none">
							<ContactItems />
						</li>
					</motion.ul>
				) : null}
			</AnimatePresence>
		</section>
	);
}
