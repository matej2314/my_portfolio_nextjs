// import { NextResponse } from 'next/server';
// import { withMcpClient, getPortfolioTools, callTool } from '@/lib/mcp/client';

// export async function GET() {
// 	try {
// 		const health = await withMcpClient(async client => {
// 			const tools = await getPortfolioTools(client);
// 			return { tools };
// 		});

// 		const toolNames = health.tools.slice(0, 5).map(t => t.name);

// 		return NextResponse.json({
// 			status: 'OK',
// 			mcp: {
// 				baseUrl: process.env.MCP_BASE_URL,
// 				namespace: process.env.MCP_NAMESPACE,
// 				toolsCount: health.tools.length,
// 				sampletools: toolNames,
// 			},
// 		});
// 	} catch (error) {
// 		console.error('[MCP HEALTH CHECK ERROR]', error);
// 		return NextResponse.json(
// 			{
// 				status: 'ERROR',
// 				message: error instanceof Error ? error.message : 'Unknown error',
// 			},
// 			{ status: 503 },
// 		);
// 	}
// }
