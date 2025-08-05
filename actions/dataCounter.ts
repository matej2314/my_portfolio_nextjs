'use server';

import { dbMethods } from '@/lib/db';
import { type DataCounterReturnedData } from '@/types/actionsTypes/actionsTypes';

export async function dataCounter(): Promise<DataCounterReturnedData> {
	const [projectsCount, coursesCount, skillsCount, blogPostsCount] = await Promise.all([dbMethods.countRecords('projects'), dbMethods.countRecords('courses'), dbMethods.countRecords('skills'), dbMethods.countRecords('posts')]);

	return {
		projectsCount,
		coursesCount,
		skillsCount,
		blogPostsCount,
	};
}
