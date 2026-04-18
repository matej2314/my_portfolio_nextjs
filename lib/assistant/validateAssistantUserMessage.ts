import { NextResponse } from 'next/server';
import { type ChatResponse } from './types';

interface ValidateAssistantUserMessageParams {
	message: unknown;
	maxMessageLength: number;
}

export function validateAssistantUserMessage({
	message,
	maxMessageLength,
}: ValidateAssistantUserMessageParams): NextResponse | undefined {
	if (typeof message !== 'string' || !message || message.length > maxMessageLength) {
		return NextResponse.json(
			{
				success: false,
				error: 'Invalid message length',
			} satisfies ChatResponse,
			{ status: 400 },
		);
	}
	return undefined;
}
