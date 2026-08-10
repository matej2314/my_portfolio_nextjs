import { type ReactNode } from 'react';
import { type Metadata } from 'next';

import FloatingContactBox from '@/components/floating-contact-box/FloatingContactBox';

export const metadata: Metadata = {
	title: 'msliwowski.net | WebDev, SEO, Security',
	description: 'Webdev, SEO, Security',
};

export default function DetailsPageLayout({ children }: { children: ReactNode }) {
	return (
		<div id='main-content' tabIndex={-1} className='relative flex min-h-[100dvh] w-full min-w-0 flex-col bg-surface-0 pb-10 pt-0 no-scrollbar outline-none'>
			<div className='mx-auto flex w-full min-w-0 max-w-none flex-1 flex-col'>{children}</div>
			<FloatingContactBox />
		</div>
	);
}
