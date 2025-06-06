import { type ReactNode } from "react";

import ControlSidebar from "@/components/control-panel-components/sidebar/SidebarMenu";


export default function DashboardLayout({ children }: { children: ReactNode }) {

    return (
        <main className="w-screen h-screen flex justify-center items-center gap-3">
            <div className="w-11/12 h-11/12 flex justify-center gap-7">
                <ControlSidebar />
                <section className="w-full h-full rounded-md">
                    {children}
                </section>
            </div>
        </main>
    )
}