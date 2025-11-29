import { deleteCourse } from '@/actions/courses';
import { deleteProject } from '@/actions/projects';
import { deleteSkill } from '@/actions/skills';
import { deleteBlogPost } from '@/actions/blogPosts';

import { type DataType, type DeleteFunction } from '@/types/utils/get-delete-function';

export const DELETE_FUNCTIONS: Record<DataType, DeleteFunction> = {
	course: deleteCourse,
	project: deleteProject,
	skill: deleteSkill,
	blogPost: deleteBlogPost,
	// experience: deleteExperience,
} as const;

export const isSupportedDataType = (dataType: string): dataType is DataType => {
	return Object.keys(DELETE_FUNCTIONS).includes(dataType);
};

export const getDeleteFunction = (dataType: DataType): DeleteFunction => {
	const deleteFunction = DELETE_FUNCTIONS[dataType];

	const validDataType = isSupportedDataType(dataType);

	if (!validDataType) {
		throw new Error(`Unknown or unsupported data type: ${dataType}`);
	}
	return deleteFunction;
};
