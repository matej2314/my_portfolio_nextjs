import { type ReactNode, ComponentProps } from 'react';
import { Button } from '@/components/ui/button';

import { type GAEvent } from '@/lib/google-analytics/gtag';

export type IconButtonType = {
	iconCode?: string;
	redirectPath?: string;
	children?: ReactNode;
	iconClass?: string;
	iconColor?: string;
	gaEvent?: GAEvent;
	title?: string;
	onClick?: () => void;
} & ComponentProps<typeof Button>;
