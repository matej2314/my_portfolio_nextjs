/** Placeholder w `SYSTEM_PROMPTS` — zastępowany datą wall-clock przed wywołaniem modelu. */
export const ASSISTANT_AS_OF_PLACEHOLDER = '{{ASSISTANT_AS_OF_DATE}}';

export const ASSISTANT_AS_OF_TIMEZONE = 'Europe/Warsaw';

/** Dzisiejsza data w Europe/Warsaw jako `YYYY-MM-DD`. */
export function getAssistantAsOfDate(now: Date = new Date()): string {
	return new Intl.DateTimeFormat('en-CA', {
		timeZone: ASSISTANT_AS_OF_TIMEZONE,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(now);
}

/** Wstrzykuje aktualną datę w miejsce `{{ASSISTANT_AS_OF_DATE}}` w regułach system promptu. */
export function injectAsOfDate(prompt: string, asOfDate: string = getAssistantAsOfDate()): string {
	return prompt.replaceAll(ASSISTANT_AS_OF_PLACEHOLDER, asOfDate);
}
