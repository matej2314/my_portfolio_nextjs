export interface SseResponseParams {
	stream: ReadableStream<Uint8Array>;
	status: number;
	headers: HeadersInit;
}

export const sseResponse = ({ stream, status, headers }: SseResponseParams) => {
	return new Response(stream, {
		status,
		headers,
	});
};