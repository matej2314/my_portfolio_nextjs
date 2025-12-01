
export type Variant = 'home' | 'project' | 'external';

export type MenuItem = {
	path?: string | '';
	label: string;
	variant: Variant;
};

export type ControlMenuItem = {
	key: string;
	label: string;
	icon: string;
	actions: string[] | [];
};

export const homeMenuArray: MenuItem[] = [
	{ path: '#aboutSection', label: 'About', variant: 'home' },
	{ path: '#skillsSection', label: 'Skills', variant: 'home' },
	{ path: '#certsSection', label: 'Courses', variant: 'home' },
	{ path: '#projectsSection', label: 'Projects', variant: 'home' },
	// { path: '', label: 'Blog', variant: 'home' },
	{ path: '#contactSection', label: 'Contact', variant: 'home' },
	{ path: '', label: 'Resume', variant: 'project' },
];

export const getProjectMenuArray = (github: string, demo: string): MenuItem[] => {
	return [
		{ path: '/home', label: 'Home', variant: 'project' },
		{ path: demo, label: 'Demo', variant: 'external' },
		{ path: github, label: 'Github', variant: 'external' },
		{ path: '?modal=contact', label: 'Contact', variant: 'project' },
		{ path: '', label: 'Resume', variant: 'project' },
	];
};

export const blogMenuArray: MenuItem[] = [
	{ path: '/home', label: 'Home', variant: 'project' },
	{ path: '/home/blog', label: 'Blog', variant: 'project' },
];

export const controlMenuArray: ControlMenuItem[] = [
	{ key: 'about', label: 'About', icon: 'icon-park-outline:me', actions: ['add', 'manage'] },
	{ key: 'experience', label: 'Experience', icon: 'bi:briefcase', actions: ['add', 'manage']},
	{ key: 'courses', label: 'Courses', icon: 'oui:training', actions: ['add', 'manage'] },
	{ key: 'projects', label: 'Projects', icon: 'grommet-icons:projects', actions: ['add', 'manage'] },
	{ key: 'skills', label: 'Skills', icon: 'game-icons:skills', actions: ['add', 'manage'] },
	{ key: 'blog', label: 'Blog', icon: 'icomoon-free:blog', actions: ['add', 'manage'] },
	{ key: 'resume', label: 'Resume', icon: 'mdi:resume', actions: ['add'] },
];
