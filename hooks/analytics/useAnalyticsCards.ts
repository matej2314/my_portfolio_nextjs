import { useMemo } from 'react';
import { AnalyticsSummary } from '@/types/ga4-types';

interface AnalyticsCardData {
	title: string;
	key: keyof AnalyticsSummary;
	value: string;
}

export function useAnalyticsCards(analyticsData: AnalyticsSummary | null): AnalyticsCardData[] {
	return useMemo(() => {
		if (!analyticsData) return [];

		const analyticsCardsConfig = [
			{ title: "Total Users:", key: "totalUsers" as keyof AnalyticsSummary },
			{ title: "Total Page Views:", key: "totalPageViews" as keyof AnalyticsSummary },
			{ title: "Total CV Downloads:", key: "totalDownloads" as keyof AnalyticsSummary },
			{ title: "Total Contacts:", key: "totalContacts" as keyof AnalyticsSummary },
			{ title: "Total Projects Views:", key: "totalProjectViews" as keyof AnalyticsSummary },
			{ title: "Engagement Rate:", key: "engagementRate" as keyof AnalyticsSummary },
		];

		return analyticsCardsConfig.map(({ title, key }) => ({
			title,
			key,
			value: analyticsData[key]?.toString() || '0',
		}));
	}, [analyticsData]);
} 