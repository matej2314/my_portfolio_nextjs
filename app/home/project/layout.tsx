import { type ReactNode } from 'react';
import { type Metadata } from 'next';

import FloatingContactBox from '@/components/floating-contact-box/FloatingContactBox';

export const metadata: Metadata = {
    title: 'msliwowski.net | WebDev, SEO, Security',
    description: 'Webdev, SEO, Security',
};

export default function DetailsPageLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#000805] pb-8 pt-6 no-scrollbar">
            <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-4 sm:px-6">{children}</div>
            <FloatingContactBox />
        </div>
    );
}
