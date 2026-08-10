'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

import { trackClientEvent } from '@/lib/metrics/trackClientEvent';
import { cn } from '@/lib/utils/utils';

const PDF_PATH = '/references/referencje_json_crew.pdf';
const FILE_NAME = 'referencje_json_crew.pdf';

export function ReferencesDownloadButton({
	btnText,
	pendingText = 'Downloading…',
}: {
	btnText: string;
	pendingText?: string;
}) {
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
			trackClientEvent({ type: 'reference_download', reference: 'json_crew' });
		} catch {
		} finally {
			setPending(false);
		}
	}

	return (
		<button
			type='button'
			onClick={handleDownload}
			disabled={pending}
			className={cn(
				'group inline-flex items-center gap-2 rounded-full bg-brand py-1.5 pl-6 pr-1.5 text-sm font-medium text-surface-0',
				'transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
				'hover:bg-brand-bright active:scale-[0.98] disabled:opacity-60',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0',
			)}
		>
			{pending ? pendingText : btnText}
			<span className='flex size-9 items-center justify-center rounded-full bg-surface-0/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px'>
				<Icon icon='ph:download-simple-light' width={16} height={16} aria-hidden />
			</span>
		</button>
	);
}
