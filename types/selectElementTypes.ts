import { type Option } from '@/lib/langArray';

export type SelectElementProps = {
	value: string;
	onChange: (value: string) => void;
	options: Option[];
	placeholder?: string;
	className?: string;
};
