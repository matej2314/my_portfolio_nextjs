export type FloatingContactRowKind = 'email' | 'phone' | 'location';

export type ContactSocialKind = 'linkedin' | 'github' | 'facebook';

export type SocialLinkItem = {
	kind: ContactSocialKind;
	icon: string;
	href: string;
	value: string;
};

export type FloatingContactRow = {
	kind: FloatingContactRowKind;
	icon: string;
	href?: string;
	value: string;
};

export type FloatingContactData = {
	photoSrc: string;
	fullName: string;
	contactRows: FloatingContactRow[];
	socialLinks: SocialLinkItem[];
	config: {
		accent: string;
		cardBg: string;
		border: string;
		contactBoxWidth: string;
		chatBoxWidth: string;
		enterDurationBox: number;
		showDelayContactBox: number;
		showDelayChatBox: number;
		calcTuckDuration: (reduced: boolean) => number;
		calcPanelDuration: (reduced: boolean) => number;
		calcRevealDuration: (reduced: boolean) => number;
	}
};
