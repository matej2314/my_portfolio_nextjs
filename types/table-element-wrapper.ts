import { ColumnDef, VisibilityState } from '@tanstack/react-table';

export interface TableWrapperProps<TData extends { id: string }> {
	data: TData[];
	columns: ColumnDef<TData>[];
	enableColumnVisibility?: boolean;
	defaultColumnVisibility?: VisibilityState;
	onDelete?: boolean;
	basePath?: string;
}
