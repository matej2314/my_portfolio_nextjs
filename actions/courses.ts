import prisma from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';

import { convertFormData } from "@/lib/formDataToObjectConvert";

import { baseCourseSchema, updateCourseSchema} from "@/lib/zod-schemas/courseSchema";
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
        const inputCourseData = convertFormData(formData);
        const validCourse = baseCourseSchema.safeParse(inputCourseData);

        if (!validCourse.success) {
            console.error('saveCourse validation error:', validCourse.error.flatten());
            return { success: false, error: 'Invalid input data' };
        };

        const id = uuidv4();

        const course = {id,...validCourse.data };
        
        await prisma.courses.create({
            data: course,
        });

        return { success: true, message: 'New course added correctly' };

    } catch (error) {
        console.error('saveCourse error:', error);
        return { success: false, error: 'Failed to add new course.' };
    };
};

export async function updateCourse(formData: FormData): Promise<ReturnedType> {
    try {
        const inputData = convertFormData(formData);
        const validInputData = updateCourseSchema.safeParse(inputData);

        if (!validInputData.success) {
            console.error('updateCourse validation error:', validInputData.error.flatten());
            return { success: false, error: 'Invalid input data.' };
        };
        await prisma.courses.update({
            where: { id: validInputData.data.id },
            data: { ...validInputData.data },
        });

        return { success: true, message: 'Course updated correctly.' };
    } catch (error) {
        console.error(`updateCourse error:`, error);
        return { success: false, error: 'Failed to update course.' };
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