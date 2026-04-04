import { type Project } from "@/types/actionsTypes/actionsTypes";
import { type ProjectsGalleryProps } from "@/types/ProjectsGalleryTypes";
import { type ProjectSlide } from "@/types/ProjectsGalleryTypes";

export const buildSlides = (projects: Project[], images: ProjectsGalleryProps['images'], locale: string): ProjectSlide[] => {
	const out: ProjectSlide[] = [];
	for (const project of projects) {
		const cover = images.find(i => i.id === project.id)?.images?.[0];
		if (!cover) continue;
		const excerpt = locale === 'en' ? project.project_description : project.description_pl || project.project_description;
		const techLabel = project.technologies?.split(',')[0]?.trim() || project.project_category;
		out.push({ project, coverImage: cover, excerpt: excerpt ?? '', techLabel });
	}
	return out;
}