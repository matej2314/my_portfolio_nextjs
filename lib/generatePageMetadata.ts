import { getProject } from '@/actions/projects';
import { getBlogPost } from '@/actions/blogPosts';

import { type Metadata } from 'next';

interface PageMetadata {
	title: string;
	description: string;
}

export const basicMetadata = {
	icons: {
		icon: '/favicon.svg',
		shortcut: '/favicon.svg',
	},
	metadataBase: new URL('https://msliwowski.net'),
	openGraph: {
		url: 'https://msliwowski.net',
		siteName: 'msliwowski.net',
	},
	authors: [{ name: 'Mateusz Śliwowski', url: 'https://msliwowski.net' }],
	creator: 'Mateusz Śliwowski',
	publisher: 'Mateusz Śliwowski',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
};

type TypeProps = 'page' | 'project' | 'blog';

export async function generatePageMetadata(type: TypeProps, id?: string | null, pageData?: PageMetadata | undefined): Promise<Metadata> {
	switch (type) {
		case 'project':
			const projectData = await getProject(id as string);

			if ('error' in projectData) {
				return { title: 'Project not found', ...basicMetadata };
			}

			const projectName = projectData.project.project_name;

			return {
				title: `${projectName} | msliwowski.net`,
				description: `Project ${projectName} details page.`,
				...basicMetadata,
			};
		case 'blog':
			const postData = await getBlogPost(id as string);

			if ('error' in postData) {
				return { title: 'Blog post not found', ...basicMetadata };
			}
			return {
				title: `${postData.post.post_title} | msliwowski.net`,
				description: `Blog post ${postData.post.post_title} details page.`,
				...basicMetadata,
			};
		case 'page':
			if (!pageData) {
				return {
					title: 'msliwowski.net | WebDev, SEO, Security',
					description: 'Webdev, SEO, Security',
					...basicMetadata,
				};
			}

			return {
				title: pageData.title,
				description: pageData.description,
				...basicMetadata,
			};
	}
}
