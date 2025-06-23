import { type ReactNode } from "react";

export interface BlogPostCardProps {
    title: string;
    lead: string;
    date: string;
    imageSrc: string;
    imageAlt: string;
    isoDate: string;
    buttonSlot?: ReactNode;
}

export interface BlogPostProps {
    id: string;
    title?: string;
    lead?: string;
    date?: Date;
    content?: string;
    imageName?: string;
    postClassName?: string;
}