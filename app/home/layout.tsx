import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import DotNavigation from "@/components/home-page-components/DotNavigation";
import HomeContent from "@/components/home-page-components/HomeContent";

import { type ReactNode } from "react";
import { type Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'msliwowski.net | WebDev, SEO, Security',
    description: 'Webdev, SEO, Security'
}

export default async function HomePageLayout({ children, params }: { children: ReactNode, params: { locale: string } }) {

    const { locale } = params;

    const messages = await getMessages({ locale });

    return (
        <main className="w-screen h-screen bg-[#0c0c0c] pt-8 flex justify-center items-center relative">
            <HomeContent>
                <div className="fixed right-10 top-1/3 transform -translate-y-1/2 z-50">
                    <DotNavigation />
                </div>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </HomeContent>
        </main>
    )
}
