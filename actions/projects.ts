'use server';

import prisma from "@/lib/db";
import { type Project } from "@/types/actionsTypes/projectsTypes";

export async function getProjects(): Promise<{projects: Project[]} | {error: string}> {

    try {
        const projects = await prisma.projects.findMany();

        return {projects: projects}
    } catch(error) {
        console.error(`getProjects error: ${String(error)}`);
        return { error: 'Failed to fetch projects' };
    }
};

export async function saveProject() {

};

export async function updateProject() {

};

export async function deleteProject() {

};