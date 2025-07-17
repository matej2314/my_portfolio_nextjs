'use server';
import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

import { convertFormData } from '@/lib/formDataToObjectConvert';
import { setCache, getCache, deleteCache, deleteMultipleCache } from '@/lib/redis/redis';
import { REDIS_KEYS } from '@/lib/redis/redisKeys';

import { baseCourseSchema, updateCourseSchema } from '@/lib/zod-schemas/courseSchema';
import { idSchema } from '@/lib/zod-schemas/idSchema';

import { type GetCoursesType, GetCourseType, ReturnedType, Course } from '@/types/actionsTypes/actionsTypes';

export const getCourses = async (): Promise<GetCoursesType> => {
	try {
		const cachedCourses = await getCache<Course[]>(REDIS_KEYS.COURSES_ALL);
		if (cachedCourses) return { courses: cachedCourses };

		const result = await prisma.courses.findMany();

		await setCache(REDIS_KEYS.COURSES_ALL, result, 3600);
		return { courses: result };
	} catch (error) {
		console.error(`getCourses error: ${String(error)}`);
		return { error: 'Failed to fetch courses' };
	}
};

export const getCourse = async (id: string): Promise<GetCourseType> => {
	try {
		const validId = idSchema.safeParse(id);

		if (!validId.success) {
			console.error(`getCourse error: ${String(validId.error.flatten())}`);
			return { error: 'Invalid id' };
		}

		const cachedCourse = await getCache<Course>(REDIS_KEYS.COURSE(validId.data));
		if (cachedCourse) return { course: cachedCourse };

		const result = await prisma.courses.findUnique({
			where: { id: validId.data },
		});

		await setCache(REDIS_KEYS.COURSE(id), result, 3600);

		return { course: result as Course };
	} catch (error) {
		console.error(`getCourse error: ${String(error)}`);
		return { error: 'Failed to fetch course' };
	}
};

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

		await deleteCache(REDIS_KEYS.COURSES_ALL);
		return { success: true, message: 'New course added correctly' };
	} catch (error) {
		console.error('saveCourse error:', error);
		return { success: false, error: 'Failed to add new course.' };
	}
}

export async function updateCourse(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
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

		deleteMultipleCache(REDIS_KEYS.COURSES_ALL, REDIS_KEYS.COURSE(id));
		return { success: true, message: 'Course updated correctly.' };
	} catch (error) {
		console.error(`updateCourse error:`, error);
		return { success: false, error: 'Failed to update course.' };
	}
}

export async function deleteCourse(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const id = formData.get('id');
		const validId = idSchema.safeParse(id);

		if (!validId.success) {
			console.error('deleteCourse error:', validId.error.flatten());
			return { success: false, error: 'Invalid input data.' };
		}

		await prisma.courses.delete({
			where: { id: validId.data },
		});

		deleteMultipleCache(REDIS_KEYS.COURSES_ALL, REDIS_KEYS.COURSE(String(validId.data)));
		return { success: true, message: 'Course deleted correctly' };
	} catch (error) {
		console.error('deleteCourse error:', error);
		return { success: false, error: 'Failed to delete course.' };
	}
}
