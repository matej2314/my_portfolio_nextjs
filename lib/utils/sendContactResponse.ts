import { sendMail } from '@/lib/nodemailer.config';
import { contactResponseTemplate } from '@/components/emails/emailTemplate';
import type { SendMailType } from '@/lib/nodemailer.config';

interface SendContactResponseParams {
	to: string;
	clientName: string;
}

export const sendContactResponse = async (data: SendContactResponseParams, type: SendMailType): Promise<void> => {
	try {
		const html = await contactResponseTemplate(data.clientName);

		await sendMail({
			to: data.to,
			subject: 'Dziękuję za kontakt!',
			html,
			type,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error('Unexpected error');
	}
};
