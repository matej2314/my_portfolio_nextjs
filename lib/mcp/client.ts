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
let connectingPromise: Promise<Client> | null = null;

function errorMessage(error: unknown): string {
	if (error instanceof Error) return error.message;
	return String(error);
}

export function isMcpSessionStaleError(error: unknown): boolean {
	const msg = errorMessage(error);
	return msg.includes('No valid session Id provided') || msg.includes('Invalid or missing session ID') || msg.includes('"code":-32000') || msg.includes('"code": -32000');
}

export function resetMcpClient(): void {
	mcpClientInstance = null;
	toolsCache = null;
	connectingPromise = null;
}

async function getOrCreateMcpClient(): Promise<Client> {
	if (mcpClientInstance) return mcpClientInstance;
	if (connectingPromise) return connectingPromise;

	connectingPromise = (async () => {
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
			resetMcpClient();
		};

		return client;
	})();

	try {
		return await connectingPromise;
	} finally {
		connectingPromise = null;
	}
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

async function withMcpSessionRetry<T>(operation: (client: Client) => Promise<T>): Promise<T> {
	try {
		const client = await getOrCreateMcpClient();
		return await operation(client);
	} catch (error) {
		if (!isMcpSessionStaleError(error)) throw error;
		console.error('[MCP Client] Session invalid, resetting client and retrying once:', errorMessage(error));
		resetMcpClient();
		const client = await getOrCreateMcpClient();
		return await operation(client);
	}
}

export async function getPortfolioTools(_client: Client): Promise<MCPTool[]> {
	if (toolsCache !== null && toolsCache.length > 0) {
		return toolsCache;
	}

	const { tools } = await withMcpSessionRetry(c => c.listTools());
	const filtered = tools.filter(tool => tool.name.startsWith(`${NAMESPACE}_`));

	if (filtered.length === 0) {
		const sample = tools.slice(0, 12).map(t => t.name);
		if (tools.length > 0) {
			console.error(`[MCP Client] No tools match MCP_NAMESPACE="${NAMESPACE}_". listTools returned ${tools.length} tools; sample names:`, sample.join(', ') || '(none)');
		} else {
			console.error('[MCP Client] listTools returned 0 tools (MCP server may have failed to load modules).');
		}
		toolsCache = null;
		return [];
	}

	toolsCache = filtered;
	console.log(`[MCP Client] Cached ${toolsCache.length} portfolio tools`);
	return toolsCache;
}

export async function callTool(_client: Client, toolName: string, args: Record<string, unknown> = {}): Promise<McpToolResult> {
	const result = await withMcpSessionRetry(c =>
		c.callTool({
			name: toolName,
			arguments: args,
		}),
	);

	const raw = result.content;
	const blocks: CallToolResult['content'] = Array.isArray(raw) ? (raw as CallToolResult['content']) : [];

	const textParts = blocks.filter((c): c is { type: 'text'; text: string } => c.type === 'text');

	return {
		content: textParts.length ? textParts : [{ type: 'text', text: JSON.stringify(blocks.length ? blocks : (raw ?? [])) }],
		isError: result.isError === true,
	};
}
