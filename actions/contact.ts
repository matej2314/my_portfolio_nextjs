'use server';

import { sendMail } from '@/lib/nodemailer';

export async function contactMe(prevState: any, formData: FormData) {
    const client = formData.get("client-name");
    const email = formData.get("client-mail");
    const subject = formData.get("msg-subject");
    const content = formData.get("msg-content");


    if (!client || !subject || !content || !email || !(email as string).includes("@")) {
        return { error: 'Type correct data' };
    }

    try {
        await sendMail({
            to: process.env.DEL_MAIL,
            subject: `Nowa wiadomość od użytkownika ${client}`,
            html: `
            Wiadomość od użytkownika: ${client}
            Adres e-mail nadawcy: ${email}
            Temat: ${subject}
            Treść wiadomości:
            ${content}
            `,
        });

        return { success: 'Message sent' };
    } catch (error) {
        console.error(error);
        return { error: error };
    };
};