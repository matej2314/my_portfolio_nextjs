'use client';

import { TableElement } from "../ui/elements/TableElement";
import { type ColumnDef } from "@tanstack/react-table";


interface TableWrapperProps<TData extends object> {
    data: TData[];
    columns: ColumnDef<TData>[];
    enableColumnVisibility?: boolean;
}


export default function TableWrapper<TData extends object>({
    data,
    columns,
    enableColumnVisibility = true,

}: TableWrapperProps<TData>) {




    function editHandler() {
        console.log('Edit')
    };

    function deleteHandler() {
        console.log('Delete');
    };



    return (
        <div className="w-full h-full flex z-0">
            <TableElement
                data={data}
                columns={columns}
                onEdit={editHandler}
                onDelete={deleteHandler}
                enableColumnVisibility={enableColumnVisibility}
            />
        </div>

    )
}