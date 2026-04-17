import Anthropic from '@anthropic-ai/sdk';
import { type Client } from '@modelcontextprotocol/sdk/client';
import { getLocale } from 'next-intl/server';
import { assertAllowedToolName, callTool, withMcpClient, getPortfolioTools } from '../mcp/client';
import { SYSTEM_PROMPTS, type AssistantLocale, toolResultPrefix, wrapUserContentForModel } from './prompts';
import { type ChatHistoryTurn } from './types';

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-5-20250929';

const MAX_ITERATIONS = Number.parseInt(process.env.ASSISTANT_MAX_ITERATIONS ?? '5');

async function callAnthropicWithRetry<T>(fn: () => Promise<T>, maxRetries: number = 3, baseDelay: number = 1000): Promise<T> {
	for (let attempt = 0; attempt < maxRetries; attempt++) {
		try {
			return await fn();
		} catch (error: any) {
			const isOverloaded = error?.status === 529 || error?.type === 'overloaded_error';
			const shouldRetry = error?.headers?.get?.('x-should-retry') === 'true' || error?.headers?.['x-should-retry'] === 'true';

			if (isOverloaded && shouldRetry && attempt < maxRetries - 1) {
				const delay = baseDelay * Math.pow(2, attempt);
				console.log(`[ANTHROPIC RETRY] Attempt ${attempt + 1}/${maxRetries}, waiting ${delay}ms before retrying...`);
				await new Promise(resolve => setTimeout(resolve, delay));
				continue;
			}

			console.error('[ANTHROPIC ERROR] Non-retryable or max retries reached:', {
				status: error?.status,
				type: error?.type,
				attempt: attempt + 1,
				maxRetries,
			});

			throw error;
		}
	}

	throw new Error('Max retries reached for Anthropic API call');
}

async function resolveLocale(): Promise<AssistantLocale> {
	const locale = await getLocale();
	return locale === 'pl' ? 'pl' : 'en';
}

function joinToolTextParts(parts: Array<{ type: string; text: string }>): string {
	return parts.map(p => p.text).join('\n');
}

function buildMessagesFromHistory(priorTurns: ChatHistoryTurn[], latestUserMessage: string, loc: AssistantLocale): Anthropic.MessageParam[] {
	const out: Anthropic.MessageParam[] = [];
	for (const turn of priorTurns) {
		const text = turn.text?.trim() ?? '';
		if (!text) continue;
		if (turn.role === 'user') {
			out.push({
				role: 'user',
				content: wrapUserContentForModel(text, loc),
			});
		} else {
			out.push({ role: 'assistant', content: text });
		}
	}
	out.push({
		role: 'user',
		content: wrapUserContentForModel(latestUserMessage, loc),
	});
	return out;
}

export async function runAssistantLoopStreaming(
	userMessage: string,
	options: {
		history?: ChatHistoryTurn[];
		onTextDelta: (chunk: string) => void;
	},
): Promise<string> {
	const loc = await resolveLocale();
	const prior = options.history ?? [];

	return withMcpClient(async (client: Client) => {
		const tools = await getPortfolioTools(client);
		const allowedToolNames = new Set(tools.map(t => t.name));

		const anthropicTools: Anthropic.Tool[] = tools.map(tool => {
			const schema = tool.inputSchema;
			return {
				name: tool.name,
				description: tool.description ?? '',
				input_schema: {
					type: 'object',
					properties: schema?.properties ?? {},
					...(schema?.required?.length ? { required: schema.required } : {}),
				},
			};
		});

		const messages = buildMessagesFromHistory(prior, userMessage, loc);

		for (let i = 0; i < MAX_ITERATIONS; i++) {
			const stream = anthropic.messages.stream({
				model: MODEL,
				max_tokens: 1500,
				system: SYSTEM_PROMPTS[loc],
				messages,
				tools: anthropicTools,
				stream: true,
				temperature: 0.4,
				tool_choice: i === 0 ? { type: 'any' } : { type: 'auto' },
			});

			stream.on('text', (textDelta: string) => {
				options.onTextDelta(textDelta);
			});

			let finalMessage: Anthropic.Message;
			try {
				finalMessage = await stream.finalMessage();
			} catch (error: any) {
				console.error('[ANTHROPIC STREAM ERROR]:', error);
				throw error;
			}

			const toolUses = finalMessage.content.filter((block): block is Anthropic.ToolUseBlock => block.type === 'tool_use');

			if (toolUses.length === 0) {
				const textBlock = finalMessage.content.find((block): block is Anthropic.TextBlock => block.type === 'text');
				return textBlock?.text ?? 'Przepraszam, nie mogę odpowiedzieć na Twoje pytanie.';
			}

			const prefix = toolResultPrefix(loc);

			const toolResults = await Promise.all(
				toolUses.map(async toolUse => {
					try {
						assertAllowedToolName(toolUse.name, allowedToolNames);

						const result = await callTool(client, toolUse.name, (toolUse.input as Record<string, unknown>) ?? {});

						const body = joinToolTextParts(result.content);
						const payload = prefix + body;

						return {
							type: 'tool_result' as const,
							tool_use_id: toolUse.id,
							content: payload,
							is_error: result.isError === true,
						};
					} catch (error) {
						console.error('[MCP TOOL ERROR] Error calling tool:', toolUse.name, error);
						return {
							type: 'tool_result' as const,
							tool_use_id: toolUse.id,
							content: prefix + `Error: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`,
							is_error: true,
						};
					}
				}),
			);

			if (finalMessage.stop_reason === 'pause_turn') {
				messages.push({
					role: 'assistant',
					content: finalMessage.content,
				});
			}

			messages.push({
				role: 'assistant',
				content: finalMessage.content,
			});

			messages.push({
				role: 'user',
				content: toolResults,
			});
		}

		throw new Error('Max iterations reached without a response');
	});
}
