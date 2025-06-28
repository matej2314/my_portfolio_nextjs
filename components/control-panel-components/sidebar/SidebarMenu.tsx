'use client';

import SidebarMenuList from "./SidebarMenuList";
import NavLink from "@/components/links/NavLink";

export default function ControlSidebar() {
    return (
        <section id="dashboardSidebar" className=" relative w-[20rem] h-full flex flex-col justify-start items-end text-slate-200 rounded-md bg-control-menu border-2 border-green-900/25 z-20">
            <header id="sidebarHeader" className="w-full h-[3rem] flex justify-center items-center">
                <NavLink
                    variant="project"
                    pathName="/control/dashboard"
                    linkClass="text-lg font-semibold text-green-500"
                    title="dashboard"
                >
                    Dashboard
                </NavLink>
            </header>
            <section id="sidebarContent" className="pb-3 mt-4 z-0">
                <SidebarMenuList />
            </section>
        </section>
    )
}