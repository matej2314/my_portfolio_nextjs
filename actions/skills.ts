import prisma from "@/lib/db";
import { type Skill } from "@/types/actionsTypes/actionsTypes";

export async function getSkills(): Promise<{skills: Skill[]} | {error: string}>{

    try {
        const result = await prisma.skills.findMany();

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