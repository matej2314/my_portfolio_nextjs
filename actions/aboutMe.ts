'use server';

import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { unstable_cache, revalidateTag } from 'next/cache';

import { aboutMeSchema, aboutTxtSchema } from '@/lib/zod-schemas/aboutMeSchema';
import { type GetAboutMeType, ReturnedType } from '@/types/actionsTypes/actionsTypes';
import { convertFormData } from '@/lib/formDataToObjectConvert';

export const getAboutMe = unstable_cache(async (): Promise<GetAboutMeType> => {
	try {
		const result = await prisma.about_me.findMany();

		return { aboutMe: result };
	} catch (error) {
		console.error(`getAboutMe error: ${String(error)}`);
		return { error: 'Failed to fetch description' };
	}
}, ['aboutMe']);

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

		await prisma.about_me.create({
			data: aboutText,
		});

		revalidateTag('aboutMe');
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

		await prisma.about_me.update({
			where: { id: id },
			data: descriptionData,
		});

		revalidateTag('aboutMe');
		return { success: true, message: 'About description updated correctly.' };
	} catch (error) {
		console.error('UpdateAboutMe error:', error);
		return { success: false, error: 'Failed to update about description.' };
	}
}
