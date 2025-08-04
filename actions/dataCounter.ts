'use server';

import { dbMethods } from '@/lib/db';

type DataCounterReturnedData = {
	projectsCount: number;
	coursesCount: number;
	skillsCount: number;
	blogPostsCount: number;
};

export async function dataCounter(): Promise<DataCounterReturnedData> {
	const [projectsCount, coursesCount, skillsCount, blogPostsCount] = await Promise.all([
		dbMethods.countRecords('projects'),
		dbMethods.countRecords('courses'),
		dbMethods.countRecords('skills'),
		dbMethods.countRecords('posts')]);

	return {
		projectsCount,
		coursesCount,
		skillsCount,
		blogPostsCount,
	};
}
