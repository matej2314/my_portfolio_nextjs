
import { getProjectShots } from "@/actions/projects"

import ScreenshotsGallery from "./ScreenshotsGallery"

export default async function GallerySection({ projectId }: { projectId: string }) {

    const screenshots = await getProjectShots(projectId);

    if (screenshots.success === false) {
        throw new Error('Failed to get paths');
    }

    return (
        <section className="w-11/12 h-full flex justify-center items-center">
            <ScreenshotsGallery paths={screenshots.files} />
        </section>
    )
}