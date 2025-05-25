'use server';

import prisma from "@/lib/db";
import fs from 'node:fs';
import path from 'path';

import { type Project, GetShotsResult } from "@/types/actionsTypes/actionsTypes";


export async function getProjects(): Promise<{projects: Project[]} | {error: string}> {

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

export async function getProject(id: string): Promise<{project: Project} | {error: string}>{

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

export async function saveProject() {

};

export async function updateProject() {

};

export async function deleteProject() {

};