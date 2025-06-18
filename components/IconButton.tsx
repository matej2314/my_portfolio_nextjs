'use client';

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Icon } from '@iconify/react';

import NavLink from "./NavLink";

import { type IconButtonType } from "@/types/iconButtonTypes";

export default function IconButton({ iconCode, children, redirectPath, iconClass, onClick, ...props }: IconButtonType) {

    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (redirectPath) {
            router.push(redirectPath);
        }
    }

    if (redirectPath?.startsWith('#')) {
        return (
            <NavLink
                variant="home"
                pathName={redirectPath}
                title="Scroll to top"
                linkClass="w-fit h-fit flex justify-center items-center"
            >
                <Button
                    type="button" {...props}>
                    {children}
                    <Icon className={iconClass} icon={iconCode as string} />
                </Button>
            </NavLink>
        )
    }

    return (
        <Button
            type="button"
            onClick={handleClick}
            {...props}
        >
            {children}
            <Icon className={iconClass} icon={iconCode as string} />
        </Button>
    )
}