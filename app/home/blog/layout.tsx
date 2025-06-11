import { type ReactNode } from "react";

import SiteHeader from "@/components/home-page-components/SiteHeader";

export const dynamic = 'force-dynamic';

export default async function BlogLayout({ children }: { children: ReactNode }) {

    return (
        <main className="w-screen h-full bg-[#0c0c0c] pt-2 flex justify-center items-center no-scrollbar relative">
            <div id="mainSection" className="w-[90%] h-full flex flex-col justify-start gap-4 border-2 border-slate-200">
                <SiteHeader variant="blog" />
                {children}
            </div>
        </main>
    )
}