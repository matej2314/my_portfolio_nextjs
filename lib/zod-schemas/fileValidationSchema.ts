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

export const cvFileSchema = z
	.instanceof(File)
	.refine(file => file.size > 0, {
		message: 'Cv file is required.',
	})
	.refine(
		file => {
			const ext = file.name.split('.').pop()?.toLowerCase();
			return ext === 'pdf';
		},
		{
			message: 'Only PDF file is allowed.',
		}
	)
	.refine(
		file => {
			const fileName = file.name.toLowerCase();
			const pattern = /^CV - [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(_en)?\.pdf$/;
			return pattern.test(fileName);
		},
		{
			message: 'Invalid file name.',
		}
	);
