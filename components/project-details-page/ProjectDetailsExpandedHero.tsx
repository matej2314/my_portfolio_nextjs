import Image from 'next/image';

import ProjectDetailsBackNav from '@/components/project-details-page/ProjectDetailsBackNav';

import { type Project } from '@/types/actionsTypes/actionsTypes';

type Props = {
    project: Project;
    coverSrc: string | undefined;
    techLine: string;
    leadText: string;
    navMode: 'intercept' | 'page';
};

export default function ProjectDetailsExpandedHero({
    project,
    coverSrc,
    techLine,
    leadText,
    navMode,
}: Props) {
    return (
        <div className="w-full pt-4">
            <div className="relative isolate min-h-[280px] w-full overflow-hidden rounded-t-xl">
                {coverSrc ? (
                    <Image
                        src={coverSrc}
                        alt={project.project_name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 90vw, 95vw"
                        priority={navMode === 'intercept'}
                    />
                ) : (
                    <div className="absolute inset-0 bg-[#0c0c0c]" aria-hidden />
                )}
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/35"
                    aria-hidden
                />
                <div className="relative z-10 flex min-h-[280px] flex-col justify-between gap-3 p-6">
                    <ProjectDetailsBackNav
                        projectName={project.project_name}
                        mode={navMode}
                    />
                    <div className="flex flex-col gap-3">
                        <h1 className="text-3xl font-semibold tracking-wide text-[#fbbf24] sm:text-4xl">
                            {project.project_name}
                        </h1>
                        <p className="text-base font-semibold text-[#64748b]">{techLine}</p>
                        {leadText ? (
                            <p className="text-base font-normal leading-relaxed text-[#94a3b8]">
                                {leadText}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
