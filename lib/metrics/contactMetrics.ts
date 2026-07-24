import { APP_CONFIG } from '@/config/app.config';
import { client, register } from '@/lib/metrics/registry';
import type { SendMailType } from '@/lib/nodemailer.config';

const prefix = APP_CONFIG.metrics.prefix;

export const contactFormSubmissionsTotal = new client.Counter({
	name: `${prefix}contact_form_submissions_total`,
	help: 'Contact form submissions',
	labelNames: ['result'] as const,
	registers: [register],
});

export const emailSendTotal = new client.Counter({
	name: `${prefix}email_send_total`,
	help: 'Outbound emails',
	labelNames: ['type', 'status'] as const,
	registers: [register],
});

export const emailSendDurationSeconds = new client.Histogram({
	name: `${prefix}email_send_duration_seconds`,
	help: 'Outbound email send duration',
	labelNames: ['type'] as const,
	buckets: [0.1, 0.25, 0.5, 1, 2.5, 5, 10],
	registers: [register],
});

export function incrementEmailSendTotal(type: SendMailType, status: string): void {
	emailSendTotal.inc({ type, status });
}

export function observeEmailSendDuration(type: SendMailType, duration: number): void {
	emailSendDurationSeconds.observe({ type }, Number(duration) / 1e9);
}

export function incrementContactFormSubmissions(result: string): void {
	contactFormSubmissionsTotal.inc({ result });
}
