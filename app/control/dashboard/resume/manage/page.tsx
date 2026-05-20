'use client';

import { useEffect, useState } from 'react';

import { getCvFilesList } from '@/actions/resume';
import AddItemBtn from '@/components/control-panel-components/AddItemBtn';
import ResumeFilesTable from '@/components/control-panel-components/resume/ResumeFilesTable';

import { type CvFileEntry } from '@/types/actionsTypes/actionsTypes';

export default function ManageResume() {
	const [files, setFiles] = useState<CvFileEntry[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		async function loadCvFiles() {
			const result = await getCvFilesList();

			if (!isMounted) return;

			if ('error' in result) {
				setError(result.error);
				setFiles([]);
			} else {
				setFiles(result.files);
				setError(null);
			}

			setIsLoading(false);
		}

		loadCvFiles();

		return () => {
			isMounted = false;
		};
	}, []);

	if (isLoading) {
		return (
			<main className='mt-4 flex h-full w-full flex-col items-center justify-start px-6 text-slate-200'>
				<p>Loading...</p>
			</main>
		);
	}

	if (error) {
		return (
			<main className='mt-4 flex h-full w-full flex-col items-center justify-start px-6 text-slate-200'>
				<p>Failed to fetch data.</p>
			</main>
		);
	}

	return (
		<main className='mt-4 flex h-full w-full flex-col items-center justify-start px-6 text-slate-200'>
			<AddItemBtn redirectPath='/control/dashboard/resume/add' title='add resume button' label='Add Resume' />
			<section className='flex h-fit w-full justify-center rounded-md mt-10'>
				<ResumeFilesTable files={files} />
			</section>
		</main>
	);
}
