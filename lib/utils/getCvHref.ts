export const getCvHref = (locale: string): { cvHref: string, cvFileName: string } => {
    const cvFileName = locale === 'pl' ? 'CV - Mateusz_Śliwowski.pdf' : 'CV - Mateusz_Śliwowski_en.pdf';
	const cvHref = `/cv/${encodeURIComponent(cvFileName)}`;
    return { cvHref, cvFileName };
}