'use server';

import { getAboutMe } from './aboutMe';
import { getBlogPosts } from './blogPosts';
import { getCourses } from './courses';
import { getProjects } from './projects';
import { getSkills } from './skills';
import { getExperience } from './experience';
import { logErrAndReturn } from '@/lib/utils/logErrAndReturn';

export async function getHomePageData() {
	try {
		const [aboutMe, blogPosts, courses, projects, skills, experience] = await Promise.all([getAboutMe(), getBlogPosts(), getCourses(), getProjects(), getSkills(), getExperience()]);

		return {
			data: {
				aboutMe,
				blogPosts,
				courses,
				projects,
				skills,
				experience,
			},
			error: null,
		};
	} catch (e) {
		return logErrAndReturn('getHomePageData', e, { data: null, error: 'Failed to fetch data' });
	}
}
