import { type ReactNode } from "react";

import ControlSidebar from "@/components/control-panel-components/sidebar/SidebarMenu";
import { SidebarProvider } from "@/components/ui/sidebar";




export default function DashboardLayout({ children }: { children: ReactNode }) {

    return (
        <section className="w-full h-full flex justify-between">
            <section className="w-full h-full flex justify-start items-start">
                <SidebarProvider>
                    <ControlSidebar />
                </SidebarProvider>
            </section>
            <section className="w-full h-full flex justify-center items-center">
                {children}
            </section>
        </section>
    )
}