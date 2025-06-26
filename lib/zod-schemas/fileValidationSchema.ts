import { z } from 'zod';

const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

export const mainFilesSchema = z
	.array(z.instanceof(File))
	.nonempty({ message: 'Minimum 1 file required.' })
	.refine(files => files.length <= 3, {
		message: 'Maximum 3 files.',
	})
	.refine(
		files =>
			files.every(file => {
				const ext = file.name.split('.').pop()?.toLowerCase();
				return allowedExtensions.includes(ext || '');
			}),
		{ message: `Allowed extensions: ${allowedExtensions.join(',')}` }
	);

export const galleryFilesSchema = z
	.array(z.instanceof(File))
	.nonempty({ message: 'Minimum 1 file required.' })
	.refine(files => files.length <= 7, {
		message: 'Maximum 7 files.',
	})
	.refine(
		files =>
			files.every(file => {
				const ext = file.name.split('.').pop()?.toLowerCase();
				return allowedExtensions.includes(ext || '');
			}),
		{ message: `Allowed extensions: ${allowedExtensions.join(',')}` }
	);
