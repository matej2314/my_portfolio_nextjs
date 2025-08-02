'use client';

import { useState, useEffect } from 'react';

import { type Option } from '@/types/selectElementTypes';

interface FetchStatus {
	isLoading: boolean;
	error: string | null;
}

export const useSkillsCategories = () => {
	const [fetchStatus, setFetchStatus] = useState<FetchStatus>({
		isLoading: true,
		error: null,
	});
	const [categories, setCategories] = useState<Option[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setFetchStatus({ isLoading: true, error: null });
				const response = await fetch('/api/skills/categories');

				if (!response.ok) {
					throw new Error('Failed to fetch skills categories');
				}
				const data: string[] = await response.json();

				const categoryOptions: Option[] = data.map(category => ({
					value: category,
					label: category,
					ariaLabel: `skill category ${category}`,
				}));

				setCategories(categoryOptions);
				setFetchStatus({ isLoading: false, error: null });
			} catch (error) {
				setFetchStatus({ isLoading: false, error: 'Failed to fetch skills categories' });
			}
		};

		fetchCategories();
	}, []);

	return { categories, fetchStatus };
};
