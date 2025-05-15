'use client';

import { ReactNode } from "react";
import Link from "next/link";

import { type NavLinkType } from "@/types/navLinkTypes";



export default function NavLink({ children, pathName, linkClass }: NavLinkType) {

    const linkClassName = linkClass ? linkClass : "w-full h-full flex justify-center items-center hover:text-green-500/80";

    return (
        <Link
            href={pathName}
            className={linkClassName}
        >
            {children}
        </Link>
    )
}