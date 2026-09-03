import { defaultData } from '@/lib/defaultData';

/** Placeholder w `SYSTEM_PROMPTS` — zastępowany blokiem kontaktu z `defaultData` przed wywołaniem modelu. */
export const ASSISTANT_CONTACT_PLACEHOLDER = '{{ASSISTANT_CONTACT_BLOCK}}';

export type AssistantContactDetails = {
	phone: string | undefined;
	email: string | undefined;
};

/** Telefon i e-mail z `defaultData.floatingBoxesData.contactRows` (to samo źródło co UI odmowy). */
export function getAssistantContactDetails(): AssistantContactDetails {
	const rows = defaultData.floatingBoxesData.contactRows;
	return {
		phone: rows.find(row => row.kind === 'phone')?.value,
		email: rows.find(row => row.kind === 'email')?.value,
	};
}

/** Sekcja KONTAKT wstrzykiwana do system promptu (PL/EN). */
export function getAssistantContactBlock(locale: 'pl' | 'en'): string {
	const { phone, email } = getAssistantContactDetails();
	const lines: string[] = [];

	if (locale === 'pl') {
		lines.push('KONTAKT (podawaj TYLKO gdy nie możesz / nie umiesz odpowiedzieć na pytanie — zawsze obie wartości, jeśli są dostępne):');
		if (phone) lines.push(`- telefon: ${phone}`);
		if (email) lines.push(`- e-mail: ${email}`);
	} else {
		lines.push('CONTACT (share ONLY when you cannot / are unable to answer the question — always both values when available):');
		if (phone) lines.push(`- phone: ${phone}`);
		if (email) lines.push(`- email: ${email}`);
	}

	return lines.join('\n');
}

/** Wstrzykuje blok kontaktu w miejsce `{{ASSISTANT_CONTACT_BLOCK}}`. */
export function injectAssistantContactBlock(prompt: string, locale: 'pl' | 'en'): string {
	return prompt.replaceAll(ASSISTANT_CONTACT_PLACEHOLDER, getAssistantContactBlock(locale));
}
