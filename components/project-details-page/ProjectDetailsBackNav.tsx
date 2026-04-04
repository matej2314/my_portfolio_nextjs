'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useProjectInterceptClose } from '@/components/project-details-page/ProjectInterceptCloseContext';

type Props = {
    projectName: string;
    mode: 'intercept' | 'page';
};

export default function ProjectDetailsBackNav({ projectName, mode }: Props) {
    const router = useRouter();
    const requestClose = useProjectInterceptClose();
    const t = useTranslations('homePage.projectsSection');

    return (
        <div className="flex w-full flex-row items-center justify-between gap-4">
            {mode === 'page' ? (
                <Link
                    href="/home#projectsSection"
                    scroll
                    className="text-left text-sm font-semibold text-[#facc15] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#facc15]"
                >
                    {t('backToProjects')}
                </Link>
            ) : (
                <button
                    type="button"
                    onClick={() => {
                        if (requestClose) void requestClose();
                        else router.back();
                    }}
                    className="text-left text-sm font-semibold text-[#facc15] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#facc15]"
                >
                    {t('backToProjects')}
                </button>
            )}
        </div>
    );
}
