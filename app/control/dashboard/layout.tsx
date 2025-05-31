import { type ReactNode } from "react";

import ControlSidebar from "@/components/control-panel-components/sidebar/SidebarMenu";
import { SidebarProvider } from "@/components/ui/sidebar";




export default function DashboardLayout({ children }: { children: ReactNode }) {

    return (
        <section className="w-full h-screen flex items-center justify-center">
            <section className="relative w-[90%] h-[90vh] flex justify-center items-center bg-slate-900 rounded-md text-slate-200">
                <SidebarProvider>
                    <ControlSidebar />
                </SidebarProvider>
                {children}
            </section>
        </section>
    )
}