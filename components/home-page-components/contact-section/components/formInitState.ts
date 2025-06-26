import { type ContactFormState } from '@/types/contactFormTypes';

export const initialState: ContactFormState = {
	success: undefined,
	error: {
		client: [],
		email: [],
		subject: [],
		content: [],
	},
	values: {
		client: '',
		email: '',
		subject: '',
		content: '',
	},
};
