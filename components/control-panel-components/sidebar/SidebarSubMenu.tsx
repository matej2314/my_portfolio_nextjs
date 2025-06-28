'use client';

import NavLink from "@/components/links/NavLink";

export default function SidebarSubMenu({ actions, keyLabel }: { actions: string[], keyLabel: string }) {

    return (
        <ul className="absolute w-[4rem] h-[7rem] border-2 border-green-200/25 rounded-md mt-2 flex flex-col items-center justify-center gap-2 ml-[19rem] z-50 bg-black">
            {actions.map((action, index) => (
                <NavLink
                    key={action}
                    variant="project"
                    pathName={`/control/dashboard/${keyLabel}/${action}`}
                    title={`${keyLabel}-${action}`}
                    linkClass={`w-full h-full flex justify-center items-center py-1 hover:text-green-500 ${index < actions.length - 1 ? 'border-b-[1px] border-dotted border-green-200/25' : null}`}

                >
                    {action}
                </NavLink>
            ))}
        </ul>
    )
}