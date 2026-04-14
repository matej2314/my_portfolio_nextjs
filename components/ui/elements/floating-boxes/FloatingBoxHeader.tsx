'use client';

import { type ReactNode, type CSSProperties } from 'react';

interface FloatingBoxHeaderProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}


export default function FloatingBoxHeader({ children, className, style }: FloatingBoxHeaderProps) {

    return (
        <header className={className} style={style}>
            {children}
        </header>
    )

}