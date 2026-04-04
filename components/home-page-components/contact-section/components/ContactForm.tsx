'use client';
import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { useTranslations } from 'next-intl';

import { contactMe } from '@/actions/contact';

import SubmitBtn from '@/components/ui/elements/SubmitButton';
import DisplayFormMessage from './DisplayFormMessage';
import ContactFloatingField from './ContactFloatingField';

import { event } from '@/lib/google-analytics/gtag';

import { defaultData } from '@/lib/defaultData';

const inputClass =
	'h-11 rounded-md border border-slate-700 bg-[#0c0c0c] text-slate-200 focus-visible:border-slate-600 focus-visible:ring-1 focus-visible:ring-slate-600 md:text-base';
const textareaClass =
	'min-h-[120px] rounded-md border border-slate-700 bg-[#0c0c0c] text-slate-200 focus-visible:border-slate-600 focus-visible:ring-1 focus-visible:ring-slate-600 md:text-base';

export default function ContactForm() {
	const [state, formAction] = useActionState(contactMe, defaultData.contactInitState);
	const [shouldDisable, setShouldDisable] = useState(false);
	const t = useTranslations('homePage.contactSection');

	const hasErrors = state?.error && Object.values(state.error).some(error => error.length > 0);
	const isSuccess = state?.success !== undefined;

	useEffect(() => {
		if (isSuccess) {
			setShouldDisable(true);

			const timer = setTimeout(() => {
				setShouldDisable(false);
			}, 2000);

			return () => clearTimeout(timer);
		} else if (hasErrors) {
			setShouldDisable(false);
		}
	}, [isSuccess, hasErrors]);

	useEffect(() => {
		if (isSuccess) {
			event({ action: 'contact', params: { eventName: 'contact', eventCount: 1, eventValue: 1 } });
		}
	}, [isSuccess]);

	return (
		<form action={formAction} className='flex h-fit w-full flex-col gap-4'>
			<DisplayFormMessage type='success' messages={state.success} />
			<ContactFloatingField
				variant='input'
				type='text'
				id='client-name'
				name='client-name'
				label={t('contactForm.nameLabel')}
				defaultValue={state.values.client}
				errorMessages={state.error?.client}
				inputClassName={inputClass}
			/>
			<ContactFloatingField
				variant='input'
				type='email'
				id='client-mail'
				name='client-mail'
				label={t('contactForm.emailLabel')}
				defaultValue={state.values.email}
				errorMessages={state.error?.email}
				inputClassName={inputClass}
			/>
			<ContactFloatingField
				variant='input'
				type='text'
				id='msg-subject'
				name='msg-subject'
				label={t('contactForm.subjectLabel')}
				defaultValue={state.values.subject}
				errorMessages={state.error?.subject}
				inputClassName={inputClass}
			/>
			<ContactFloatingField
				variant='textarea'
				id='msg-content'
				name='msg-content'
				label={t('contactForm.messageLabel')}
				defaultValue={state.values.content}
				errorMessages={state.error?.content}
				inputClassName={textareaClass}
			/>
			<SubmitBtn
				pendingTxt={t('contactForm.submitBtn.pendingTxt')}
				idleTxt={t('contactForm.submitBtn.idleTxt')}
				backgroundColor='bg-[#facc15]'
				hoverClass='hover:bg-[#eab308]'
				disabled={shouldDisable}
				submitted={shouldDisable}
				className='mt-2 rounded-lg px-7 py-3.5 text-base font-semibold text-[#0c0c0c] md:text-base'
			/>
		</form>
	);
}
