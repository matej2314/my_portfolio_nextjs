'use client';

import { Badge } from "./ui/badge";

export interface BadgeItem {
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    badgeClass?: string;
};

type BadgeListProps = {
    items: BadgeItem[];
};

export default function BadgeList({ items, ...props }: BadgeListProps) {
    return (
        <div className="flex flex-nowrap gap-3">
            {items.map((item) => (
                <Badge
                    key={item.label}
                    variant={item.variant ?? 'default'}
                    className={item.badgeClass || 'bg-slate-200 text-slate-950 border-2 border-green-500'}
                >
                    {item.label}
                </Badge>
            ))}
        </div>
    )
}