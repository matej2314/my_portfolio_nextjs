import crypto from 'crypto';

export const REDIS_KEYS = {
	EXPERIENCES_ALL: 'experiences:all',
	EXPERIENCE: (id: string) => `experience:${id}`,
	PROJECTS_ALL: 'projects:all',
	PROJECT: (id: string) => `project:${id}`,
	PROJECT_SHOTS: (id: string) => `projectShots:${id}`,
	PROJECT_CATEGORIES: 'projects:categories',
	SKILLS_ALL: 'skills:all',
	SKILLS_CATEGORIES: 'skills:categories',
	SKILL: (id: string) => `skill:${id}`,
	COURSES_ALL: 'courses:all',
	COURSE: (id: string) => `course:${id}`,
	BLOGPOSTS: 'blogPosts:all',
	BLOGPOST: (id: string) => `blogPost:${id}`,
	ABOUTME: 'aboutMe',
	SITEMAP: 'sitemap:xml',
};


export function assistantReplyKey(
	version: string,
	locale: string,
	message: string
): string {
	const hash = crypto.createHash('sha256')
		.update(message.toLocaleLowerCase().trim())
		.digest('hex')
		.substring(0, 16);
	return `assistant:reply:${version}:${locale}:${hash}`;
}

export function assistantRateLimitKey(
	fingerprint: string
): string {
	return `assistant:rl:${fingerprint}`;
}

