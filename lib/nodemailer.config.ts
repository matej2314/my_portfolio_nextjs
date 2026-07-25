import nodemailer, { type Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { APP_CONFIG } from '@/config/app.config';
import { incrementEmailSendTotal, observeEmailSendDuration } from '@/lib/metrics/contactMetrics';

export type SendMailType = 'contact' | 'auto_reply' | 'other';

export const transporter: Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
	host: APP_CONFIG.nodemailer.host,
	port: APP_CONFIG.nodemailer.port,
	secure: true,
	auth: {
		user: APP_CONFIG.nodemailer.auth.user,
		pass: APP_CONFIG.nodemailer.auth.pass,
	},
	tls: {
		rejectUnauthorized: true,
	},
} as SMTPTransport.Options);

export const sendMail = async (data: { to: string | undefined; subject: string; html: string; type?: SendMailType }) => {
	const type = data.type ?? 'other';
	const startTime = process.hrtime.bigint();
	try {
		const info = await transporter.sendMail({
			from: 'mateo2314@msliwowski.net',
			to: data.to,
			subject: data.subject,
			html: data.html,
		});
		incrementEmailSendTotal(type, 'ok');
		observeEmailSendDuration(type, Number(process.hrtime.bigint() - startTime) / 1e9);
		return info;
	} catch (error) {
		incrementEmailSendTotal(type, 'error');
		observeEmailSendDuration(type, Number(process.hrtime.bigint() - startTime) / 1e9);
		throw error;
	}
};
