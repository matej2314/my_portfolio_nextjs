import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type Course, type Skill } from '@/types/actionsTypes/actionsTypes';
import { type Category } from '@/types/skillSelectorTypes';
import { SafeParseReturnType, ZodSchema } from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const validateData = <T>(data: unknown, schema: ZodSchema): SafeParseReturnType<T, T> => {
	return schema.safeParse(data);
};

export const formatHeader = (key: string) => {
	return key
		.replace('Count', '')
		.replace(/([A-Z])/g, ' $1')
		.trim()
		.replace(/^./, s => s.toUpperCase());
};

export const delay = async (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

export const getSkillsCategories = (skills: Skill[]): Category[] => {
	const uniqueCategories = [...new Set(skills.map(skill => skill.skill_cat))];
	const categoryObjects = uniqueCategories.map(cat => ({ name: cat, label: cat }));
	return [{ name: null, label: 'All' }, ...categoryObjects];
};

export const getFilteredSkills = (skills: Skill[], selectedCategory: string | null) => {
	return selectedCategory ? skills.filter(skill => skill.skill_cat === selectedCategory) : skills;
};

const SKILL_CATEGORY_DISPLAY_ORDER = ['WebDev', 'DevOps', 'AI & Autom.', 'Security'] as const;

export function isSkillCategoryExcluded(skillCat: string): boolean {
	const raw = skillCat.trim();
	return /^seo$/i.test(raw);
}

export function skillCategorySlug(cat: string): string {
	return cat
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_|_$/g, '');
}

export function groupSkillsIntoColumns(skills: Skill[]): { category: string; skills: Skill[] }[] {
	const map = new Map<string, Skill[]>();
	for (const s of skills) {
		if (isSkillCategoryExcluded(s.skill_cat)) continue;
		const list = map.get(s.skill_cat) ?? [];
		list.push(s);
		map.set(s.skill_cat, list);
	}
	const keys = [...map.keys()];
	keys.sort((a, b) => {
		const ia = SKILL_CATEGORY_DISPLAY_ORDER.indexOf(a as (typeof SKILL_CATEGORY_DISPLAY_ORDER)[number]);
		const ib = SKILL_CATEGORY_DISPLAY_ORDER.indexOf(b as (typeof SKILL_CATEGORY_DISPLAY_ORDER)[number]);
		const w = (i: number) => (i === -1 ? 1000 : i);
		const diff = w(ia) - w(ib);
		return diff !== 0 ? diff : a.localeCompare(b);
	});
	return keys.map(category => ({ category, skills: map.get(category)! }));
}

export const getSortedCourses = (courses: Course[]) => {
	return courses.sort((a, b) => new Date(a.course_date).getTime() - new Date(b.course_date).getTime());
};

const COURSE_CATEGORY_DISPLAY_ORDER = ['Web Development', 'SEO', 'Security'] as const;

/** Grupuje kursy po `course_category`, sortuje kategorie (jak w designie), w grupie — od najnowszej daty. */
export function groupCoursesByCategory(courses: Course[]): { category: string; items: Course[] }[] {
	const map = new Map<string, Course[]>();
	for (const c of courses) {
		const cat = (c.course_category && c.course_category.trim()) || 'Other';
		const list = map.get(cat) ?? [];
		list.push(c);
		map.set(cat, list);
	}
	const keys = [...map.keys()];
	keys.sort((a, b) => {
		const ia = COURSE_CATEGORY_DISPLAY_ORDER.indexOf(a as (typeof COURSE_CATEGORY_DISPLAY_ORDER)[number]);
		const ib = COURSE_CATEGORY_DISPLAY_ORDER.indexOf(b as (typeof COURSE_CATEGORY_DISPLAY_ORDER)[number]);
		const w = (i: number) => (i === -1 ? 1000 : i);
		const diff = w(ia) - w(ib);
		return diff !== 0 ? diff : a.localeCompare(b);
	});
	return keys.map(category => ({
		category,
		items: (map.get(category) ?? []).sort((a, b) => new Date(b.course_date).getTime() - new Date(a.course_date).getTime()),
	}));
}

export function parseEndDate(raw: FormDataEntryValue | null): Date | null {
	if (typeof raw !== 'string' || raw.trim() === '') return null;
	const date = new Date(raw);
	return isNaN(date.getTime()) ? null : date;
}

export const formatDuration = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}m ${remainingSeconds}s`;
};

export const formatPercentage = (value: number): string => {
	return `${(value * 100).toFixed(1)}%`;
};


export const readRect = (el: HTMLElement) => {
	const r = el.getBoundingClientRect();
	return { top: r.top, left: r.left, width: r.width, height: r.height };
}