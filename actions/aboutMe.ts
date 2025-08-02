'use server';

import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

import { APP_CONFIG } from '@/config/app.config';
import { REDIS_KEYS } from '@/lib/redis/redisKeys';

import { getCache, setCache } from '@/lib/redis/redis';
import { aboutMeSchema, aboutTxtSchema } from '@/lib/zod-schemas/aboutMeSchema';
import { convertFormData } from '@/lib/utils/formDataToObjectConvert';
import { validateData } from '@/lib/utils/utils';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';

import { type GetAboutMeType, type ReturnedType, type AboutTextType } from '@/types/actionsTypes/actionsTypes';

export const getAboutMe = async (): Promise<GetAboutMeType> => {
	try {
		const cachedAboutMe = await getCache<AboutTextType>(REDIS_KEYS.ABOUTME);
		if (cachedAboutMe) return { aboutMe: cachedAboutMe };

		const aboutMe = await prisma.about_me.findFirst();
		if (!aboutMe) return { aboutMe: null };

		await setCache(REDIS_KEYS.ABOUTME, aboutMe, APP_CONFIG.redis.defaultExpiration);
		return { aboutMe };
	} catch (error) {
		return logErrAndReturn('getAboutMe', error, { error: 'Failed to fetch description' });
	}
};

export async function saveAboutMe(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const id = uuidv4();
		const about_text = formData.get('about_text') as string;
		const validAbout_text = validateData(about_text, aboutTxtSchema);
		if (!validAbout_text.success) {
			return logErrAndReturn('saveAboutMe', validAbout_text.error.flatten(), {
				success: false,
				error: 'Invalid input data.',
			});
		}

		const newAboutMe = { id, about_text };

		const validNewAboutMe = validateData(newAboutMe, aboutMeSchema);

		if (!validNewAboutMe.success) {
			return logErrAndReturn('saveAboutMe', validNewAboutMe.error.flatten(), {
				success: false,
				error: 'Invalid input data.',
			});
		}

		const aboutText = { ...(validNewAboutMe.data as AboutTextType) };

		await prisma.about_me.deleteMany({});

		const aboutMe = await prisma.about_me.create({
			data: aboutText,
		});

		await setCache<AboutTextType>(REDIS_KEYS.ABOUTME, aboutMe, APP_CONFIG.redis.defaultExpiration);
		return { success: true, message: 'Description added correctly' };
	} catch (error) {
		return logErrAndReturn('saveAboutMe', error, { success: false, error: 'Failed to add new description' });
	}
}

export async function updateAboutMe(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const updatedDescription = convertFormData(formData);

		const validUpdatedDescription = validateData(updatedDescription, aboutMeSchema);

		if (!validUpdatedDescription.success) {
			return logErrAndReturn('updateAboutMe', validUpdatedDescription.error.flatten(), {
				success: false,
				error: 'Invalid input data.',
			});
		}

		const { id, ...descriptionData } = validUpdatedDescription.data as AboutTextType;

		const updatedAboutMe = await prisma.about_me.update({
			where: { id: id },
			data: descriptionData,
		});

		await setCache<AboutTextType>(REDIS_KEYS.ABOUTME, updatedAboutMe, APP_CONFIG.redis.defaultExpiration);
		return { success: true, message: 'About description updated correctly.' };
	} catch (error) {
		return logErrAndReturn('updateAboutMe', error, { success: false, error: 'Failed to update about description.' });
	}
}
