'use client';

import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

import { type NavLinkType } from "@/types/navLinkTypes";

type NavLinkProps = NavLinkType & {
    isActive?: boolean;
    activeClass?: string;
    variant: 'home' | 'project' | 'external';
    title: string
}

export default function NavLink({ children, pathName, linkClass, isActive, activeClass, variant, title }: NavLinkProps) {

    const baseClass = linkClass ?? "w-full h-full flex justify-center items-center hover:text-green-500/80 active:text-green-500/80 cursor-pointer";

    const finalClassName = `${baseClass} ${isActive && activeClass ? activeClass : ''}`;

    switch (variant) {
        case 'home':
            return (
                <ScrollLink
                    to={pathName.replace('#', '')}
                    smooth={true}
                    offset={pathName === '#baseSection' ? -60 : 0}
                    duration={80}
                    className={finalClassName}
                    title={title}
                    spy={true}
                >
                    {children}
                </ScrollLink>
            )
        case 'project':
            return <Link
                href={pathName ?? undefined}
                className={finalClassName}
                title={title}
            >
                {children}
            </Link>
        case 'external':
            return (
                <a
                    href={pathName}
                    className={finalClassName}
                    title={title}
                >
                    {children}
                </a>
            )
    }
}


