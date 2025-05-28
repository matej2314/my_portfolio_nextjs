import prisma from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';

import { convertFormData } from "@/lib/formDataToObjectConvert";

import { courseSchema } from "@/lib/zod-schemas/courseSchema";
import { idSchema } from "@/lib/zod-schemas/idSchema";

import { type GetCoursesType, ReturnedType } from "@/types/actionsTypes/actionsTypes";

export async function getCourses(): Promise<GetCoursesType> {

    try {
        const result = await prisma.courses.findMany();

        return { courses: result };
    } catch (error) {
         console.error(`getCourses error: ${String(error)}`);
        return { error: 'Failed to fetch courses' };
    }
};

export async function saveCourse(formData: FormData): Promise<ReturnedType> {
    try {
        const id = String(uuidv4);
        const courseData = convertFormData(formData);

        const course = { id, ...courseData };
        const validCourse = courseSchema.safeParse(course);

        if (!validCourse.success) {
            console.error(`saveCourse error:`, validCourse.error.flatten());
            return { success: false, error: 'Failed to add new course.' };
        }
        
        await prisma.courses.create({
            data: validCourse.data,
        });

        return { success: true, message: 'New course added correctly' };

    } catch (error) {
        console.error('saveCourse error:', error);
        return { success: false, error: 'Failed to add new course.' };
    };
};

export async function deleteCourse(formData: FormData): Promise<ReturnedType> {
    try {
        const id = formData.get("id");
        const validId = idSchema.safeParse(id);

        if (!validId.success) {
            console.error('deleteCourse error:', validId.error.flatten());
        };

        await prisma.courses.delete({
            where: { id: validId.data },
        });

        return { success: true, message: 'Course deleted correctly' };
    } catch (error) {
        console.error('deleteCourse error:', error);
        return { success: false, error: 'Failed to delete course.' };
    };
}