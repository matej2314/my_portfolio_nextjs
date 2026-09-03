export const refusalCopy = (locale: string): string => {
	return locale === 'pl'
		? 'W tym temacie nie pomogę tak dobrze jak Mateusz — lepiej radzę sobie z tematami zawodowymi. Możesz wybrać jeden z poniższych tematów albo skorzystać z przykładowego pytania. Chętnie też przekażę Ci jego dane kontaktowe.'
		: "I can't help as well as Mateusz on that topic — I'm better with professional questions. Pick one of the topics below or try a suggested question. I can also share his contact details.";
};

export const refusalExamplesHeading = (locale: string): string => {
	return locale === 'pl' ? 'Przykładowe pytania:' : 'Example questions:';
};

export const refusalContactHeading = (locale: string): string => {
	return locale === 'pl' ? 'Kontakt do Mateusza:' : "Mateusz's contact:";
};
