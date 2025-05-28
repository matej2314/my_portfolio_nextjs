import prisma from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';
import { convertFormData } from "@/lib/formDataToObjectConvert";

import { type ReturnedType, GetSkillsType } from "@/types/actionsTypes/actionsTypes";
import { skillSchema } from "@/lib/zod-schemas/skillSchema";
import { idSchema } from "@/lib/zod-schemas/idSchema";

export async function getSkills(): Promise<GetSkillsType>{

    try {
        const result = await prisma.skills.findMany();

        return {skills: result};
    } catch (error) {
        console.error(`getSkills error: ${String(error)}`);
        return { error: 'Failed to fetch skills' };
    }
};

export async function saveSkill(formData: FormData): Promise<ReturnedType> {

    try {
        const id = uuidv4();
        const skillObject = convertFormData(formData);
        const validSkillObject = skillSchema.safeParse(skillObject);
        
        if (!validSkillObject.success) {
            console.error('SaveSkill. Invalid input data error:', validSkillObject.error.flatten());
            return { success: false, error: 'Invalid input data.' };
        };

        const skill = { id, ...validSkillObject.data };

        await prisma.skills.create({ data: skill});
        return { success: true, message: 'Skill added correctly.' };
    } catch (error) {
        console.error('saveSkill error:', error);
        return { success: false, error: 'Failed to add new skill' };
    }
};

export async function updateSkill(formData: FormData): Promise<ReturnedType> {
    
    try {
        const newSkillObject = convertFormData(formData);
        const validNewSkillObj = skillSchema.safeParse(newSkillObject);

        const id = formData.get("id");
        const validID = idSchema.safeParse(id);

        if (!validNewSkillObj.success || !validID.success) {
            console.error('updateSkill validation error:', validNewSkillObj.error?.flatten() || validID.error?.flatten());
            return { success: false, error: 'Invalid input data.' };
        };

        await prisma.skills.update({
            where: { id: validID.data },
            data: validNewSkillObj.data,
        });

        return { success: true, message: 'Skill updated correctly.' };
    } catch (error) {
        console.error('updateSkill error:', error);
        return { success: false, error: 'Failed to update skill.' };
    };
};

export async function deleteSkill(formData: FormData): Promise<ReturnedType> {

    try {
        const id = formData.get("id");
        const validId = idSchema.safeParse(id);

        if (!validId.success) {
            console.error("deleteSkill validation error:", validId.error.flatten());
            return { success: false, error: 'Invalid input data.' };
        }

        await prisma.skills.delete({
            where: { id: validId.data }
        });

        return { success: true, message: 'Skill deleted correctly.' };
    } catch (error) {
        console.error('deleteSkill error:', error);
        return { success: false, error: 'Failed to delete skill.' };
    };
};