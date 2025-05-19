'use client';

import Link from "next/link";
import { type NavLinkType } from "@/types/navLinkTypes";


type NavLinkProps = NavLinkType & {
    isActive?: boolean;
    activeClass?: string;
}


export default function NavLink({ children, pathName, linkClass, isActive, activeClass }: NavLinkProps) {

    const baseClass = linkClass ?? "w-full h-full flex justify-center items-center hover:text-green-500/80";

    const finalClassName = `${baseClass} ${isActive && activeClass ? activeClass : ''}`;

    return (
        <Link
            href={pathName}
            className={finalClassName}
            title={pathName}
        >
            {children}
        </Link>
    )
}