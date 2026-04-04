'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef, useReactTable, getCoreRowModel, getFilteredRowModel,flexRender, VisibilityState } from '@tanstack/react-table';
import { useState } from 'react';

import { ColumnVisibilityDropdown } from '@/components/control-panel-components/ColumnVisibilityDropdown';
import IconButton from './IconButton';

type TableElementProps<TData extends object> = {
	data: TData[];
	columns: ColumnDef<TData, unknown>[];
	enableColumnVisibility?: boolean;
	defaultColumnVisibility?: VisibilityState;
	onEdit?: (rowData: TData) => void;
	onDelete?: (rowData: TData) => void;
	isDeleteEnable?: boolean;
};

export function TableElement<TData extends object>({ data, columns, enableColumnVisibility = false, defaultColumnVisibility = {}, onEdit, onDelete, isDeleteEnable = true }: TableElementProps<TData>) {
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(enableColumnVisibility ? defaultColumnVisibility : {});

	const table = useReactTable({
		data,
		columns,
		state: {
			columnVisibility,
		},
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	return (
		<div>
			{enableColumnVisibility && (
				<div className='flex justify-end mb-2'>
					<ColumnVisibilityDropdown table={table} />
				</div>
			)}
			<div className='w-full table-fixed z-0 overflow-hidden rounded-md border border-green-500/50'>
				<Table className='z-0'>
					<TableHeader className='bg-green-950/5'>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id} className='z-0 border-b border-emerald-600/50 bg-green-950/15 hover:bg-green-950'>
								{headerGroup.headers.map(header => (
									<TableHead key={header.id} className='bg-green-950/15 text-center text-emerald-50'>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
								<TableHead className='bg-green-950/15 text-emerald-50'>Actions</TableHead>
							</TableRow>
						))}
					</TableHeader>
					<TableBody className='bg-green-950/20'>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id} className='border-b border-emerald-700/35 hover:bg-green-700/60'>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id} className='text-center break-words whitespace-pre-wrap text-slate-100'>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
									<TableCell>
										<div className='flex gap-2'>
											<IconButton onClick={() => onEdit?.(row.original)} iconCode='fluent-color:edit-16' title='Edit element button' className='bg-slate-200 text-blue-500 w-[2rem] h-[2rem] hover:bg-slate-300 hover:text-blue-600 cursor-pointer' />
											{isDeleteEnable && <IconButton onClick={() => onDelete?.(row.original)} iconCode='uiw:delete' title='Delete element button' className='bg-slate-200 text-red-500 w-[2rem] h-[2rem] hover:bg-slate-300 cursor-pointer' />}
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow className='border-0 hover:bg-transparent'>
								<TableCell colSpan={columns.length + 1} className='text-center text-slate-200'>
									No data.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
