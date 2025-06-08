export const convertFormData = (formData: FormData) => {
	const obj: Record<string, string | null> = {};
	for (const [key, value] of formData.entries()) {
		if (typeof value === 'string') {
			obj[key] = value === '' ? null : value;
		} else {
			obj[key] = value.name || null;
		}
	}
	return obj;
};
