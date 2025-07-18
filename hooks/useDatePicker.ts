import { useRef } from 'react';

export const useDatePicker = () => {
	const dateInputRef = useRef<HTMLInputElement>(null);

	const handleDateInputClick = () => {
		if (dateInputRef.current) {
			dateInputRef.current.showPicker();
		}
	};

	return {
		dateInputRef,
		handleDateInputClick,
	};
};
