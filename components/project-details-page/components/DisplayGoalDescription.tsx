import { getTranslations } from 'next-intl/server';

import { type Project } from '@/types/actionsTypes/actionsTypes';

export default async function DisplayGoalDescription({
    selectedProject,
    locale,
    variant = 'default',
}: {
    selectedProject: Project;
    locale: string;
    variant?: 'default' | 'pen';
}) {
    const t = await getTranslations('projectDetailsPage');

    const goal = locale === 'en' ? selectedProject.goal : selectedProject.goal_pl;
    const longText = locale === 'en' ? selectedProject.long_text : selectedProject.long_text_pl;

    if (variant === 'pen') {
        return (
            <div className="flex w-full min-w-0 flex-col gap-10">
                <section className="flex flex-col gap-3">
                    <h2 className="text-[13px] font-semibold tracking-wide text-[#facc15]">
                        {t('goalLabel')}
                    </h2>
                    <p className="text-sm font-normal leading-relaxed text-[#94a3b8]">{goal}</p>
                </section>
                <section className="flex flex-col gap-3">
                    <h2 className="text-[13px] font-semibold tracking-wide text-[#facc15]">
                        {t('assumptionsLabel')}
                    </h2>
                    <p className="text-sm font-normal leading-relaxed text-[#94a3b8]">{longText}</p>
                </section>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col items-center gap-4">
            <h2 className="font-kanit text-3xl tracking-wide text-yellow-300">{t('goalLabel')}</h2>
            <p className="text-justify font-kanit font-semibold tracking-wide">{goal}</p>
            <h2 className="font-kanit text-3xl tracking-wide text-yellow-300">{t('descriptionLabel')}</h2>
            <p className="text-justify font-kanit text-base font-semibold leading-[1.7rem] tracking-wide">
                {longText}
            </p>
        </div>
    );
}