'use server';

import { sendMail } from '@/lib/nodemailer.config';
import { validateData } from '@/lib/utils/utils';
import { contactMessageTemplate } from '@/lib/emailTemplate';
import { contactSchema } from '@/lib/zod-schemas/contactSchema';
import { APP_CONFIG } from '@/config/app.config';

import { type ContactFormState, type ContactObject } from '@/types/forms/contactFormTypes';

export async function contactMe(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
	const contactObject: ContactObject = {
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
			subject: `New message from ${validatedContactObj.data.client}`,
			html: contactMessageTemplate(validatedContactObj.data),
		});

		return {
			success: 'Message sent',
			values: APP_CONFIG.contact.defaultContactObject,
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
