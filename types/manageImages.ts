export type SaveImagesResult = {
	projectId?: string;
	mainFileName?: string;
	mainFilesSaved?: number;
	galleryFilesSaved?: number;
	mainFilesDeleted?: number;
	galleryFilesDeleted?: number;
};

export interface OptionsObject {
	mode: 'save' | 'update' | 'delete';
	clearExisting: boolean;
}
