import { Lucia } from 'lucia';
import { cookies } from 'next/headers';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from './db';
import { APP_CONFIG } from '@/config/app.config';
import { redirect } from 'next/navigation';

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

export async function requireAuth(isPage: boolean = false) {
	const session = await verifyCookie();
	if (!session) {
		if (isPage) {
			redirect('/control');
		} else {
			return { success: false, error: 'Unauthorized. Please log in.' };
		}
	}

	return { success: true, session };
}
