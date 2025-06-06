'use server';

import prisma from '@/lib/db';

type DataCounterReturnedData = {
	projectsCount: number;
	coursesCount: number;
	skillsCount: number;
	blogPostsCount: number;
};

export async function dataCounter(): Promise<DataCounterReturnedData> {
	const [projectsCount, coursesCount, skillsCount, blogPostsCount] = await Promise.all([prisma.projects.count(), prisma.courses.count(), prisma.skills.count(), prisma.posts.count()]);

	return {
		projectsCount,
		coursesCount,
		skillsCount,
		blogPostsCount,
	};
}
