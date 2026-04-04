export const getCvHref = (locale: string): { cvHref: string, cvFileName: string } => {
    const cvFileName = locale === 'pl' ? 'CV - Mateusz Śliwowski.pdf' : 'CV - Mateusz Śliwowski_en.pdf';
	const cvHref = `/cv/${encodeURIComponent(cvFileName)}`;
    return { cvHref, cvFileName };
}