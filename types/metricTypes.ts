export type AboutMetricId = 'years' | 'projects' | 'coreStack' | 'ide';

export type AboutMetricConfig = {
	id: AboutMetricId;
	stat: string;
};

export type AboutMetricDisplay = {
	stat: string;
	label: string;
};
