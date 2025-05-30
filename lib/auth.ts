import { Lucia } from 'lucia';
import { cookies } from 'next/headers';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from './db';

const client = prisma;
const adapter = new PrismaAdapter(client.sessions, client.users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: 'SESSID',
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/control',
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
