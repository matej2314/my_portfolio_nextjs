export interface SwitchElementProps {
	id: string;
	name: string;
	checked?: boolean;
	label?: string;
	labelPosition?: 'left' | 'right';
	size?: 'sm' | 'md' | 'lg';
	onChange?: (checked: boolean) => void;
	containerClassName?: string;
}
