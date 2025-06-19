'use client';

import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

import { type NavLinkProps } from "@/types/navLinkTypes";

export default function NavLink({ children, pathName, linkClass, isActive, activeClass, variant, title, onClick }: NavLinkProps) {

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
                    spy={false}
                    onClick={onClick as unknown as () => void}
                >
                    {children}
                </ScrollLink>
            )
        case 'project':
            return <Link
                href={pathName ?? ''}
                className={finalClassName}
                title={title}
                onClick={onClick}
            >
                {children}
            </Link>
        case 'external':
            return (
                <a
                    href={pathName}
                    className={finalClassName}
                    title={title}
                    onClick={onClick}
                >
                    {children}
                </a>
            )
    }
}


