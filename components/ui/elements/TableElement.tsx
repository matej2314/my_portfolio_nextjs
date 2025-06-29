'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    VisibilityState,
} from "@tanstack/react-table"
import { useState } from "react";

import { ColumnVisibilityDropdown } from "@/components/control-panel-components/ColumnVisibilityDropdown";
import IconButton from "./IconButton";


type TableElementProps<TData extends object> = {
    data: TData[];
    columns: ColumnDef<TData, unknown>[];
    enableColumnVisibility?: boolean;
    defaultColumnVisibility?: VisibilityState;
    onEdit?: (rowData: TData) => void;
    onDelete?: (rowData: TData) => void;
};


export function TableElement<TData extends object>({
    data,
    columns,
    enableColumnVisibility = false,
    defaultColumnVisibility = {},
    onEdit,
    onDelete,
}: TableElementProps<TData>) {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        enableColumnVisibility ? defaultColumnVisibility : {}
    )

    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div>
            {enableColumnVisibility && (
                <div className="flex justify-end mb-2">
                    <ColumnVisibilityDropdown table={table} />
                </div>
            )}
            <div className="w-full table-fixed z-0 border-2 border-slate-200 rounded-md">
                <Table className="z-0">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="z-0">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-slate-200 text-center">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                                <TableHead className="text-slate-200">Actions</TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="hover:bg-transparent">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className=" text-center break-words whitespace-pre-wrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <IconButton
                                                onClick={() => onEdit?.(row.original)}
                                                iconCode="fluent-color:edit-16"
                                                title="Edit element button"
                                                className="bg-transparent text-blue-500  w-[2rem] h-[2rem] hover:text-blue-600 hover:bg-transparent hover:underline"
                                            />
                                            <IconButton
                                                onClick={() => onDelete?.(row.original)}
                                                iconCode="uiw:delete"
                                                title="Delete element button"
                                                className="bg-transparent text-red-500 hover:bg-transparent hover:underline"
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="text-center">
                                    No data.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}