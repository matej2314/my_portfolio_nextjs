'use server';

import prisma from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';

import { aboutMeSchema } from "@/lib/zod-schemas/aboutMeSchema";
import { idSchema } from "@/lib/zod-schemas/idSchema";
import { type GetAboutMeType,ReturnedType } from "@/types/actionsTypes/actionsTypes";

export async function getAboutMe():Promise<GetAboutMeType> {

    try {
        const result = await prisma.about_me.findMany();

        return { aboutMe: result };
    } catch (error) {
        console.error(`getAboutMe error: ${String(error)}`);
        return { error: 'Failed to fetch description' };
    }
};

export async function saveAboutMe(formData: FormData): Promise<ReturnedType> {
    
    try {
        const id = uuidv4();
        const about_text = formData.get("about_text") as string;

        const newAboutMe = { about_text };

        const validNewAboutMe = aboutMeSchema.safeParse(newAboutMe);

        if (!validNewAboutMe.success) {
            console.error('saveAvoutMe validation error:', validNewAboutMe.error.flatten());
            return { success: false, error: 'Invalid input data.' };
        };

        const aboutText = { id, ...validNewAboutMe.data };

        await prisma.about_me.create({
            data: aboutText,
        });

        return { success: true, message: 'Description added correctly' };
    } catch (error) {
        console.error('saveAboutMe error:', error);
        return { success: false, error: 'Failed to add new description' };
    };
};

export async function updateAboutMe(formData: FormData): Promise<ReturnedType> {

    try {
        const id = uuidv4();
        const validId = idSchema.safeParse(id);

        const updatedDescription = {
            about_text: formData.get("about_text") as string,
        };

        const validUpdatedDescription = aboutMeSchema.safeParse(updatedDescription);

        if (!validId.success || !validUpdatedDescription.success) {
            console.error('UpdateAboutMe validation error:', validId.error?.flatten() || validUpdatedDescription.error?.flatten());
            return { success: false, error: 'Invalid input data.' };
        };

        await prisma.about_me.update({
            where: { id: validId.data },
            data: updatedDescription,
        });
        return { success: true, message: 'About description updated correctly.' };
    } catch (error) {
        console.error('UpdateAboutMe error:', error);
        return { success: false, error: 'Failed to update about description.' };
    };
};


