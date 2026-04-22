import FloatingContactBox from '@/components/floating-contact-box/FloatingContactBox';
import FloatingChatBox from '@/components/floating-chat-box/FloatingChatBox';
import ContentContainer from '@/components/ContentContainer';
import HomeContent from '@/components/home-page-components/HomeContent';
import { ProjectEnterTransitionProvider } from '@/context/ProjectEnterTransitionContext';

import { type ReactNode } from 'react';
import { type Metadata } from 'next';

export const metadata: Metadata = {
	title: 'msliwowski.net | WebDev, SEO, Security',
	description: 'Webdev, SEO, Security',
};

export default async function HomePageLayout({ children, projectModal }: { children: ReactNode; projectModal: ReactNode }) {

	return (
		<ContentContainer>
			<main className='flex min-h-screen w-full min-w-0 justify-center bg-[#000805] focus:outline-none focus-visible:outline-none'>
				<ProjectEnterTransitionProvider>
						<HomeContent>{children}</HomeContent>
						{projectModal}
						<FloatingContactBox />
						<FloatingChatBox />
				</ProjectEnterTransitionProvider>
			</main>
		</ContentContainer>
	);
}
