'use client';

import Link from "next/link";

import ExternalLink from "./ExternalLink";

import { scrollToSection } from '@/lib/utils/keyboard-navigation';

import { type NavLinkProps } from "@/types/navLinkTypes";
import { type MouseEvent } from "react";

export default function NavLink({ children, pathName, linkClass, isActive, activeClass, variant, title, onClick, 'aria-label': ariaLabel, role, 'aria-expanded': ariaExpanded, 'aria-haspopup': ariaHaspopup, tabIndex }: NavLinkProps & { 'aria-label'?: string }) {

    const baseClass = linkClass ?? "flex h-full w-full cursor-pointer items-center justify-start text-ink-1 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-brand active:text-brand";

    const finalClassName = `${baseClass} ${isActive && activeClass ? activeClass : ''}`;

    const homeHref = pathName?.startsWith('#') || pathName ? (pathName ?? '') : '#';

    const handleHomeClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (pathName?.startsWith('#')) {
            e.preventDefault();
            const id = pathName.slice(1);
            scrollToSection(id);
        } else if (!pathName || pathName === '') {
            e.preventDefault();
        }
        onClick?.(e)
    };

    switch (variant) {
        case 'home':
            return <Link
                href={homeHref}
                className={finalClassName}
                title={title}
                aria-label={ariaLabel}
                role={role}
                aria-expanded={ariaExpanded}
                aria-haspopup={ariaHaspopup}
                tabIndex={tabIndex}
                onClick={handleHomeClick}
            >
                {children}
            </Link>
        case 'project':
            return <Link
                href={pathName ?? ''}
                className={finalClassName}
                title={title}
                aria-label={ariaLabel}
                role={role}
                aria-expanded={ariaExpanded}
                aria-haspopup={ariaHaspopup}
                tabIndex={tabIndex}
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
                    aria-label={ariaLabel}
                    role={role}
                    aria-expanded={ariaExpanded}
                    aria-haspopup={ariaHaspopup}
                    tabIndex={tabIndex}
                    onClick={onClick as () => void}
                >
                    {children}
                </ExternalLink>
            )
    }
}


