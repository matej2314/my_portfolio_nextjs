'use client';

import { useState, useRef } from "react";

import IconButton from "@/components/ui/elements/IconButton";
import SidebarSubMenu from "./SidebarSubMenu";

import { useClickOutside } from "@/hooks/useClickOutside";

import { controlMenuArray } from "@/lib/menuArrays";

export default function SidebarMenuList() {
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
    const listRef = useRef<HTMLUListElement>(null);

    useClickOutside(listRef, () => setExpandedMenu(null));

    const handleMenuClick = (key: string) => {
        setExpandedMenu(expandedMenu === key ? null : key);
    };

    return (
        <ul
            ref={listRef}
            className="w-full h-full flex flex-col items-center justify-center gap-1 z-10"
        >
            {controlMenuArray.map(({ key, label, icon, actions }) => (
                <li
                    key={key}
                    className="relative w-[15rem] h-fit flex justify-center items-center rounded-md py-3 hover:bg-green-600/60">
                    <IconButton
                        iconCode={icon}
                        className="bg-transparent hover:bg-transparent flex flex-row-reverse text-lg"
                        iconClass="hover:bg-green-700"
                        onClick={() => handleMenuClick(key)}
                    >
                        {label}
                    </IconButton>

                    {expandedMenu === key && actions.length > 0 && (
                        <SidebarSubMenu
                            actions={actions}
                            keyLabel={label.toLowerCase()}
                        />
                    )}
                </li>
            ))
            }
        </ul>
    )
}