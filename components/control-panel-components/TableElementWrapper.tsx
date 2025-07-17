'use client';

import { useRouter } from "next/navigation";
import { TableElement } from "../ui/elements/TableElement";
import { type ColumnDef, VisibilityState } from "@tanstack/react-table";

interface TableWrapperProps<TData extends { id: string }> {
    data: TData[];
    columns: ColumnDef<TData>[];
    enableColumnVisibility?: boolean;
    defaultColumnVisibility?: VisibilityState;
    onDelete?: boolean;
    basePath?: string;
}

export default function TableWrapper<TData extends { id: string }>({
    data,
    columns,
    enableColumnVisibility = true,
    defaultColumnVisibility = {},
    basePath = "",
    onDelete = true,
}: TableWrapperProps<TData>) {
    const router = useRouter();

    const fullPath = (id: string) => !onDelete ? `${basePath}` : `${basePath}/${id}`;

    function editHandler(rowData: TData) {
        const id = rowData.id;
        router.push(`${fullPath(id)}/edit`);
    };

    function deleteHandler(rowData: TData) {
        const id = rowData.id;
        router.push(`${fullPath(id)}/delete`);
    };

    return (
        <div className="w-full h-full flex justify-center z-0 select-none">
            <TableElement
                data={data}
                columns={columns}
                onEdit={editHandler}
                onDelete={deleteHandler}
                isDeleteEnable={onDelete}
                enableColumnVisibility={enableColumnVisibility}
                defaultColumnVisibility={defaultColumnVisibility}
            />
        </div>
    )
}