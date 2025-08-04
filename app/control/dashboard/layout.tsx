import { type ReactNode } from "react";

import { requireAuth } from "@/lib/auth";
import ControlSidebar from "@/components/control-panel-components/sidebar/SidebarMenu";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    await requireAuth(true);


    return (
        <main className="w-screen max-h-screen h-screen flex justify-center items-center gap-3">
            <div className="w-11/12 h-11/12 flex justify-center gap-7">
                <ControlSidebar />
                <section className="w-full h-full flex  flex-col items-center justify-start rounded-md bg-control border-2 border-green-900/25 gap-4">
                    <section className="w-full h-full flex justify-start overflow-y-auto no-scrollbar">
                        {children}
                    </section>
                </section>
            </div>
        </main>
    )
}