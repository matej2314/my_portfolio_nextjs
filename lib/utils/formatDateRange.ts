import { formatMonthYear } from "./formatMonthYear";
import { type Experience } from "@/types/actionsTypes/actionsTypes";


export const parseExperienceDate = (value: string | null): Date | null => {
	if (!value) return null;
	const d = new Date(value);
	return Number.isNaN(d.getTime()) ? null : d;
}

export const formatDateRange = (locale: string, exp: Experience, presentLabel: string): string => {
	const since = parseExperienceDate(exp.employed_since);
	const to = parseExperienceDate(exp.employed_to);
	const fromStr = since ? formatMonthYear(locale, since) : '—';
	let toStr: string;
	if (to) {
		toStr = formatMonthYear(locale, to);
	} else if (exp.is_current) {
		toStr = presentLabel;
	} else {
		toStr = '—';
	}
	return `${fromStr} – ${toStr}`;
}