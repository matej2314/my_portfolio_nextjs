'use server';

import { sendMail } from '@/lib/nodemailer';
import { contactSchema } from '@/lib/zod-schemas/contactSchema';

import { type ContactFormState } from '@/types/forms/contactFormTypes';

export async function contactMe(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
	const contactObject = {
		client: String(formData.get('client-name') ?? ''),
		email: String(formData.get('client-mail') ?? ''),
		subject: String(formData.get('msg-subject') ?? ''),
		content: String(formData.get('msg-content') ?? ''),
	};

	const validatedContactObj = contactSchema.safeParse(contactObject);

	if (!validatedContactObj.success) {
		const fieldErrors = validatedContactObj.error.flatten().fieldErrors;
		return {
			error: fieldErrors,
			values: contactObject,
		};
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

		return {
			success: 'Message sent',
			values: {
				client: '',
				email: '',
				subject: '',
				content: '',
			},
		};
	} catch (error: unknown) {
		if (error instanceof Error) {
			return {
				error: {
					client: [],
					email: [],
					subject: [],
					content: [String(error.message)],
				},
				values: contactObject,
			};
		}
		return {
			error: {
				client: [],
				email: [],
				subject: [],
				content: ['Unexpected error'],
			},
			values: contactObject,
		};
	}
}
