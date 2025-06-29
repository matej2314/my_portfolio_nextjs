'use server';
import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { unstable_cache, revalidateTag } from 'next/cache';

import { convertFormData } from '@/lib/formDataToObjectConvert';

import { baseCourseSchema, updateCourseSchema } from '@/lib/zod-schemas/courseSchema';
import { idSchema } from '@/lib/zod-schemas/idSchema';

import { type GetCoursesType, ReturnedType } from '@/types/actionsTypes/actionsTypes';

export const getCourses = unstable_cache(async (): Promise<GetCoursesType> => {
	try {
		const result = await prisma.courses.findMany();

		return { courses: result };
	} catch (error) {
		console.error(`getCourses error: ${String(error)}`);
		return { error: 'Failed to fetch courses' };
	}
}, ['courses']);

export async function saveCourse(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const inputCourseData = convertFormData(formData);
		const validCourse = baseCourseSchema.safeParse(inputCourseData);

		if (!validCourse.success) {
			console.error('saveCourse validation error:', validCourse.error.flatten());
			return { success: false, error: 'Invalid input data' };
		}

		const id = uuidv4();

		const course = { id, ...validCourse.data };

		await prisma.courses.create({
			data: course,
		});

		revalidateTag('courses');
		return { success: true, message: 'New course added correctly' };
	} catch (error) {
		console.error('saveCourse error:', error);
		return { success: false, error: 'Failed to add new course.' };
	}
}

export async function updateCourse(formData: FormData): Promise<ReturnedType> {
	try {
		const inputData = convertFormData(formData);
		const validInputData = updateCourseSchema.safeParse(inputData);

		if (!validInputData.success) {
			console.error('updateCourse validation error:', validInputData.error.flatten());
			return { success: false, error: 'Invalid input data.' };
		}

		const { id, ...dataWithoutId } = validInputData.data;

		await prisma.courses.update({
			where: { id: id },
			data: { ...dataWithoutId },
		});

		revalidateTag('courses');
		return { success: true, message: 'Course updated correctly.' };
	} catch (error) {
		console.error(`updateCourse error:`, error);
		return { success: false, error: 'Failed to update course.' };
	}
}

export async function deleteCourse(formData: FormData): Promise<ReturnedType> {
	try {
		const id = formData.get('id');
		const validId = idSchema.safeParse(id);

		if (!validId.success) {
			console.error('deleteCourse error:', validId.error.flatten());
		}

		await prisma.courses.delete({
			where: { id: validId.data },
		});

		revalidateTag('courses');
		return { success: true, message: 'Course deleted correctly' };
	} catch (error) {
		console.error('deleteCourse error:', error);
		return { success: false, error: 'Failed to delete course.' };
	}
}
