'use client';

import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { type NavLinkType } from "@/types/navLinkTypes";


type NavLinkProps = NavLinkType & {
    isActive?: boolean;
    activeClass?: string;
}

export default function NavLink({ children, pathName, linkClass, isActive, activeClass }: NavLinkProps) {

    const path = usePathname();
    const isHome = !path.startsWith('/home/project');

    const baseClass = linkClass ?? "w-full h-full flex justify-center items-center hover:text-green-500/80 active:text-green-500/80 cursor-pointer";

    const finalClassName = `${baseClass} ${isActive && activeClass ? activeClass : ''}`;


    if (isHome) {
        return (
            <ScrollLink
                to={pathName.replace('#', '')}
                smooth={true}
                offset={pathName === '#baseSection' ? -60 : 0}
                duration={80}
                className={finalClassName}
                title={pathName}
                spy={true}
            >
                {children}
            </ScrollLink>
        )
    } else {
        return <Link
            href={`/home/${pathName}`}
            className={finalClassName}
        >
            {children}
        </Link>
    }

}


