'use server';

import { cookies } from 'next/headers';
import { compare } from 'bcryptjs';
import { redirect } from 'next/navigation';

import prisma from '@/lib/db';
import { sign } from 'jsonwebtoken';
import { lucia } from '@/lib/auth';
import { loginSchema } from '@/lib/zod-schemas/authSchemas';
import { convertFormData } from '@/lib/utils/formDataToObjectConvert';

export async function login(prevState: any, formData: FormData) {
	const inputUserData = convertFormData(formData);
	const validUserData = loginSchema.safeParse(inputUserData);
	const nowInSeconds = Math.floor(Date.now() / 1000);
	const expiresInSeconds = 60 * 60 * 24;
	const expiresDate = new Date(Date.now() + expiresInSeconds * 1000);

	if (!validUserData.success) {
		console.error(`Login validation error:`, validUserData.error.flatten());
		return;
	}

	const email = validUserData.data.email;
	const password = validUserData.data.password;

	const user = await prisma.users.findUnique({ where: { email } });

	if (!user || !(await compare(password, user.password))) {
		return { error: 'Invalid credentials.' };
	}

	const session = await lucia.createSession(user.id, {
		attributes: {},
		active_expires: nowInSeconds + expiresInSeconds,
		idle_expires: nowInSeconds + expiresInSeconds,
		expiresAt: expiresDate,
	});

	const token = sign({ userId: user.id, email: user.email }, process.env.AUTH_SECRET!, { expiresIn: expiresInSeconds });

	const cookieStore = await cookies();

	cookieStore.set('SESSID', token, {
		httpOnly: true,
		path: '/control',
		sameSite: 'lax',
		secure: false,
		expires: expiresDate,
	});

	redirect('/control/dashboard');
}
