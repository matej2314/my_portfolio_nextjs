import { ContactObject } from '@/types/forms/contactFormTypes';
import { render } from '@react-email/render';
import { ThankYouEmail } from '@/components/emails/ThankYouEmail';
import  { ContactMessageEmail }  from '@/components/emails/ContactMessageEmail';

export const contactMessageTemplate = async (data: ContactObject): Promise<string> => {
	return await render(<ContactMessageEmail data={data} />);
};

export const contactResponseTemplate = async (clientName: string): Promise<string> => {
	return await render(<ThankYouEmail clientName={clientName} />);
};