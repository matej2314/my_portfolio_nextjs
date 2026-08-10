import FloatingContactBox from '@/components/floating-contact-box/FloatingContactBox';
import FloatingChatBox from '@/components/floating-chat-box/FloatingChatBox';
import FloatingActionsDock from '@/components/floating-actions/FloatingActionsDock';
import ContentContainer from '@/components/ContentContainer';
import HomeContent from '@/components/home-page-components/HomeContent';
import { ProjectEnterTransitionProvider } from '@/context/ProjectEnterTransitionContext';
import { FloatingPanelsProvider } from '@/context/FloatingPanelsContext';

import { type ReactNode } from 'react';
import { type Metadata } from 'next';

export const metadata: Metadata = {
	title: 'msliwowski.net | WebDev, SEO, Security',
	description: 'Webdev, SEO, Security',
};

export default async function HomePageLayout({
	children,
	projectModal,
}: {
	children: ReactNode;
	projectModal: ReactNode;
}) {
	return (
		<ContentContainer>
			<main
				id='main-content'
				tabIndex={-1}
				className='flex min-h-[100dvh] w-full min-w-0 justify-center bg-surface-0 outline-none'
			>
				<ProjectEnterTransitionProvider>
					<FloatingPanelsProvider>
						<HomeContent>{children}</HomeContent>
						{projectModal}
						<FloatingContactBox />
						<FloatingChatBox />
						<FloatingActionsDock />
					</FloatingPanelsProvider>
				</ProjectEnterTransitionProvider>
			</main>
		</ContentContainer>
	);
}
