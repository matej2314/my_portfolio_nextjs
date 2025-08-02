'use server';
import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

import { APP_CONFIG } from '@/config/app.config';
import { REDIS_KEYS } from '@/lib/redis/redisKeys';

import { convertFormData } from '@/lib/utils/formDataToObjectConvert';
import { validateData } from '@/lib/utils/utils';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';
import { setCache, getCache, deleteCache, deleteMultipleCache } from '@/lib/redis/redis';
import { baseCourseSchema, updateCourseSchema } from '@/lib/zod-schemas/courseSchema';
import { idSchema } from '@/lib/zod-schemas/idSchema';

import { type GetCoursesType, type GetCourseType, type ReturnedType, type Course } from '@/types/actionsTypes/actionsTypes';

export const getCourses = async (): Promise<GetCoursesType> => {
	try {
		const cachedCourses = await getCache<Course[]>(REDIS_KEYS.COURSES_ALL);
		if (cachedCourses) return { courses: cachedCourses };

		const result = await prisma.courses.findMany();

		await setCache(REDIS_KEYS.COURSES_ALL, result, APP_CONFIG.redis.defaultExpiration);
		return { courses: result };
	} catch (error) {
		return logErrAndReturn('getCourses', error, { error: 'Failed to fetch courses' });
	}
};

export const getCourse = async (id: string): Promise<GetCourseType> => {
	try {
		const validId = validateData(id, idSchema);

		if (!validId.success) {
			return logErrAndReturn('getCourse', validId.error.flatten(), { error: 'Invalid id' });
		}

		const cachedCourse = await getCache<Course>(REDIS_KEYS.COURSE(validId.data as string));
		if (cachedCourse) return { course: cachedCourse };

		const result = await prisma.courses.findUnique({
			where: { id: validId.data as string },
		});

		await setCache(REDIS_KEYS.COURSE(id), result, APP_CONFIG.redis.defaultExpiration);

		return { course: result as Course };
	} catch (error) {
		return logErrAndReturn('getCourse', error, { error: 'Failed to fetch course' });
	}
};

export async function saveCourse(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const inputCourseData = convertFormData(formData);
		const validCourse = validateData(inputCourseData, baseCourseSchema);

		if (!validCourse.success) {
			return logErrAndReturn('saveCourse', validCourse.error.flatten(), {
				success: false,
				error: 'Invalid input data',
			});
		}

		const { course_date, ...dataWithoutDate } = validCourse.data as Omit<Course, 'id'>;

		const id = uuidv4();
		const formattedDate = new Date(course_date);

		const course: Course = { id, ...dataWithoutDate, course_date: formattedDate };

		await prisma.courses.create({
			data: course,
		});

		await deleteCache(REDIS_KEYS.COURSES_ALL);
		return { success: true, message: 'New course added correctly' };
	} catch (error) {
		return logErrAndReturn('saveCourse', error, { success: false, error: 'Failed to add new course.' });
	}
}

export async function updateCourse(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const inputData = convertFormData(formData);
		const validInputData = validateData(inputData, updateCourseSchema);

		if (!validInputData.success) {
			return logErrAndReturn('updateCourse', validInputData.error.flatten(), {
				success: false,
				error: 'Invalid input data.',
			});
		}

		const { id, ...dataWithoutId } = validInputData.data as Course;

		await prisma.courses.update({
			where: { id: id },
			data: { ...dataWithoutId },
		});

		await deleteMultipleCache(REDIS_KEYS.COURSES_ALL, REDIS_KEYS.COURSE(id));
		return { success: true, message: 'Course updated correctly.' };
	} catch (error) {
		return logErrAndReturn('updateCourse', error, { success: false, error: 'Failed to update course.' });
	}
}

export async function deleteCourse(prevState: ReturnedType, formData: FormData): Promise<ReturnedType> {
	try {
		const id = formData.get('id');
		const validId = validateData(id, idSchema);

		if (!validId.success) {
			return logErrAndReturn('deleteCourse', validId.error.flatten(), {
				success: false,
				error: 'Invalid input data.',
			});
		}

		await prisma.courses.delete({
			where: { id: validId.data as string },
		});

		await deleteMultipleCache(REDIS_KEYS.COURSES_ALL, REDIS_KEYS.COURSE(String(validId.data)));
		return { success: true, message: 'Course deleted correctly' };
	} catch (error) {
		return logErrAndReturn('deleteCourse', error, { success: false, error: 'Failed to delete course.' });
	}
}
