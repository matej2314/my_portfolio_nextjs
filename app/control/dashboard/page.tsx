import { verifyCookie } from "@/lib/auth"
import { redirect } from "next/navigation";

import { dataCounter } from "@/actions/dataCounter";
import { formatHeader } from "@/lib/utils";

import DashboardDataBox from "@/components/control-panel-components/DashboardDataBox";


export default async function DashboardPage() {

    const session = await verifyCookie();
    const counter = await dataCounter();

    if (!session) {
        redirect('/control');
    };

    return (
        <main className="w-full h-full flex justify-center items-start">
            <ul className="w-full h-fit  flex justify-around pt-3">
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