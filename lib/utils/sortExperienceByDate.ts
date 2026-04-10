import { parseExperienceDate } from './formatDateRange';
import { type Experience } from '@/types/actionsTypes/actionsTypes';

export function sortExperienceByDate(experiences: Experience[]): Experience[] {
	return [...experiences].sort((a, b) => {
		const dateA = parseExperienceDate(a.employed_since)?.getTime() ?? 0;
		const dateB = parseExperienceDate(b.employed_since)?.getTime() ?? 0;
		return dateB - dateA;
	});
}
