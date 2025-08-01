import { type ColumnDef } from '@tanstack/react-table';

export function createColumns<T extends object>(config: { key: keyof T; header?: string }[]): ColumnDef<T>[] {
	return config.map(({ key, header }) => ({
		accessorKey: key,
		header: header ?? String(key).toUpperCase(),
	})) as ColumnDef<T>[];
}
