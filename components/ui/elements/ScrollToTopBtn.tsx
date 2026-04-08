'use client';

import IconButton from './IconButton';

import { useActiveSection } from '@/hooks/useActiveSection';

import { sections } from '@/lib/arrays/homePageSectionsArr';

const scrollToTopBtnClass =
	'fixed bottom-[3.5rem] right-[5vw] z-[1] h-8 w-8 rounded-full bg-yellow-300 text-slate-900 transition-opacity duration-300 hover:bg-yellow-400 focus-visible:bg-yellow-400 active:bg-yellow-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none';

export default function ScrollToTop() {
	const section = useActiveSection(sections) as string;
	const scroll = section !== 'baseSection';

	return (
		<IconButton
			iconCode="mingcute:arrow-up-fill"
			iconClass="size-4"
			redirectPath="#baseSection"
			title="Scroll to top"
			aria-label="Scroll to top of page"
			aria-hidden={!scroll}
			tabIndex={scroll ? 0 : -1}
			className={`${scrollToTopBtnClass} ${scroll ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
		/>
	);
}
