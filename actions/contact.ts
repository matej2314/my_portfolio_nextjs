'use server';

import { sendMail } from '@/lib/nodemailer';
import { contactSchema } from '@/lib/zod-schemas/contactSchema';

export async function contactMe(prevState: any, formData: FormData) {
	const contactObject = {
		client: formData.get('client-name'),
		email: formData.get('client-mail'),
		subject: formData.get('msg-subject'),
		content: formData.get('msg-content'),
	};

	const validatedContactObj = contactSchema.safeParse(contactObject);

	if (!validatedContactObj.success) {
		return { error: `Invalid input data. : ${JSON.stringify(validatedContactObj.error.flatten())}` };
	}

	try {
		await sendMail({
			to: process.env.DEL_MAIL as string,
			subject: `Nowa wiadomość od użytkownika ${validatedContactObj.data.client}`,
			html: `
            Wiadomość od użytkownika: ${validatedContactObj.data.client}
            Adres e-mail nadawcy: ${validatedContactObj.data.email}
            Temat: ${validatedContactObj.data.subject}
            Treść wiadomości:
            ${validatedContactObj.data.content}
            `,
		});

		return { success: 'Message sent' };
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { error: String(error) };
		}
		return { error: 'Unexpected error' };
	}
}
