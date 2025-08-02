'use server';

import { sendMail } from '@/lib/nodemailer.config';
import { validateData } from '@/lib/utils/utils';
import { contactSchema } from '@/lib/zod-schemas/contactSchema';
import { APP_CONFIG } from '@/config/app.config';

import { type ContactFormState } from '@/types/forms/contactFormTypes';

export async function contactMe(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
	const contactObject = {
		client: String(formData.get('client-name') ?? ''),
		email: String(formData.get('client-mail') ?? ''),
		subject: String(formData.get('msg-subject') ?? ''),
		content: String(formData.get('msg-content') ?? ''),
	};

	const validatedContactObj = validateData<typeof contactObject>(contactObject, contactSchema);

	if (!validatedContactObj.success) {
		const fieldErrors = validatedContactObj.error.flatten().fieldErrors;
		return {
			error: fieldErrors,
			values: contactObject,
		};
	}

	try {
		await sendMail({
			to: APP_CONFIG.nodemailer.to as string,
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
