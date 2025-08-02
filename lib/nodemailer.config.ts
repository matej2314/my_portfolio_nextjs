import nodemailer, { type Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { APP_CONFIG } from '@/config/app.config';

export const transporter: Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
	host: APP_CONFIG.nodemailer.host,
	port: APP_CONFIG.nodemailer.port,
	secure: true,
	auth: {
		user: APP_CONFIG.nodemailer.auth.user,
		pass: APP_CONFIG.nodemailer.auth.pass,
	},
} as SMTPTransport.Options);

export const sendMail = async (data: { to: string | undefined; subject: string; html: string }) => {
	return transporter.sendMail({
		from: 'mateo2314@msliwowski.net',
		to: data.to,
		subject: data.subject,
		html: data.html,
	});
};
