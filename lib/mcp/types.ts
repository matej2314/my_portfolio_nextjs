export interface MCPTool {
	name: string;
	description?: string;
	inputSchema?: {
		type: string;
		properties?: Record<string, unknown>;
		required?: string[];
	};
}

export interface McpToolResult {
	content: Array<{
		type: string;
		text: string;
	}>;
	isError?: boolean;
}
