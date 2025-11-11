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
	return [{ name: null, label: 'All' },...categoryObjects];
};

export const getFilteredSkills = (skills: Skill[], selectedCategory: string | null) => {
	return selectedCategory ? skills.filter(skill => skill.skill_cat === selectedCategory) : skills;
};

export const getSortedCourses = (courses: Course[]) => {
	return courses.sort((a, b) => new Date(a.course_date).getTime() - new Date(b.course_date).getTime());
};

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
