import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import FloatingContactBox from '@/components/floating-contact-box/FloatingContactBox';
// import FloatingChatBox from '@/components/floating-chat-box/FloatingChatBox';
import ContentContainer from '@/components/ContentContainer';
import HomeContent from '@/components/home-page-components/HomeContent';
import { HomeProjectTransitionProvider } from '@/context/HomeProjectTransitionContext';

import { type ReactNode } from 'react';
import { type Metadata } from 'next';

export const metadata: Metadata = {
	title: 'msliwowski.net | WebDev, SEO, Security',
	description: 'Webdev, SEO, Security',
};

export default async function HomePageLayout({ children, projectModal }: { children: ReactNode; projectModal: ReactNode }) {
	const locale = await getLocale();
	const messages = await getMessages({ locale });

	return (
		<ContentContainer>
			<main className='flex min-h-screen w-full min-w-0 justify-center bg-[#000805]'>
				<HomeProjectTransitionProvider>
					<NextIntlClientProvider messages={messages}>
						<HomeContent>{children}</HomeContent>
						{projectModal}
						<FloatingContactBox />
						{/* <FloatingChatBox /> */}
					</NextIntlClientProvider>
				</HomeProjectTransitionProvider>
			</main>
		</ContentContainer>
	);
}
