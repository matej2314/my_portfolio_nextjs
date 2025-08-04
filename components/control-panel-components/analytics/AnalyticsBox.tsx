'use client';

import { useAnalyticsCards } from "@/hooks/analytics/useAnalyticsCards";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";

import DataBoxCardElement from "@/components/ui/elements/DataBoxCardElement";
import LoadingComponent from "@/components/LoadingComponent";

export default function AnalyticsBox() {

    const { analyticsData, error, loading } = useAnalyticsData();
    const analyticsCardsData = useAnalyticsCards(analyticsData);

    if (loading) return <LoadingComponent />;

    if (error) {
        return (
            <div className="p-4">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-slate-400 text-center">Analytics</h2>
            {analyticsData && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {analyticsCardsData.map(({ title, value }) => (
                        <DataBoxCardElement
                            key={title}
                            header={title}
                            value={value}
                            suffix={''}
                        />
                    ))}
                </div>
            )}
            {!analyticsData && (
                <div className="flex justify-center items-center h-full">
                    <p className="text-slate-400">No data</p>
                </div>
            )}
        </div>
    )
}