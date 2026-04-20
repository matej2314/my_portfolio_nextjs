export type AboutMetricId = 'years' | 'projects' | 'commits' | 'english';

export type AboutMetricConfig = {
	id: AboutMetricId;
	stat: string;
};

export type AboutMetricDisplay = {
	stat: string;
	label: string;
};
