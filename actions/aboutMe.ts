'use server';

import prisma from "@/lib/db";
import { type AboutTextType } from "@/types/actionsTypes/actionsTypes";



export async function getAboutMe():Promise<{aboutMe: AboutTextType[]} | {error: string}> {

    try {
        const result = await prisma.about_me.findMany();

        return { aboutMe: result };
    } catch (error) {
        console.error(`getAboutMe error: ${String(error)}`);
        return { error: 'Failed to fetch description' };
    }
};

export async function UpdateAboutMe() {

};


export async function saveAboutMe() {
    
}