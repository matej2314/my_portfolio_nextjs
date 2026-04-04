'use client';

import { useTranslations } from 'next-intl';

import ExternalLink from '@/components/links/ExternalLink';

type Props = {
    stackSummary: string;
    demoUrl: string;
    repoUrl: string | null;
};

/** Makietowy `pdMeta`: jedna linia stack + linki Demo · Repo */
export default function ProjectDetailsMetaRow({ stackSummary, demoUrl, repoUrl }: Props) {
    const t = useTranslations('projectDetailsPage');

    return (
        <div className="flex w-full min-w-0 flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-8">
            <p className="text-center text-[13px] font-semibold leading-snug text-[#64748b] sm:text-left">
                {stackSummary}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-2 text-sm font-semibold sm:justify-end">
                {demoUrl ? (
                    <ExternalLink
                        href={demoUrl}
                        className="text-[#facc15] underline-offset-2 hover:underline"
                        initialColor="#facc15"
                        hoverColor="#fbbf24"
                        targetColor="#facc15"
                    >
                        {t('metaDemo')}
                    </ExternalLink>
                ) : (
                    <span className="text-[#64748b]">{t('metaDemo')}</span>
                )}
                {demoUrl && repoUrl ? (
                    <span className="text-[#64748b]" aria-hidden>
                        ·
                    </span>
                ) : null}
                {repoUrl ? (
                    <ExternalLink
                        href={repoUrl}
                        className="text-[#facc15] underline-offset-2 hover:underline"
                        initialColor="#facc15"
                        hoverColor="#fbbf24"
                        targetColor="#facc15"
                    >
                        {t('metaRepo')}
                    </ExternalLink>
                ) : (
                    <span className="text-[#64748b]">{t('metaRepo')}</span>
                )}
            </div>
        </div>
    );
}
