import { SidebarFooter } from "@/components/ui/sidebar";
import { type ReactNode } from "react";

type SidebarFooterProps = {
    children: ReactNode;
    className: string;
}

export default function SidebarFooterElement({ children, className }: SidebarFooterProps) {

    return (
        <SidebarFooter
            className={className}
        >
            {children}
        </SidebarFooter>
    )
}