'use server';

import prisma from "@/lib/db";
import { type Project } from "@/types/actionsTypes/actionsTypes";

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

export async function saveProject() {

};

export async function updateProject() {

};

export async function deleteProject() {

};