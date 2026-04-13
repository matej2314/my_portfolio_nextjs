import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	poweredByHeader: false,
	generateBuildId: async () => {
		return `build-${Date.now()}`
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
