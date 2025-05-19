'use client';

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: '0px 0px -50% 0px',
                threshold: 0.3
            }
        );

        const elements = sectionIds
            .map(id => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];
        
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, [sectionIds]);

    return activeId;
}