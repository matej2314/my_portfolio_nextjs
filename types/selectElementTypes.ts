export interface Option {
	value: string;
	label: string;
	ariaLabel: string;
}

export type SelectElementProps = {
	value: string;
	onChange: (value: string) => void;
	options: Option[];
	placeholder?: string;
	className?: string;
};
