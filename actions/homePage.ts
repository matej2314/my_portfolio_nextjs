'use server';

import { getAboutMe } from './aboutMe';
import { getBlogPosts } from './blogPosts';
import { getCourses } from './courses';
import { getProjects } from './projects';
import { getSkills } from './skills';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';

export async function getHomePageData() {
	try {
		const [aboutMe, blogPosts, courses, projects, skills] = await Promise.all([getAboutMe(), getBlogPosts(), getCourses(), getProjects(), getSkills()]);

		return {
			data: {
				aboutMe,
				blogPosts,
				courses,
				projects,
				skills,
			},
			error: null,
		};
	} catch (e) {
		return logErrAndReturn('getHomePageData', e, { data: null, error: 'Failed to fetch data' });
	}
}
