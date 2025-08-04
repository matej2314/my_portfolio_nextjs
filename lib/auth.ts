import { Lucia, Session } from 'lucia';
import { cookies } from 'next/headers';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from './db';
import { APP_CONFIG } from '@/config/app.config';
import { redirect } from 'next/navigation';
import { logErrAndReturn } from './utils/logErrAndReturn';

const client = prisma;
const adapter = new PrismaAdapter(client.sessions, client.users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: 'SESSID',
		expires: false,
		attributes: {
			secure: APP_CONFIG.auth.cookie.secure,
			sameSite: APP_CONFIG.auth.cookie.sameSite as 'lax' | 'strict' | 'none',
			path: APP_CONFIG.auth.cookie.path,
		},
	},
	getUserAttributes: data => ({
		email: data.email,
		role: data.role,
		login: data.name,
	}),
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: string;
			role: string;
			name: string;
		};
	}
}

export async function verifyCookie() {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get('SESSID');

	if (!sessionCookie) return null;

	try {
		const session = await lucia.validateSession(sessionCookie.value);
		return session;
	} catch {
		return null;
	}
}

export async function requireAuth() {
	const session = await verifyCookie();
	if (!session) {
		redirect('/control');
	}

	return { success: true, session };
}

export const requireActionsAuth = async (functionName: string): Promise<{ success: boolean; session: Session | null; error?: string }> => {
	try {
		const session = await verifyCookie();
		if (!session) {
			return logErrAndReturn(functionName, 'Authentication failed', { success: false, error: 'Unauthorized. Please log in.', session: null });
		}
		return { success: true, session: session.session };
	} catch (error) {
		return logErrAndReturn(functionName, error, { success: false, error: 'Failed to authenticate.', session: null });
	}
};
