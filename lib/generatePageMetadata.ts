import { getProject } from '@/actions/projects';
import { getBlogPost } from '@/actions/blogPosts';

import { type Metadata } from 'next';

interface PageMetadata {
	title: string;
	description: string;
}

export const basicMetadata = {
	applicationName: 'msliwowski.net',
	keywords: ['webdev', 'web developer', 'webdevelopment', 'it security', 'websecurity', 'seo', 'search engine optimization'],
	authors: [{ name: 'Mateusz mateo2314 Sliwowski' }],
	creator: 'Mateusz mateo2314 Sliwowski',
	publisher: 'Mateusz Sliwowski',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
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
				return { title: 'Project not found', ...basicMetadata };
			}
			return {
				title: `${postData.post.post_title} | msliwowski.net`,
				description: `Project ${postData.post.post_title} details page.`,
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
