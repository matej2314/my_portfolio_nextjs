import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import DotNavigation from "@/components/home-page-components/DotNavigation";
import HomeContent from "@/components/home-page-components/HomeContent";

import { type ReactNode } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: 'msliwowski.net | WebDev, SEO, Security',
    description: 'Webdev, SEO, Security'
}

export default async function HomePageLayout({ children}: { children: ReactNode }) {

    const locale = await getLocale();

    const messages = await getMessages({ locale });

    return (
        <main className="min-h-screen w-full bg-[#000805] flex justify-center items-start">
            <HomeContent>
                <div className="fixed right-4 sm:right-10 top-1/3 transform -translate-y-1/2 z-50">
                    <DotNavigation />
                </div>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </HomeContent>
        </main>
    )
}
