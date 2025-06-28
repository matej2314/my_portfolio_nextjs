'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";

type ColumnVisibilityDropdownProps<TData> = {
    table: Table<TData>
}

export function ColumnVisibilityDropdown<TData>({ table }: ColumnVisibilityDropdownProps<TData>) {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm bg-yellow-400 text-slate-900 hover:bg-yellow-500">
                    Select columns
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
                    <DropdownMenuItem
                        key={column.id}
                        onClick={() => column.toggleVisibility()}
                        className={column.getIsVisible() ? 'font-medium' : 'opacity-50'}
                    >
                        {column.id}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}