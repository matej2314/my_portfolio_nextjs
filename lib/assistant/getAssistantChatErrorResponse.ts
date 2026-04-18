import { NextResponse } from 'next/server';
import { type ChatResponse } from './types';

export const getAssistantChatErrorResponse = (error: unknown): NextResponse => {
	const err = error as { status?: number; type?: string };

	if (err?.status === 529 || err?.type === 'overloaded_error') {
		return NextResponse.json(
			{
				success: false,
				error: 'The AI service is temporarily overloaded. Please try again in a moment.',
			} satisfies ChatResponse,
			{
				status: 503,
				headers: {
					'Retry-After': '30',
				},
			},
		);
	}
	if (err?.status === 429) {
		return NextResponse.json(
			{
				success: false,
				error: 'Too many requests to Assistant Service. Please wait a minute.',
			} satisfies ChatResponse,
			{
				status: 429,
				headers: {
					'Retry-After': '60',
				},
			},
		);
	}
	if (typeof err?.status === 'number' && err?.status >= 400 && err?.status < 600) {
		return NextResponse.json(
			{
				success: false,
				error: 'Assistant Service error. Please try again later.',
			} satisfies ChatResponse,
			{
				status: 502,
			},
		);
	}
	return NextResponse.json(
		{
			success: false,
			error: 'Internal server error.',
		} satisfies ChatResponse,
		{
			status: 500,
		},
	);
};
