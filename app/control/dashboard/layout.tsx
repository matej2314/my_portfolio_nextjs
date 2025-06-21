import { type ReactNode } from "react";

import { verifyCookie } from "@/lib/auth"
import { redirect } from "next/navigation";

import { dataCounter } from "@/actions/dataCounter";
import { formatHeader } from "@/lib/utils";

import ControlSidebar from "@/components/control-panel-components/sidebar/SidebarMenu";
import DashboardDataBox from "@/components/control-panel-components/DashboardDataBox";


export default async function DashboardLayout({ children }: { children: ReactNode }) {

    const session = await verifyCookie();
    const counter = await dataCounter();

    if (!session) {
        redirect('/control');
    };

    return (
        <main className="w-screen max-h-screen h-screen flex justify-center items-center gap-3 overflow-hidden">
            <div className="w-11/12 h-11/12 flex justify-center gap-7">
                <ControlSidebar />
                <section className="w-full h-full flex  flex-col items-center justify-center rounded-md bg-control">
                    <ul className="w-full h-full border-2 border-green-900/25 flex justify-around pt-3">
                        {Object.entries(counter).map(([key, value]) => (
                            <DashboardDataBox
                                key={key}
                                header={formatHeader(key)}
                                data={value}

                            />
                        ))}
                    </ul>
                    {children}
                </section>
            </div>
        </main>
    )
}