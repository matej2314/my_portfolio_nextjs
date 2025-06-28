'use client';

import Link from "next/link";

import ExternalLink from "./ExternalLink";

import { type NavLinkProps } from "@/types/navLinkTypes";
import { type MouseEvent } from "react";

export default function NavLink({ children, pathName, linkClass, isActive, activeClass, variant, title, onClick }: NavLinkProps) {

    const baseClass = linkClass ?? "w-full h-full flex justify-center items-center hover:text-green-500/80 active:text-green-500/80 cursor-pointer";

    const finalClassName = `${baseClass} ${isActive && activeClass ? activeClass : ''}`;

    const handleHomeClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (pathName?.startsWith('#')) {
            e.preventDefault();
            const id = pathName.slice(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
        onClick?.(e)
    };

    switch (variant) {
        case 'home':
            return <Link
                href={pathName ?? ''}
                className={finalClassName}
                title={title}
                onClick={handleHomeClick}
            >
                {children}
            </Link>
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
                <ExternalLink
                    href={pathName}
                    className={finalClassName}
                    title={title}
                    onClick={onClick as () => void}
                >
                    {children}
                </ExternalLink>
            )
    }
}


