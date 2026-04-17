export type AboutMetricId = 'years' | 'projects' | 'coreFramework' | 'english';

export type AboutMetricConfig = {
	id: AboutMetricId;
	stat: string;
};

export type AboutMetricDisplay = {
	stat: string;
	label: string;
};
