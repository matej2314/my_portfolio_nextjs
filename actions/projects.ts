'use server';

import { executeQuery } from "@/lib/db";
import { type Project } from "@/types/actionsTypes/projectsTypes";



export async function getProjects(): Promise<{projects: Project[]} | {error: string}> {

    try {
        const result = await executeQuery<Project[]>("SELECT * FROM projects ORDER BY end_date ASC");

        return { projects: result };
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