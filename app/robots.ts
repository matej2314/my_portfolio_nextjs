import { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/config/app.config';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/control/', '/api/', '/_next/', '/admin/'],
		},
		sitemap: `${APP_CONFIG.analytics.BASE_URL || 'https://msliwowski.net'}/sitemap.xml`,
	};
}
