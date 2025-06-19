'use client';

import IconButton from "@/components/ui/elements/IconButton";


export default function SidebarMenuList() {

    return (
        <ul className="w-full h-full flex flex-col items-center justify-center gap-1">
            <li className="w-[15rem] h-fit flex justify-center items-center rounded-md py-3 hover:bg-green-600/60">
                <IconButton
                    iconCode="material-symbols:home-outline"
                    className="bg-transparent hover:bg-transparent flex flex-row-reverse text-lg"
                    iconClass="hover:bg-green-700"
                >
                    Home
                </IconButton>
            </li>
            <li className="w-[15rem] h-fit flex justify-center items-center rounded-md py-3 px-2 hover:bg-green-600/60">
                <IconButton
                    className="bg-transparent hover:bg-transparent flex flex-row-reverse text-lg"
                    iconCode="icon-park-outline:me"
                >
                    About
                </IconButton>
            </li>
            <li className="w-[15rem] h-fit flex justify-center items-center rounded-md py-3 px-2 hover:bg-green-600/60">
                <IconButton
                    className="bg-transparent hover:bg-transparent flex flex-row-reverse text-lg"
                    iconCode="oui:training"
                >
                    Courses
                </IconButton>
            </li>
            <li className="w-[15rem] h-fit flex justify-center items-center rounded-md py-3 px-2 hover:bg-green-600/60">
                <IconButton
                    className="bg-transparent hover:bg-transparent flex flex-row-reverse text-lg"
                    iconCode="grommet-icons:projects"
                >
                    Projects
                </IconButton>
            </li>
            <li className="w-[15rem] h-fit flex justify-center items-center rounded-md py-3 px-2 hover:bg-green-600/60">
                <IconButton
                    className="bg-transparent hover:bg-transparent flex flex-row-reverse text-lg"
                    iconCode="game-icons:skills"
                >
                    Skills
                </IconButton>
            </li>
            <li className="w-[15rem] h-fit flex justify-center items-center rounded-md py-3 px-2 hover:bg-green-600/60">
                <IconButton
                    className="bg-transparent hover:bg-transparent flex flex-row-reverse text-lg"
                    iconCode="icomoon-free:blog"
                >
                    Blog
                </IconButton>
            </li>
            <li className="w-[15rem] h-fit flex justify-center items-center rounded-md py-3 px-2 hover:bg-green-600/60">
                <IconButton
                    className="bg-transparent hover:bg-transparent flex flex-row-reverse text-lg"
                    iconCode="mdi:resume"
                >
                    Resume
                </IconButton>
            </li>
            <li className="w-[15rem] h-fit flex justify-center items-center rounded-md py-3 px-2 hover:bg-green-600/60">
                <IconButton
                    className="bg-transparent hover:bg-transparent flex flex-row-reverse text-lg"
                    iconCode="tabler:home-stats"
                >
                    Stats
                </IconButton>
            </li>
        </ul>
    )
}