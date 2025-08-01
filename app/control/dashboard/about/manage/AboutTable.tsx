'use client';

import TableWrapper from "@/components/control-panel-components/TableElementWrapper";
import { createColumns } from "@/lib/utils/createColumnsDef";
import { type AboutTextType } from "@/types/actionsTypes/actionsTypes";
import { type VisibilityState } from "@tanstack/react-table";

interface AboutTableProps {
    data: AboutTextType[];
}

export default function AboutTable({ data }: AboutTableProps) {
    const aboutMeColumns = createColumns<AboutTextType>([
        { key: 'id', header: 'ID' },
        { key: 'about_text', header: 'Text' }
    ]);

    const defaultVisible: VisibilityState = {
        id: false,
    };

    return (
        <TableWrapper
            data={data}
            columns={aboutMeColumns}
            enableColumnVisibility={true}
            defaultColumnVisibility={defaultVisible}
            basePath="/control/dashboard/about/manage"
            onDelete={false}
        />
    );
}