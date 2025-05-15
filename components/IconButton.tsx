'use client';

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Icon } from '@iconify/react';

import { type IconButtonType } from "@/types/iconButtonTypes";

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