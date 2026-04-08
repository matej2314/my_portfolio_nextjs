const TOPICS = ['Projekty', 'Umiejętności', 'Doświadczenie', 'Kursy i certyfikaty', 'Kontakt'];

const EXAMPLE_QUESTIONS: Record<string, string[]> = {
	Projekty: ['Jakie projekty zrealizowałeś?', 'Który z realizowanych projektów jest najciekawszy?', 'Jakie najczęściej technologie wykorzystywałeś do tworzenia projektów?'],
	Umiejętności: ['Jakie technologie webowe znasz?', 'Jakie masz doświadczenie z TypeScript?', 'Czy znasz React?', 'Jakie masz doświadczenie z AI?'],
	Doświadczenie: ['W jakich firmach pracowałeś?', 'Jakie masz doświadczenie zawodowe?', 'Jakie zadania wykonywałeś w poprzedniej pracy?'],
};

export async function checkTopic(message: string): Promise<{
	allowed: boolean;
	topics?: string[];
	exampleQuestions?: Record<string, string[]>;
}> {
	const loweMessage = message.toLowerCase();

	const offTopicKeywords = ['jedzenie', 'food', 'hobby', 'pogoda', 'polityka', 'politics', 'weather', 'religia', 'religion', 'muzyka', 'music', 'filmy', 'movies', 'książki', 'books', 'gry', 'games', 'inne', 'other', 'sport'];

	const isOffTopic = offTopicKeywords.some(keyword => loweMessage.includes(keyword));

	if (isOffTopic) {
		return {
			allowed: false,
			topics: TOPICS,
			exampleQuestions: EXAMPLE_QUESTIONS,
		};
	}

	return { allowed: true };
}
