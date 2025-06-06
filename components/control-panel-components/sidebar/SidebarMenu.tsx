'use client';

import SidebarMenuList from "./SidebarMenuList";

export default function ControlSidebar() {
    return (
        <section id="dashboardSidebar" className="overflow-hidden relative w-[20rem] h-full flex flex-col justify-start items-center text-slate-200 rounded-md board-sidebar-gradient border-2 border-blue-950">
            <header id="sidebarHeader" className="w-full h-[3rem] flex justify-center items-center">
                <p className="text-lg font-semibold text-green-500">Dashboard</p>
            </header>
            <section id="sidebarContent" className="pb-3 mt-4 overflow-hidden">
                <SidebarMenuList />
            </section>
        </section>
    )
}