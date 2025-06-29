'use client';

import { TableElement } from "../ui/elements/TableElement";
import { type ColumnDef, VisibilityState } from "@tanstack/react-table";


interface TableWrapperProps<TData extends object> {
    data: TData[];
    columns: ColumnDef<TData>[];
    enableColumnVisibility?: boolean;
    defaultColumnVisibility?: VisibilityState
}


export default function TableWrapper<TData extends object>({
    data,
    columns,
    enableColumnVisibility = true,
    defaultColumnVisibility = {}

}: TableWrapperProps<TData>) {




    function editHandler() {
        console.log('Edit')
    };

    function deleteHandler() {
        console.log('Delete');
    };



    return (
        <div className="w-full h-full flex justify-center z-0 select-none">
            <TableElement
                data={data}
                columns={columns}
                onEdit={editHandler}
                onDelete={deleteHandler}
                enableColumnVisibility={enableColumnVisibility}
                defaultColumnVisibility={defaultColumnVisibility}
            />
        </div>

    )
}