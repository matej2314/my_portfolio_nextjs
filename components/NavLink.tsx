'use client';

import { ReactNode } from "react";
import Link from "next/link";

export default function NavLink({ children, pathName }: { children: ReactNode, pathName: string }) {

    return (
        <Link
            href={pathName}
            className="w-full h-full flex justify-center items-center hover:text-green-500/80"
        >
            {children}
        </Link>
    )
}