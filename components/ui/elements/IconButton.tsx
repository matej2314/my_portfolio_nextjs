'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../button';
import { Icon } from '@iconify/react';

import { event } from '@/lib/google-analytics/gtag';
import { scrollToSection } from '@/lib/utils/keyboard-navigation';

import { type IconButtonType } from '@/types/iconButtonTypes';

export default function IconButton({ iconCode, children, redirectPath, iconClass, title, onClick, gaEvent, ...props }: IconButtonType) {
	const router = useRouter();

	const handleClick = () => {
		if (onClick) {
			if (gaEvent) {
				event(gaEvent);
			}
			onClick();
		} else if (redirectPath) {
			router.push(redirectPath);
		}
	};

	if (redirectPath?.startsWith('#')) {
		const handleHashClick = () => {
			if (onClick) {
				if (gaEvent) {
					event(gaEvent);
				}
				onClick();
			}
			const id = redirectPath.slice(1);
			scrollToSection(id);
		};

		return (
			<Button type="button" onClick={handleHashClick} title={title} {...props} aria-label={props['aria-label'] ?? title}>
				{children}
				{iconCode ? <Icon className={iconClass} icon={iconCode as string} /> : null}
			</Button>
		);
	}

	return (
		<Button type="button" onClick={handleClick} title={title} {...props} aria-label={props['aria-label'] ?? title}>
			{children}
			{iconCode ? <Icon className={iconClass} icon={iconCode as string} /> : null}
		</Button>
	);
}
