'use server';

import prisma from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs';
import path from 'path';

import { type GetShotsResult, GetProjectType, GetProjectsType, ReturnedType } from "@/types/actionsTypes/actionsTypes";

import { convertFormData } from "@/lib/formDataToObjectConvert";
import { parseEndDate } from "@/lib/parseEndDate";

import { projectSchema } from "@/lib/zod-schemas/projectSchema";
import { idSchema } from "@/lib/zod-schemas/idSchema";



export async function getProjects(): Promise<GetProjectsType> {

    try {
        const projects = await prisma.projects.findMany();

        if (!projects) {
            return { error: 'Failed to fetch projects' };
        }

        return { projects: projects };
    } catch(error) {
        console.error(`getProjects error: ${String(error)}`);
        return { error: 'Failed to fetch projects' };
    }
};

export async function getProject(id: string): Promise<GetProjectType>{

    try {
        const project = await prisma.projects.findFirst({
            where: {
                id: id,
            }
        });

        if (!project) {
            return { error: 'Failed to fetch project' }
        };

        return { project: project };
    } catch (error) {
         console.error(`getProject error: ${String(error)}`);
        return { error: 'Failed to fetch project' };
    }
}

export async function getProjectShots(id: string): Promise<GetShotsResult> {
    const dirPath = path.join(process.cwd(), 'public', 'projects-photos', `${id}`, 'gallery');

    if (!fs.existsSync(dirPath)) {
        return { success: false, error: `Directory ${dirPath} doesn't exist.` };
    }

    const files = fs.readdirSync(dirPath).map(file => `/projects-photos/${id}/gallery/${file}`);
    return {success: true, files};
}

export async function saveProject( formData: FormData): Promise<ReturnedType> {
    try {
        const dataObject = convertFormData(formData);
        const result = projectSchema.safeParse(dataObject);

        if (!result.success) {
            console.error('SaveProject validation error:', result.error.flatten());
            return { success: false, error: 'Invalid input data' };
        };

        const id = uuidv4();
        const validatedData = result.data;
       

        const newProject = {
            id,
            ...validatedData,
        }

        await prisma.projects.create({data: newProject});
        return {success: true, message: 'Project added correctly.'}
    } catch (error) {
        console.error('SaveProjectError:', error);
        return { success: false, error: 'Failed to add new project.' };
}
};

export async function updateProject(formData: FormData): Promise<ReturnedType> {
    try {
        const id = formData.get("id") as string;
        const validId = idSchema.safeParse(id);

        if (!validId.success) {
            return { success: false, error: 'Invalid input data.' };
        };

        const end_date = parseEndDate(formData.get("end_date"));

         const updatedProject = {
            project_name: formData.get("project_name") as string,
            project_category : formData.get("project_category") as string,
            project_URL: formData.get("project_URL") as string,
            project_screenName: formData.get("project_screenName") as string,
            goal: formData.get("goal") as string | null,
            project_description: formData.get("project_description") as string | null,
            repo: formData.get("repo") as string | null,
            technologies: formData.get("technologies") as string | null,
            difficulty: formData.get("difficulty") as string | null,
            end_date,
            long_text: formData.get("long_text") as string | null,
        }

        const validUpdatedProject = projectSchema.safeParse(updatedProject);

        if (!validUpdatedProject.success) {
            console.error(`Update project validation error:`, validUpdatedProject.error.flatten());
            return { success: false, error: 'Invalid input data' };
        }


        await prisma.projects.update({
            where: { id: validId.data },
            data: validUpdatedProject.data,
        });

        return { success: true, message: 'Project updated correctly.' };
    } catch (error) {
        console.error('updateProject error:', error);
        return { success: false, error: 'Failed to update project.' };
    };
};

export async function deleteProject(formData: FormData): Promise<ReturnedType>{
    try {
        const id = formData.get("id") as string;
        const validId = idSchema.safeParse(id);

        if (!validId.success) {
            console.error('deleteProject error:', validId.error.flatten());
            return { success: false, error: 'Invalid input data.' };
        };

        await prisma.projects.delete({
            where: { id: validId.data },
        });
        
        return { success: true, message: 'Project deleted correctly.' };
    } catch (error) {
        console.error('deleteProjectError:', error);
        return { success: false, error: 'Failed to delete project.' };
    };
};