'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';


const PDF_PATH = '/references/referencje_json_crew.pdf';
const FILE_NAME = 'referencje_json_crew.pdf';

export function ReferencesDownloadButton({btnText}: {btnText: string}) {
	const [pending, setPending] = useState(false);

	async function handleDownload() {
		setPending(true);
		try {
			const res = await fetch(PDF_PATH, { cache: 'no-store' });
			if (!res.ok) {
				throw new Error(`HTTP ${res.status}`);
			}
			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = FILE_NAME;
			a.rel = 'noopener';
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
		} catch {
		} finally {
			setPending(false);
		}
	}

	return (
		<button type='button' onClick={handleDownload} disabled={pending} className='w-[200px] bg-yellow-300 text-black px-4 py-2 rounded-md flex items-center justify-center gap-2'>
			<Icon icon='line-md:file-download' width={20} height={20} />
			{pending ? 'Pobieranie…' : `${btnText}`}
		</button>
	);
}
