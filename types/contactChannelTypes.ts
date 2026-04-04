export type ContactChannelKind = 'email' | 'linkedin' | 'github' | 'facebook';

export type ContactChannelItem = {
	kind: ContactChannelKind;
	label: string;
	pathName: string;
};
