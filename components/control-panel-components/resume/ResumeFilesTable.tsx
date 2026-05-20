'use client';

import { Icon } from '@iconify/react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { type CvFileEntry } from '@/types/actionsTypes/actionsTypes';

const FILE_TYPE_ICONS: Record<string, string> = {
	pdf: 'vscode-icons:file-type-pdf',
};

function getFileTypeIcon(extension: string): string {
	return FILE_TYPE_ICONS[extension] ?? 'mdi:file-outline';
}

type ResumeFilesTableProps = {
	files: CvFileEntry[];
};

export default function ResumeFilesTable({ files }: ResumeFilesTableProps) {
	return (
		<div className='w-full table-fixed z-0 overflow-hidden rounded-md border border-green-500/50'>
			<Table className='z-0'>
				<TableHeader className='bg-green-950/5'>
					<TableRow className='z-0 border-b border-emerald-600/50 bg-green-950/15 hover:bg-green-950'>
						<TableHead className='bg-green-950/15 w-[6rem] text-center text-emerald-50'>Type</TableHead>
						<TableHead className='bg-green-950/15 text-center text-emerald-50'>File name</TableHead>
						<TableHead className='bg-green-950/15 text-center text-emerald-50'>Last modified</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className='bg-green-950/20'>
					{files.length ? (
						files.map(file => (
							<TableRow key={file.id} className='border-b border-emerald-700/35 hover:bg-green-700/60'>
								<TableCell className='text-center text-slate-100'>
									<div className='flex justify-center'>
										<Icon icon={getFileTypeIcon(file.extension)} className='text-3xl' aria-hidden />
										<span className='sr-only'>{file.extension || 'file'}</span>
									</div>
								</TableCell>
								<TableCell className='text-center break-words whitespace-pre-wrap text-slate-100'>{file.fileName}</TableCell>
								<TableCell className='text-center text-slate-100'>{file.lastModified}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow className='border-0 hover:bg-transparent'>
							<TableCell colSpan={3} className='text-center text-slate-200'>
								No data.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
