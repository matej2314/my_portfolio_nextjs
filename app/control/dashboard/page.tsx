import { verifyCookie } from "@/lib/auth"
import { redirect } from "next/navigation";

import { dataCounter } from "@/actions/dataCounter";
import { formatHeader } from "@/lib/utils";

import DataBoxCardElement from "@/components/ui/elements/DataBoxCardElement";
import AnalyticsBox from "@/components/control-panel-components/analytics/AnalyticsBox";


export default async function DashboardPage() {

    const session = await verifyCookie();
    const counter = await dataCounter();

    if (!session) {
        redirect('/control');
    };

    return (
        <main className="w-full h-full flex flex-col justify-start items-center p-4 gap-8">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(counter).map(([key, value]) => (
                    <DataBoxCardElement
                        key={key}
                        header={formatHeader(key)}
                        value={value}
                        suffix={':'}
                    />
                ))}
            </div>
            <div className="w-full max-w-4xl">
                <AnalyticsBox />
            </div>
        </main>
    )
}