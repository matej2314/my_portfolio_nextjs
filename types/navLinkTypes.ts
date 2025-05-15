import { type ReactNode } from "react";

export type NavLinkType = {
    children?: ReactNode;
    pathName: string;
    linkClass?: string;
};