import { verifyCookie } from "@/lib/auth"
import { redirect } from "next/navigation";

import { dataCounter } from "@/actions/dataCounter";

import DashboardDataBox from "@/components/control-panel-components/DashboardDataBox";

export default async function DashboardPage() {

    const session = await verifyCookie();
    const counter = await dataCounter();

    if (!session) {
        redirect('/control');
    };

    const formatHeader = (key: string) => {
        // np. "projectsCount" -> "Projects"
        return key.replace('Count', '').replace(/([A-Z])/g, ' $1').trim().replace(/^./, s => s.toUpperCase());
    };

    return (
        <main className="relative w-full h-full rounded-md flex flex-col gap-3 items-start dark-blue-gradient border-2 border-blue-950 pt-3">
            <ul className="absolute w-full h-1/2 flex justify-around">
                {Object.entries(counter).map(([key, value]) => (
                    <DashboardDataBox
                        key={key}
                        header={formatHeader(key)}
                        data={value}

                    />
                ))}
            </ul>
        </main>
    )
}