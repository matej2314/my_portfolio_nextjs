'use client';

import { useState, useEffect } from 'react';
import { fetchAnalyticsReport } from '@/lib/utils/fetchAnalyticsReport';
import { type ProcessedAnalyticsData } from '@/types/ga4-types';

export const useAnalyticsData = () => {
	const [analyticsData, setAnalyticsData] = useState<ProcessedAnalyticsData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = () =>
			fetchAnalyticsReport(
				errorData => setError(errorData),
				data => setAnalyticsData(data),
				loading => setLoading(loading)
			);
		fetchData();
	}, []);

	return { analyticsData, error, loading };
};
