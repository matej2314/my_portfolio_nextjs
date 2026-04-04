export const formatMonthYear = (locale: string, d: Date): string => {
	if (locale === 'pl') {
		const m = String(d.getMonth() + 1).padStart(2, '0');
		return `${m}.${d.getFullYear()}`;
	}
	return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}