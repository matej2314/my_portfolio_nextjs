export const REDIS_KEYS = {
	PROJECTS_ALL: 'projects:all',
	PROJECT: (id: string) => `project:${id}`,
	PROJECT_SHOTS: (id: string) => `projectShots:${id}`,
	SKILLS_ALL: 'skills:all',
	COURSES_ALL: 'courses:all',
	COURSE: (id: string) => `course:${id}`,
	BLOGPOSTS: 'blogPosts:all',
	BLOGPOST: (id: string) => `blogPost:${id}`,
	ABOUTME: 'aboutMe',
};
