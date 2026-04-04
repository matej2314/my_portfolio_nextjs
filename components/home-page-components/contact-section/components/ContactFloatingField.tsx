'use client';

import { cn } from '@/lib/utils/utils';

import InputElement from '@/components/ui/elements/InputElement';
import TextAreaElement from '@/components/ui/elements/TextareaElement';
import DisplayFormMessage from './DisplayFormMessage';

const fieldShell = 'flex w-full flex-col gap-1.5 pt-1';

const labelBase =
	'pointer-events-none absolute left-3 z-[1] max-w-[calc(100%-1.5rem)] origin-left truncate text-slate-500 transition-[top,transform,font-size,color] duration-200 ease-out motion-reduce:transition-none';

/** Nad inputem: dół labela tuż nad górną krawędzią pola (+ lekki odstęp). */
const floatAboveInput =
	'peer-focus:top-auto peer-focus:bottom-full peer-focus:mb-1 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-slate-400 peer-[:not(:placeholder-shown)]:top-auto peer-[:not(:placeholder-shown)]:bottom-full peer-[:not(:placeholder-shown)]:mb-1 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-slate-400';

type BaseProps = {
	id: string;
	name: string;
	label: string;
	defaultValue: string;
	errorMessages?: string[] | string;
	inputClassName: string;
};

type InputFieldProps = BaseProps & {
	variant: 'input';
	type: 'text' | 'email';
};

type TextareaFieldProps = BaseProps & {
	variant: 'textarea';
};

type ContactFloatingFieldProps = InputFieldProps | TextareaFieldProps;

export default function ContactFloatingField(props: ContactFloatingFieldProps) {
	const { id, name, label, defaultValue, errorMessages, inputClassName, variant } = props;

	const isInput = variant === 'input';

	const labelClass = cn(
		labelBase,
		'text-base md:text-base',
		isInput ? cn('top-1/2 -translate-y-1/2', floatAboveInput) : cn('top-3 translate-y-0', floatAboveInput)
	);

	const controlClass = cn(
		'peer w-full placeholder:text-transparent placeholder:opacity-0',
		isInput ? 'pt-2 pb-2' : 'min-h-[120px] resize-y pt-3 pb-3',
		inputClassName
	);

	return (
		<div className={fieldShell}>
			<div className='relative w-full'>
				{isInput ? (
					<InputElement
						type={props.type}
						title={label}
						name={name}
						id={id}
						placeholder=' '
						className={controlClass}
						defaultValue={defaultValue}
						required={false}
					/>
				) : (
					<TextAreaElement id={id} name={name} title={label} placeholder=' ' className={controlClass} defaultValue={defaultValue} required={false} />
				)}
				<label htmlFor={id} className={labelClass}>
					{label}
				</label>
			</div>
			<DisplayFormMessage type='error' messages={errorMessages} />
		</div>
	);
}
