import { getProjects } from '@/actions/projects';
import { getBlogPosts } from '@/actions/blogPosts';
// import { getCache, setCache } from '@/lib/redis/redis';
// import { REDIS_KEYS } from '@/lib/redis/redisKeys';

import { type MetadataRoute } from 'next';

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

	console.log('🔍 Sitemap: Pobieranie projektów...');
	const projectsData = await getProjects();
	console.log('📊 Sitemap: Projekty data:', projectsData);

	const projectPages: SitemapPage[] = [];

	if (!('error' in projectsData)) {
		console.log(`✅ Sitemap: Dodawanie ${projectsData.projects.length} projektów`);
		for (const project of projectsData.projects) {
			projectPages.push({
				url: `${baseUrl}/home/project/${project.id}`,
				lastModified: new Date(project.end_date as Date).toISOString(),
				changeFrequency: 'monthly',
				priority: 0.7,
			});
		}
	} else {
		console.error('❌ Sitemap: Błąd pobierania projektów:', projectsData.error);
	}

	console.log('🔍 Sitemap: Pobieranie postów blogowych...');
	const blogPostsData = await getBlogPosts();
	console.log('📊 Sitemap: Blog posts data:', blogPostsData);

	const blogPages: SitemapPage[] = [];

	if (!('error' in blogPostsData)) {
		console.log(`✅ Sitemap: Dodawanie ${blogPostsData.posts.length} postów blogowych`);
		for (const post of blogPostsData.posts) {
			blogPages.push({
				url: `${baseUrl}/home/blog/${post.id}`,
				lastModified: new Date(post.post_date as Date).toISOString(),
				changeFrequency: 'monthly',
				priority: 0.6,
			});
		}
	} else {
		console.error('❌ Sitemap: Błąd pobierania postów blogowych:', blogPostsData.error);
	}

	const allPages = [...staticPages, ...projectPages, ...blogPages];
	console.log(`🎯 Sitemap: Łącznie ${allPages.length} stron (${staticPages.length} statyczne, ${projectPages.length} projekty, ${blogPages.length} blog)`);

	return allPages as MetadataRoute.Sitemap;
}
