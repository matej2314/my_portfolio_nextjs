import { Client } from '@modelcontextprotocol/sdk/client';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { type CallToolResult } from '@modelcontextprotocol/sdk/types';
import { type MCPTool, type McpToolResult } from './types';

const MCP_BASE_URL = process.env.MCP_BASE_URL || 'http://127.0.0.1:3333';
const MCP_ENDPOINT = process.env.MCP_ENDPOINT_PATH || '/mcp';
const MCP_TOKEN = process.env.MCP_INTERNAL_TOKEN?.trim() ?? '';
const NAMESPACE = process.env.MCP_NAMESPACE || 'portfolio';

function mcpServerUrl() {
	const base = MCP_BASE_URL.endsWith('/') ? MCP_BASE_URL : `${MCP_BASE_URL}/`;
	return new URL(MCP_ENDPOINT.replace(/^\//, ''), base);
}

let mcpClientInstance: Client | null = null;
let toolsCache: MCPTool[] | null = null;

async function getOrCreateMcpClient(): Promise<Client> {
	if (!mcpClientInstance) {
		const transport = new StreamableHTTPClientTransport(mcpServerUrl(), {
			requestInit: {
				headers: {
					...(MCP_TOKEN ? { Authorization: `Bearer ${MCP_TOKEN}` } : {}),
				},
			},
		});

		const client = new Client(
			{
				name: 'portfolio-next-assistant',
				version: '1.0.0',
			},
			{ capabilities: {} },
		);

		await client.connect(transport);
		mcpClientInstance = client;

		client.onclose = () => {
			console.error('[MCP Client] Connection closed, will reconnect on next request');
			mcpClientInstance = null;
			toolsCache = null;
		};
	}
	return mcpClientInstance;
}

export function assertAllowedToolName(toolName: string, allowedNames: Set<string>): void {
	if (!allowedNames.has(toolName)) {
		throw new Error(`Tool: ${toolName} not allowed.`);
	}
}

export async function withMcpClient<T>(fn: (client: Client) => Promise<T>): Promise<T> {
	const client = await getOrCreateMcpClient();
	return fn(client);
}

export async function getPortfolioTools(client: Client): Promise<MCPTool[]> {
	if (!toolsCache) {
		const { tools } = await client.listTools();
		toolsCache = tools.filter(tool => tool.name.startsWith(`${NAMESPACE}_`));
		console.log(`[MCP Client] Cached ${toolsCache.length} portfolio tools`);
	}
	return toolsCache;
}

export async function callTool(client: Client, toolName: string, args: Record<string, unknown> = {}): Promise<McpToolResult> {
	const result = await client.callTool({
		name: toolName,
		arguments: args,
	});

	const raw = result.content;
	const blocks: CallToolResult['content'] = Array.isArray(raw) ? (raw as CallToolResult['content']) : [];

	const textParts = blocks.filter((c): c is { type: 'text'; text: string } => c.type === 'text');

	return {
		content: textParts.length ? textParts : [{ type: 'text', text: JSON.stringify(blocks.length ? blocks : (raw ?? [])) }],
		isError: result.isError === true,
	};
}
