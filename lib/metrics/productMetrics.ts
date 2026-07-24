import { APP_CONFIG } from '@/config/app.config';
import { getOrCreateCounter } from './registry';

const prefix = APP_CONFIG.metrics.prefix;

export type DeviceClass = 'desktop' | 'mobile' | 'unknown';

export const pageViewsTotal = getOrCreateCounter({
	name: `${prefix}page_views_total`,
	help: 'Portfolio page views',
	labelNames: ['page', 'device'] as const,
});

export const projectViewsTotal = getOrCreateCounter({
	name: `${prefix}project_views_total`,
	help: 'Project details page views',
	labelNames: ['project_id', 'device'] as const,
});

export const cvDownloadsTotal = getOrCreateCounter({
	name: `${prefix}cv_downloads_total`,
	help: 'CV file downloads from CvSelector',
	labelNames: ['locale', 'device'] as const,
});

export const referenceDownloadsTotal = getOrCreateCounter({
	name: `${prefix}reference_downloads_total`,
	help: 'Reference PDF downloads',
	labelNames: ['reference', 'device'] as const,
});

export const assistantUiOpensTotal = getOrCreateCounter({
	name: `${prefix}assistant_ui_opens_total`,
	help: 'Floating AI chat panel opened',
	labelNames: ['device'] as const,
});

export function observeHomePageView(device: DeviceClass): void {
	pageViewsTotal.inc({ page: 'home', device });
}

export function observeProjectView(projectId: string, device: DeviceClass): void {
	projectViewsTotal.inc({ project_id: projectId, device });
}

export function observeCvDownload(locale: 'pl' | 'en', device: DeviceClass): void {
	cvDownloadsTotal.inc({ locale, device });
}

export function observeReferenceDownload(reference: 'json_crew', device: DeviceClass): void {
	referenceDownloadsTotal.inc({ reference, device });
}
