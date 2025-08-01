'use server';

import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

import { getCache, setCache } from '@/lib/redis/redis';
import { REDIS_KEYS } from '@/lib/redis/redisKeys';

import { aboutMeSchema, aboutTxtSchema } from '@/lib/zod-schemas/aboutMeSchema';
import { type GetAboutMeType, ReturnedType, AboutTextType } from '@/types/actionsTypes/actionsTypes';
import { convertFormData } from '@/lib/utils/formDataToObjectConvert';

export const getAboutMe = async (): Promise<GetAboutMeType> => {
	try {
		const cachedAboutMe = await getCache<AboutTextType>(REDIS_KEYS.ABOUTME);
		if (cachedAboutMe) return { aboutMe: cachedAboutMe };

		const aboutMe = await prisma.about_me.findFirst();
		if (!aboutMe) return { aboutMe: null };

		await setCache(REDIS_KEYS.ABOUTME, aboutMe, 3600);
		return { aboutMe };
	} catch (error) {
		console.error(`getAboutMe error: ${String(error)}`);
		return { error: 'Failed to fetch description' };
	}
};

export async function saveAboutMe(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const id = uuidv4();
		const about_text = formData.get('about_text') as string;
		const validAbout_text = aboutTxtSchema.safeParse(about_text);
		if (!validAbout_text.success) {
			return { success: false, error: 'Invalid input data.' };
		}

		const newAboutMe = { id, about_text };

		const validNewAboutMe = aboutMeSchema.safeParse(newAboutMe);

		if (!validNewAboutMe.success) {
			console.error('saveAvoutMe validation error:', validNewAboutMe.error.flatten());
			return { success: false, error: 'Invalid input data.' };
		}

		const aboutText = { ...validNewAboutMe.data };

		await prisma.about_me.deleteMany({});

		const aboutMe = await prisma.about_me.create({
			data: aboutText,
		});

		setCache<AboutTextType>(REDIS_KEYS.ABOUTME, aboutMe, 3600);
		return { success: true, message: 'Description added correctly' };
	} catch (error) {
		console.error('saveAboutMe error:', error);
		return { success: false, error: 'Failed to add new description' };
	}
}

export async function updateAboutMe(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const updatedDescription = convertFormData(formData);

		const validUpdatedDescription = aboutMeSchema.safeParse(updatedDescription);

		if (!validUpdatedDescription.success) {
			console.error('updateAboutMe validation error:', validUpdatedDescription.error.flatten());
			return { success: false, error: 'Invalid input data.' };
		}

		const { id, ...descriptionData } = validUpdatedDescription.data;

		const updatedAboutMe = await prisma.about_me.update({
			where: { id: id },
			data: descriptionData,
		});

		await setCache<AboutTextType>(REDIS_KEYS.ABOUTME, updatedAboutMe, 3600);
		return { success: true, message: 'About description updated correctly.' };
	} catch (error) {
		console.error('UpdateAboutMe error:', error);
		return { success: false, error: 'Failed to update about description.' };
	}
}
