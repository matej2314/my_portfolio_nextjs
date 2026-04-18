export const getAssistantStreamErrorMsg = (error: unknown):string => {
	const err = error as { status?: number; type?: string; message?: string };
	let errorMessage = 'An error occurred while processing your request.';
	if (err?.status === 529 || err?.type === 'overloaded_error') {
		errorMessage = 'The AI service is temporarily overloaded. Please try again in a moment.';
	} else if (err?.status === 429) {
		errorMessage = 'Too many requests to Assistant Service. Please wait a minute.';
	} else if (typeof err?.message === 'string' && err.message.includes('No MCP portfolio tools')) {
		errorMessage = err.message;
	}
	return errorMessage;
};
