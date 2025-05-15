import nodemailer, { type Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const transporter: Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
} as SMTPTransport.Options);

export const sendMail = async (data: {
    to: string | undefined
    subject: string;
    html: string;
}) => {
    return transporter.sendMail({
        from: 'kontakt@msliwowski.net',
        to: data.to,
        subject: data.subject,
        html: data.html
    })
}