import { z } from 'zod';

const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

/** Ostatnie rozszerzenie z nazwy pliku (basename), trim — unika fałszywych błędów przy spacji/CR po `.pop()`. */
function fileExtension(fileName: string): string {
	const base = (fileName.split(/[/\\]/).pop() ?? '').trim();
	const lastDot = base.lastIndexOf('.');
	if (lastDot === -1 || lastDot >= base.length - 1) return '';
	return base.slice(lastDot + 1).trim().toLowerCase();
}

export const mainFilesSchema = z
	.array(z.instanceof(File))
	.nonempty({ message: 'Minimum 1 file required.' })
	.refine(files => files.length <= 3, {
		message: 'Maximum 3 files.',
	})
	.refine(
		files =>
			files.every(file => {
				const ext = fileExtension(file.name);
				return allowedExtensions.includes(ext);
			}),
		{ message: `Allowed extensions: ${allowedExtensions.join(',')}` }
	)
	.refine(files => files.every(file => file.size <= maxFileSize), { message: `Each file must be smaller than 5MB.` });

export const galleryFilesSchema = z
	.array(z.instanceof(File))
	.nonempty({ message: 'Minimum 1 file required.' })
	.refine(files => files.length <= 7, {
		message: 'Maximum 7 files.',
	})
	.refine(
		files =>
			files.every(file => {
				const ext = fileExtension(file.name);
				return allowedExtensions.includes(ext);
			}),
		{ message: `Allowed extensions: ${allowedExtensions.join(',')}` }
	)
	.refine(files => files.every(file => file.size <= maxFileSize), { message: `Each file must be smaller than 5MB.` });

export const cvFileSchema = z
	.instanceof(File)
	.refine(file => file.size > 0, {
		message: 'Cv file is required.',
	})
	.refine(
		file => {
			return fileExtension(file.name) === 'pdf';
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
