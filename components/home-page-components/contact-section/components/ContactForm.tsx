'use client';

import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';

import { contactMe } from '@/actions/contact';

import SubmitBtn from '@/components/ui/elements/SubmitButton';
import DisplayFormMessage from './DisplayFormMessage';
import ContactFloatingField from './ContactFloatingField';

import { event } from '@/lib/google-analytics/gtag';
import { defaultData } from '@/lib/defaultData';
import { cn } from '@/lib/utils/utils';
import { fadeUp, listContainer } from '@/lib/motion/variants';

const fieldShell =
	'rounded-[var(--radius-chip)] border border-line bg-surface-1/70 shadow-inner-top transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-within:border-brand-line focus-within:bg-surface-2';

const inputClass = cn(
	'h-11 border-0 bg-transparent text-sm text-ink-0 shadow-none',
	'focus-visible:border-0 focus-visible:ring-0 xl:text-base',
);

const textareaClass = cn(
	'min-h-[120px] border-0 bg-transparent text-sm text-ink-0 shadow-none',
	'focus-visible:border-0 focus-visible:ring-0 xl:text-base',
);

export default function ContactForm() {
	const [state, formAction] = useActionState(contactMe, defaultData.contactInitState);
	const [shouldDisable, setShouldDisable] = useState(false);
	const t = useTranslations('homePage.contactSection');
	const reduced = useReducedMotion();
	const itemVariants = fadeUp(!!reduced);

	const hasErrors = state?.error && Object.values(state.error).some(error => error.length > 0);
	const isSuccess = state?.success !== undefined;

	useEffect(() => {
		if (isSuccess) {
			setShouldDisable(true);
			const timer = setTimeout(() => setShouldDisable(false), 2000);
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
			<motion.div
				variants={listContainer()}
				initial='hidden'
				whileInView='visible'
				viewport={{ amount: 0.2, once: true }}
				className='flex flex-col gap-4'
			>
				<motion.div variants={itemVariants} className={cn('w-full min-w-0 p-1', fieldShell)}>
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
				</motion.div>
				<motion.div variants={itemVariants} className={cn('w-full min-w-0 p-1', fieldShell)}>
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
				</motion.div>
				<motion.div variants={itemVariants} className={cn('w-full min-w-0 p-1', fieldShell)}>
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
				</motion.div>
				<motion.div variants={itemVariants} className={cn('w-full min-w-0 p-1', fieldShell)}>
					<ContactFloatingField
						variant='textarea'
						id='msg-content'
						name='msg-content'
						label={t('contactForm.messageLabel')}
						defaultValue={state.values.content}
						errorMessages={state.error?.content}
						inputClassName={textareaClass}
					/>
				</motion.div>
				<motion.div variants={itemVariants} className='w-full min-w-0'>
					<SubmitBtn
						pendingTxt={t('contactForm.submitBtn.pendingTxt')}
						idleTxt={t('contactForm.submitBtn.idleTxt')}
						backgroundColor='bg-brand'
						hoverClass='hover:bg-brand-bright'
						disabled={shouldDisable}
						submitted={shouldDisable}
						className={cn(
							'mt-2 rounded-full px-8 py-3.5 text-sm font-medium text-surface-0 xl:text-base',
							'focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60',
							'focus-visible:bg-brand-bright focus:bg-brand-bright',
							'transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
							'active:scale-[0.98]',
						)}
					/>
				</motion.div>
			</motion.div>
		</form>
	);
}
