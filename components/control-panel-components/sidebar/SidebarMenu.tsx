'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";

export default function ControlSidebar() {
    return (
        <Sidebar className="w-1/3 h-full">
            <SidebarHeader />
            <SidebarContent>
                <p>sidebar</p>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}