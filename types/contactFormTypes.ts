export type ContactFormState = {
	success?: string;
	error?: {
		client?: string[];
		email?: string[];
		subject?: string[];
		content?: string[];
	};
	values: {
		client: string;
		email: string;
		subject: string;
		content: string;
	};
};
