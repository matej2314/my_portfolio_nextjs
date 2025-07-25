import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/control/', '/api/', '/_next/', '/admin/'],
		},
		sitemap: `${process.env.BASE_URL || 'https://msliwowski.net'}/sitemap.xml`,
	};
}
