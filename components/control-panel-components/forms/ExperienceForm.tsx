'use client';

import { useActionState, useState, useRef } from 'react';

import FormTitle from './components/FormTitle';
import { getSubmitFunction } from '@/lib/utils/getSubmitFunction';
import { saveExperience, updateExperience } from '@/actions/experience';
import DisplayFormMessage from '@/components/home-page-components/contact-section/components/DisplayFormMessage';
import { type ExperienceFormProps } from '@/types/forms/experience-form';
import { defaultData } from '@/lib/defaultData';
import { type ReturnedType } from '@/types/actionsTypes/actionsTypes';
import { experiencePositionArray } from '@/lib/dataCatArrays';
import LabelElement from '@/components/ui/elements/LabelElement';
import InputElement from '@/components/ui/elements/InputElement';
import SubmitBtn from '@/components/ui/elements/SubmitButton';
import SwitchElement from '@/components/ui/elements/SwitchElement';
import SelectElement from '@/components/ui/elements/SelectElement';
import CalendarInputIcon from '@/components/ui/elements/CalendarInputIcon';

export default function ExperienceForm({ experienceData, mode = 'create' }: ExperienceFormProps) {
	const submitFunction = getSubmitFunction(
		{
			create: saveExperience,
			edit: updateExperience,
		},
		mode
	);
	const defaultState = defaultData.returnedTypeDefault as ReturnedType;
	const [state, formAction] = useActionState(submitFunction, defaultState);
	const [isCurrent, setIsCurrent] = useState(experienceData?.is_current || false);
	const [position, setPosition] = useState(experienceData?.position || '');

	const employedSinceInputRef = useRef<HTMLInputElement>(null);
	const employedToInputRef = useRef<HTMLInputElement>(null);

	const handleEmployedToInputClick = () => {
		if (employedToInputRef.current) {
			employedToInputRef.current.showPicker();
		}
	};

	const handleEmployedSinceInputClick = () => {
		if (employedSinceInputRef.current) {
			employedSinceInputRef.current.showPicker();
		}
	};
	return (
		<main className='w-full h-full flex flex-col items-center gap-5'>
			{!state?.success && <DisplayFormMessage messages={state?.error} type='error' />}
			{state?.success && <DisplayFormMessage messages={state?.message} type='success' />}
			<FormTitle editTitle='Edit experience' createTitle='Create new experience' mode={mode} />
			<form action={formAction} className='w-fit h-fit flex flex-col items-center justify-center gap-2 text-slate-200'>
				{mode === 'edit' && <input type='hidden' name='id' defaultValue={experienceData?.id} />}
				<LabelElement htmlFor='employer' className='font-bold pb-1 ml-2 text-lg tracking-wide'>
					Employer:
				</LabelElement>
				<InputElement type='text' name='employer' title='Input employer' id='employer' className='text-md pl-2 tracking-wide w-[16rem]' required={false} defaultValue={experienceData?.employer} />
				<LabelElement htmlFor='employer_url' className='font-bold pb-1 ml-2 text-lg tracking-wide'>
					Employer URL:
				</LabelElement>
				<InputElement type='url' name='employer_url' title='Input employer URL' id='employer_url' className='text-md pl-2 tracking-wide w-[16rem]' required={false} defaultValue={experienceData?.employer_url as string} />
				{/* <LabelElement htmlFor='is_current' className='font-bold pb-1 ml-2 text-lg tracking-wide'>
					Is current:
				</LabelElement> */}
				<SwitchElement id='is_current' checked={isCurrent} onChange={() => setIsCurrent(!isCurrent)} label='Is current' labelPosition='right' size='sm' />
				<input type='hidden' name='is_current' defaultValue={isCurrent ? 'true' : 'false'} />
				<LabelElement htmlFor='position' className='font-bold pb-1 ml-2 text-lg tracking-wide'>
					Position:
				</LabelElement>
				<SelectElement options={experiencePositionArray} value={position} onChange={val => setPosition(val)} placeholder='Select position' className='text-md pl-2 tracking-wide w-[16rem]' />
				<input type='hidden' name='position' defaultValue={position} />
				<LabelElement htmlFor='hourly_rate' className='font-bold pb-1 ml-2 text-lg tracking-wide'>
					Hourly rate:
				</LabelElement>
				<InputElement type='number' name='hourly_rate' title='Input hourly rate' id='hourly_rate' className='text-md pl-2 tracking-wide w-[16rem]' defaultValue={experienceData?.hourly_rate || ''} required={false} />
				<div>
					<LabelElement htmlFor='employed_since' className='font-bold pb-1 ml-2 text-lg tracking-wide'>
						Employed since:
					</LabelElement>
					<div className='relative w-full flex flex-col items-center cursor-pointer' onClick={handleEmployedSinceInputClick}>
						<InputElement ref={employedSinceInputRef} type='date' required={false} name='employed_since' id='employed_since' className='w-full pr-10' defaultValue={experienceData?.employed_since ? new Date(experienceData.employed_since).toISOString().split('T')[0] : ''} />
						<CalendarInputIcon />
					</div>
				</div>
				<div>
					<LabelElement htmlFor='employed_to' className='font-bold pb-1 ml-2 text-lg tracking-wide'>
						Employed to:
					</LabelElement>
					<div className='relative w-full flex flex-col items-center cursor-pointer' onClick={handleEmployedToInputClick}>
						<InputElement ref={employedToInputRef} type='date' required={false} name='employed_to' id='employed_to' className='w-full pr-10' defaultValue={experienceData?.employed_to ? new Date(experienceData.employed_to).toISOString().split('T')[0] : ''} title='Input employed to' />
						<CalendarInputIcon />
					</div>
				</div>
				<SubmitBtn pendingTxt='Saving...' idleTxt='Save' backgroundColor='bg-yellow-200' hoverClass='hover:bg-yellow-300' />
			</form>
		</main>
	);
}
