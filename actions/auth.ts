'use server';

import { cookies } from 'next/headers';
import { compare } from 'bcryptjs';
import { redirect } from 'next/navigation';

import prisma from '@/lib/db';
import { sign } from 'jsonwebtoken';
import { lucia } from '@/lib/auth';
import { APP_CONFIG } from '@/config/app.config';
import { loginSchema } from '@/lib/zod-schemas/authSchemas';
import { convertFormData } from '@/lib/utils/formDataToObjectConvert';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';
import { validateData } from '@/lib/utils/utils';

import { type User } from '@/types/actionsTypes/actionsTypes';

export async function login(prevState: any, formData: FormData) {
	const inputUserData = convertFormData(formData);
	const validUserData = validateData(inputUserData, loginSchema);
	const nowInSeconds = Math.floor(Date.now() / 1000);
	const expiresInSeconds = APP_CONFIG.auth.expiresIn;
	const expiresDate = new Date(Date.now() + expiresInSeconds * 1000);

	if (!validUserData.success) {
		return logErrAndReturn('login', validUserData.error.flatten(), { error: 'Invalid credentials.' });
	}

	const email = (validUserData.data as User).email;
	const password = (validUserData.data as User).password;

	const user = await prisma.users.findUnique({ where: { email } });

	if (!user || !(await compare(password, user.password))) {
		return logErrAndReturn('login', 'Invalid credentials.', { error: 'Invalid credentials.' });
	}

	const session = await lucia.createSession(user.id, {
		attributes: {},
		active_expires: nowInSeconds + expiresInSeconds,
		idle_expires: nowInSeconds + expiresInSeconds,
		expiresAt: expiresDate,
	});

	const token = sign({ userId: user.id, email: user.email }, APP_CONFIG.auth.secret!, { expiresIn: expiresInSeconds });

	const cookieStore = await cookies();

	cookieStore.set(APP_CONFIG.auth.cookie.name, token, {
		httpOnly: APP_CONFIG.auth.cookie.httpOnly,
		path: APP_CONFIG.auth.cookie.path,
		sameSite: APP_CONFIG.auth.cookie.sameSite as 'lax' | 'strict' | 'none',
		secure: APP_CONFIG.auth.cookie.secure,
		expires: expiresDate,
	});

	redirect('/control/dashboard');
}
