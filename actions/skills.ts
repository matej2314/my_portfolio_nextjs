'use server'

import { executeQuery } from "@/lib/db";
import { type Skill } from "@/types/actionsTypes/skillsTypes";

export async function getSkills(): Promise<{skills: Skill[]} | {error: string}>{

    try {
        const result = await executeQuery<Skill[]>('SELECT skill_name, skill_cat, icon_name, icon_color from skills');

        return {skills: result};
    } catch (error) {
        console.error(`getSkills error: ${String(error)}`);
        return { error: 'Failed to fetch skills' };
    }
};

export async function saveSkill() {

}

export async function updateSkill() {
    
}