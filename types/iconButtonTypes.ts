import { type ReactNode, ComponentProps } from 'react';
import { Button } from '@/components/ui/button';

import { type GA4Event } from '@/types/ga4-types';

export type IconButtonType = {
	iconCode?: string;
	redirectPath?: string;
	children?: ReactNode;
	iconClass?: string;
	iconColor?: string;
	gaEvent?: GA4Event;
	title?: string;
	onClick?: () => void;
} & ComponentProps<typeof Button>;
