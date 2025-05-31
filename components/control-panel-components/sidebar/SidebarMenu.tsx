'use client';

import { Sidebar } from "@/components/ui/sidebar";

import SidebarContentElement from "./SidebarContentElement";
import SidebarFooterElement from "./SidebarFooterElement";
import SidebarHeaderElement from "./SidebarHeaderElement";

export default function ControlSidebar() {
    return (
        <Sidebar
            className="absolute w-1/3 h-full flex flex-col justify-center items-center bg-slate-900 text-slate-200 mt-0.5"
            side="left"
            variant="sidebar"
        >
            <SidebarHeaderElement className="bg-slate-900">
                <div className="w-full h-full">
                    <p className="w-full h-full flex justify-center">msliwowski.net - control panel</p>
                </div>
            </SidebarHeaderElement>
            <SidebarContentElement
                className="bg-slate-900"
            >
                <ul className="w-full h-full flex flex-col items-center justify-center gap-4 text-sm">
                    <li className="w-11/12 h-fit flex justify-center items-center border-2 rounded-md border-slate-500 py-3 mb-3 hover:bg-slate-700">Home</li>
                    <li className="w-11/12 h-fit flex justify-center items-center border-2 rounded-md border-slate-500 py-3 hover:bg-slate-700">About</li>
                    <li className="w-11/12 h-fit flex justify-center items-center border-2 rounded-md border-slate-500 py-3 hover:bg-slate-700">Courses</li>
                    <li className="w-11/12 h-fit flex justify-center items-center border-2 rounded-md border-slate-500 py-3 hover:bg-slate-700">Projects</li>
                    <li className="w-11/12 h-fit flex justify-center items-center border-2 rounded-md border-slate-500 py-3 hover:bg-slate-700">Skills</li>
                    <li className="w-11/12 h-fit flex justify-center items-center border-2 rounded-md border-slate-500 py-3 hover:bg-slate-700">Blog</li>
                    <li className="w-11/12 h-fit flex justify-center items-center border-2 rounded-md border-slate-500 py-3 hover:bg-slate-700">Curriculum vitae</li>
                    <li className="w-11/12 h-fit flex justify-center items-center border-2 rounded-md border-slate-500 py-3 hover:bg-slate-700">Stats</li>
                </ul>
            </SidebarContentElement>
            <SidebarFooterElement
                className="bg-slate-900"
            >
                <div className="w-full h-full flex justify-center">
                    <p>Copyright@mateo2314</p>
                </div>
            </SidebarFooterElement>
        </Sidebar>
    )
}