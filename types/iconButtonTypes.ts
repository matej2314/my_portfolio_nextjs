import { type ReactNode, ComponentProps } from "react";
import { Button } from "@/components/ui/button";



export type IconButtonType = {
    iconCode: string;
    redirectPath?: string;
    children?: ReactNode;
    iconClass?: string;
} & ComponentProps<typeof Button>