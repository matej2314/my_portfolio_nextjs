'use server';

import { getAboutMe } from './aboutMe';
import { getBlogPosts } from './blogPosts';
import { getCourses } from './courses';
import { getProjects } from './projects';
import { getSkills } from './skills';

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
		return {
			data: null,
			error: e instanceof Error ? e.message : 'Failed to fetch data',
		};
	}
}
