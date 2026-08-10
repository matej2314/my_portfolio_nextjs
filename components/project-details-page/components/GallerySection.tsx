import { getProjectShots } from '@/actions/projects';

import ProjectGalleryBento from '@/components/project-details-page/components/ProjectGalleryBento';
import ScreenshotsGallery from '@/components/project-details-page/components/ScreenshotsGallery';

export default async function GallerySection({
	projectId,
	projectName,
	variant = 'default',
}: {
	projectId: string;
	projectName?: string;
	variant?: 'default' | 'pen';
}) {
	const screenshots = await getProjectShots(projectId);

	if (screenshots.success === false) {
		throw new Error('Failed to get paths');
	}

	if (variant === 'pen') {
		if (screenshots.files.length === 0) return null;
		return <ProjectGalleryBento paths={screenshots.files} projectName={projectName || 'Project'} />;
	}

	return (
		<section className='flex h-full w-11/12 items-center justify-center'>
			<ScreenshotsGallery paths={screenshots.files} />
		</section>
	);
}
