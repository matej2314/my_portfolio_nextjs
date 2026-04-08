export type AboutMetricId = 'years' | 'projects' | 'coreFramework' | 'ide';

export type AboutMetricConfig = {
	id: AboutMetricId;
	stat: string;
};

export type AboutMetricDisplay = {
	stat: string;
	label: string;
};
