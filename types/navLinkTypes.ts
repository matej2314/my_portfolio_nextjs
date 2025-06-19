import { type ReactNode, MouseEventHandler, MouseEvent } from 'react';

type NavLinkType = {
	children?: ReactNode;
	pathName: string;
	linkClass?: string;
};

export type NavLinkProps = NavLinkType & {
	isActive?: boolean;
	activeClass?: string;
	variant: 'home' | 'project' | 'external';
	title: string;
	onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
};
