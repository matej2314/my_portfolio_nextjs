import { getProjects } from '@/actions/projects';
import { getBlogPosts } from '@/actions/blogPosts';
// import { getCache, setCache } from '@/lib/redis/redis';
// import { REDIS_KEYS } from '@/lib/redis/redisKeys';

import { type MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

type SitemapPage = {
	url: string;
	lastModified: string;
	changeFrequency: 'weekly' | 'daily' | 'monthly' | 'always' | 'hourly' | 'yearly' | 'never';
	priority: number;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.BASE_URL || 'https://msliwowski.net';

	// const cachedSitemap = await getCache<string>(REDIS_KEYS.SITEMAP);
	// if (cachedSitemap) {
	// 	return new NextResponse(cachedSitemap, {
	// 		headers: {
	// 			'Content-Type': 'application/xml',
	// 			'Cache-Control': 'public, max-age=3600, s-maxage=3600',
	// 		},
	// 	});
	// }

	const staticPages: SitemapPage[] = [
		{
			url: baseUrl,
			lastModified: new Date().toISOString(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/home`,
			lastModified: new Date().toISOString(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/home/blog`,
			lastModified: new Date().toISOString(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
	];

	const projectsData = await getProjects();

	const projectPages: SitemapPage[] = [];

	if (!('error' in projectsData)) {
		for (const project of projectsData.projects) {
			projectPages.push({
				url: `${baseUrl}/home/project/${project.id}`,
				lastModified: new Date(project.end_date as Date).toISOString(),
				changeFrequency: 'monthly',
				priority: 0.7,
			});
		}
	}

	const blogPostsData = await getBlogPosts();

	const blogPages: SitemapPage[] = [];

	if (!('error' in blogPostsData)) {
		for (const post of blogPostsData.posts) {
			blogPages.push({
				url: `${baseUrl}/home/blog/${post.id}`,
				lastModified: new Date(post.post_date as Date).toISOString(),
				changeFrequency: 'monthly',
				priority: 0.6,
			});
		}
	}

	const allPages = [...staticPages, ...projectPages, ...blogPages];

	return allPages as MetadataRoute.Sitemap;
}
