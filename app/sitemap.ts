import { NextResponse } from 'next/server';
import { getProjects } from '@/actions/projects';
import { getBlogPosts } from '@/actions/blogPosts';
// import { getCache, setCache } from '@/lib/redis/redis';
// import { REDIS_KEYS } from '@/lib/redis/redisKeys';

export async function GET() {
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

	const staticPages = [
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
	const projectPages = [];

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
	const blogPages = [];

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

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('')}
</urlset>`;

	// await setCache(REDIS_KEYS.SITEMAP, xml, 3600);
	console.log(`:white_check_mark: Sitemap generated successfully`);
	return new NextResponse(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600, s-maxage=3600',
		},
	});
}
