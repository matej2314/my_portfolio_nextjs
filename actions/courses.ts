import prisma from "@/lib/db";

import { type Course } from "@/types/actionsTypes/actionsTypes";

export async function getCourses(): Promise<{courses: Course[]} | {error: string}> {

    try {
        const result = await prisma.courses.findMany();

        return { courses: result };
    } catch (error) {
         console.error(`getCourses error: ${String(error)}`);
        return { error: 'Failed to fetch courses' };
    }
};

export async function saveCourse() {
    
}