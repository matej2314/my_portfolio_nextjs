import { type ReactNode, type AriaRole, MouseEvent } from 'react';

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
	role?: AriaRole;
	'aria-expanded'?: boolean;
	'aria-haspopup'?: boolean | 'menu' | 'dialog' | 'true' | 'false';
	tabIndex?: number;
};
