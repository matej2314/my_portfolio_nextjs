'use client';

import { type ReactNode, ComponentProps } from "react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { Icon } from '@iconify/react';

type IconButtonType = {
    iconCode: string;
    redirectPath?: string;
    children?: ReactNode;
    iconClass?: string;
} & ComponentProps<typeof Button>

export default function IconButton({ iconCode, children, redirectPath, iconClass, ...props }: IconButtonType) {

    const router = useRouter();

    return (
        <Button
            type="button"
            onClick={() => router.push(redirectPath as string)}
            {...props}
        >
            {children}
            <Icon className={iconClass} icon={iconCode} />
        </Button>
    )
}