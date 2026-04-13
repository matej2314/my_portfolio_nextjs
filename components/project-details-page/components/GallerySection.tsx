import Image from 'next/image';

import { getProjectShots } from '@/actions/projects';

import ScreenshotsGallery from '@/components/project-details-page/components/ScreenshotsGallery';

export default async function GallerySection({
    projectId,
    variant = 'default',
}: {
    projectId: string;
    variant?: 'default' | 'pen';
}) {
    const screenshots = await getProjectShots(projectId);

    if (screenshots.success === false) {
        throw new Error('Failed to get paths');
    }

    if (variant === 'pen') {
        if (screenshots.files.length === 0) return null;
        return (
            <section className="w-full min-w-0">
                <div
                    className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {screenshots.files.map((path, index) => (
                        <div
                            key={path}
                            className="relative h-[200px] w-[min(100%,320px)] min-w-[min(100%,280px)] shrink-0 snap-center overflow-hidden rounded-xl border border-[#facc15] sm:min-w-[300px]"
                        >
                            <Image
                                src={path}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 960px"
                                loading={index === 0 ? 'eager' : 'lazy'}
                            />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="flex h-full w-11/12 items-center justify-center">
            <ScreenshotsGallery paths={screenshots.files} />
        </section>
    );
}