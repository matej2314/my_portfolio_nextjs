
import { type ReactNode } from "react";
import { type Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'msliwowski.net | WebDev, SEO, Security',
    description: 'Webdev, SEO, Security'
}

export default function DetailsPageLayout({ children }: { children: ReactNode }) {

    return (
        <main className="h-screen bg-[#0c0c0c] pt-8 flex justify-center items-center no-scrollbar relative">
            <div id="mainSection" className="w-[90%] h-full flex flex-col justify-start gap-4">
                {children}
            </div>
        </main>
    )
}
