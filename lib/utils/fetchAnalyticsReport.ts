import { type ProcessedAnalyticsData } from '@/types/ga4-types';

export const fetchAnalyticsReport = async (onError: (data: string) => void, onSuccess: (data: ProcessedAnalyticsData) => void, onLoading: (data: boolean) => void) => {
	try {
		const response = await fetch('/api/analytics/summary');

		if (!response.ok) {
			const errorData = await response.text();
			onError(errorData);
			throw new Error(errorData);
		}

		const data: ProcessedAnalyticsData = await response.json();

		onSuccess(data);
	} catch (error: unknown) {
		if (error instanceof Error) {
			onError(error.message);
		} else {
			onError('An unknown error occurred');
		}
	} finally {
		onLoading(false);
	}
};
