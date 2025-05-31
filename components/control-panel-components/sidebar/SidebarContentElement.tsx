'use client';

import { SidebarContent } from "@/components/ui/sidebar";
import { type ReactNode } from "react";

type SidebarContentProps = {
    children: ReactNode;
    className: string;
}

export default function SidebarContentElement({ children, className }: SidebarContentProps) {

    return (
        <SidebarContent
            className={className}
        >
            {children}
        </SidebarContent>
    )
}