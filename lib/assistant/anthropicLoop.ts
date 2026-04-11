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

export async function runAssistantLoop
	(userMessage: string,
	options?: {history?: ChatHistoryTurn[]},
	): Promise<string | undefined> {
	const loc = await resolveLocale();
	const prior = options?.history ?? [];

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
			const forceTools = i === 0 && anthropicTools.length > 0;

			const response = await anthropic.messages.create({
				model: MODEL,
				max_tokens: 1500,
				system: SYSTEM_PROMPTS[loc],
				messages,
				tools: anthropicTools,
				temperature: 0.4,
				// stream: true,
				tool_choice: forceTools ? { type: 'any' } : { type: 'auto' },
			});

			const toolUses = response.content.filter((block): block is Anthropic.ToolUseBlock => block.type === 'tool_use');

			if (toolUses.length === 0) {
				const textBlock = response.content.find((block): block is Anthropic.TextBlock => block.type === 'text');
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

			messages.push({
				role: 'assistant',
				content: response.content,
			});

			messages.push({
				role: 'user',
				content: toolResults,
			});
		}

		throw new Error('Max iterations reached without a response');
	});
}
