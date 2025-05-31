'use client';

import { SidebarHeader } from "@/components/ui/sidebar";
import { type ReactNode } from "react";

type SidebarHeaderProps = {
    children: ReactNode;
    className: string;
}

export default function SidebarHeaderElement({ children, className }: SidebarHeaderProps) {

    return <SidebarHeader
        className={className}
    >
        {children}
    </SidebarHeader>
}