export type MenuItem = {
	path?: string;
	label: string;
	variant: 'home' | 'project' | 'external';
};

export const homeMenuArray: MenuItem[] = [
	{ path: '#aboutSection', label: 'About', variant: 'home' },
	{ path: '#skillsSection', label: 'Skills', variant: 'home' },
	{ path: '#certsSection', label: 'Courses', variant: 'home' },
	{ path: '#projectsSection', label: 'Projects', variant: 'home' },
	// { path: '', label: 'Blog', variant: 'home' },
	{ path: '#contactSection', label: 'Contact', variant: 'home' },
	{ path: '#', label: 'Resume', variant: 'project' },
];

export const getProjectMenuArray = (github: string, demo: string): MenuItem[] => {
	return [
		{ path: '/home', label: 'Home', variant: 'project' },
		{ path: demo, label: 'Demo', variant: 'external' },
		{ path: github, label: 'Github', variant: 'external' },
		{ path: '?modal=contact', label: 'Contact', variant: 'project' },
		{ path: '#', label: 'Resume', variant: 'project' },
	];
};

export const blogMenuArray: MenuItem[] = [
	{ path: '/home', label: 'Home', variant: 'project' },
	{ path: '/home/blog', label: 'Blog', variant: 'project' },
];
