interface Option {
	value: string;
	label: string;
	ariaLabel: string;
}

export const courseCatArray: Option[] = [
	{ value: 'Security', label: 'Security', ariaLabel: 'Security' },
	{ value: 'SEO', label: 'SEO', ariaLabel: 'SEO' },
	{ value: 'WebDev', label: 'WebDev', ariaLabel: 'WebDev' },
];

export const projectCatArray: Option[] = [
	{ value: 'FullStack', label: 'FullStack', ariaLabel: 'FullStack' },
	{ value: 'Frontend', label: 'Frontend', ariaLabel: 'Frontend' },
	{ value: 'Backend', label: 'Backend', ariaLabel: 'Backend' },
];

export const difficultyArray: Option[] = [
	{ value: 'junior', label: 'junior', ariaLabel: 'Junior' },
	{ value: 'regular', label: 'regular', ariaLabel: 'Regular' },
	{ value: 'senior', label: 'senior', ariaLabel: 'Senior' },
];
