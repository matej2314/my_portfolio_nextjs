import { useMemo } from 'react';
import { ProcessedAnalyticsData } from '@/types/ga4-types';

interface AnalyticsCardData {
	title: string;
	key: keyof ProcessedAnalyticsData;
	value: string | number;
	formatter?: (value: number) => string;
}

export function useAnalyticsCards(analyticsData: ProcessedAnalyticsData | null): AnalyticsCardData[] {
	return useMemo(() => {
		if (!analyticsData) return [];

		const formatDuration = (seconds: number): string => {
			const minutes = Math.floor(seconds / 60);
			const remainingSeconds = Math.floor(seconds % 60);
			return `${minutes}m ${remainingSeconds}s`;
		};

		const formatPercentage = (value: number): string => {
			return `${(value * 100).toFixed(1)}%`;
		};

		const analyticsCardsConfig: AnalyticsCardData[] = [
			{
				title: 'Total Users',
				key: 'totalUsers' as keyof ProcessedAnalyticsData,
				value: analyticsData.totalUsers.toString(),
			},
			{
				title: 'Total Page Views',
				key: 'totalPageViews' as keyof ProcessedAnalyticsData,
				value: analyticsData.totalPageViews.toString(),
			},
			{
				title: 'Project Views',
				key: 'totalProjectViews' as keyof ProcessedAnalyticsData,
				value: analyticsData.totalProjectViews.toString(),
			},
			{
				title: 'Contact Events',
				key: 'totalContacts' as keyof ProcessedAnalyticsData,
				value: analyticsData.totalContacts.toString(),
			},
			{
				title: 'CV Downloads',
				key: 'totalCvDownloads' as keyof ProcessedAnalyticsData,
				value: analyticsData.totalCvDownloads.toString(),
			},
			{
				title: 'Total Scrolls',
				key: 'totalScrolls' as keyof ProcessedAnalyticsData,
				value: analyticsData.totalScrolls.toString(),
			},
			{
				title: 'User Engagement Events',
				key: 'totalUserEngagement' as keyof ProcessedAnalyticsData,
				value: analyticsData.totalUserEngagement.toString(),
			},
			{
				title: 'Avg Session Duration',
				key: 'averageSessionDuration' as keyof ProcessedAnalyticsData,
				value: formatDuration(analyticsData.averageSessionDuration),
			},
			{
				title: 'Engagement Rate',
				key: 'engagementRate' as keyof ProcessedAnalyticsData,
				value: formatPercentage(analyticsData.engagementRate),
			},
		];

		return analyticsCardsConfig;
	}, [analyticsData]);
}
