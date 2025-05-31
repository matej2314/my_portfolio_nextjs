'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useActiveSection(sectionIds: string[]) {
	const [activeId, setActiveId] = useState<string | null>(null);
	const path = usePathname();

	useEffect(() => {
		if (path !== '/home') return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setActiveId(entry.target.id);
				}
			},
			{
				rootMargin: '0px 0px -50% 0px',
				threshold: 0.3,
			}
		);

		const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

		elements.forEach(el => observer.observe(el!));

		return () => {
			elements.forEach(el => observer.unobserve(el!));
		};
	}, [sectionIds, path]);

	useEffect(() => {
		if (path === '/home') {
			setActiveId(null);
		}
	}, [path]);

	return activeId;
}
