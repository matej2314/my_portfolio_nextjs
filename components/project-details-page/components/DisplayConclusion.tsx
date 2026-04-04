import { getTranslations } from 'next-intl/server';

import { type Project } from '@/types/actionsTypes/actionsTypes';

export default async function DisplayConclusion({
    selectedProject,
    locale,
    variant = 'default',
}: {
    selectedProject: Project;
    locale: string;
    variant?: 'default' | 'pen';
}) {
    const t = await getTranslations('projectDetailsPage');
    const text = locale === 'en' ? selectedProject.conclusion : selectedProject.conclusion_pl;

    if (variant === 'pen') {
        return (
            <section className="flex w-full min-w-0 flex-col gap-3">
                <h2 className="text-[13px] font-semibold tracking-wide text-[#facc15]">{t('conclusion')}</h2>
                <p className="text-sm font-normal leading-relaxed text-[#94a3b8]">{text}</p>
            </section>
        );
    }

    return (
        <div className="flex h-fit w-full flex-col items-center justify-center gap-4">
            <h2 className="text-3xl text-yellow-300">{t('conclusion')}</h2>
            <p className="text-justify font-kanit font-semibold tracking-wide">{text}</p>
        </div>
    );
}