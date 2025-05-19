'use server';

import { executeQuery } from "@/lib/db";
import { type AboutTextType } from "@/types/actionsTypes/aboutMeTypes";



export async function getAboutMe():Promise<{aboutMe: AboutTextType[]} | {error: string}> {

    try {
        const result = await executeQuery<AboutTextType[]>('SELECT about_text FROM about_me ORDER BY id LIMIT 1');

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