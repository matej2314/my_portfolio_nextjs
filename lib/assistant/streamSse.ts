import { type AssistantStreamServerEvent } from './types';

const encoder = new TextEncoder();

export function sseData(event: AssistantStreamServerEvent): Uint8Array {
    const payload = JSON.stringify(event);
    return encoder.encode(`data: ${payload}\n\n`);
}