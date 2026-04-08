import { type ReactNode } from "react";
import SiteHeader from "@/components/home-page-components/SiteHeader";

export default async function BlogLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex h-[100dvh] max-h-[100dvh] w-full min-w-0 flex-col items-stretch overflow-hidden bg-linear-green">
            <div
                id="mainSection"
                className="mx-auto flex h-full min-h-0 w-full max-w-[min(100%,90dvw)] flex-col gap-2 px-3 pt-2 sm:px-5 sm:pt-3"
            >
                <SiteHeader variant="blog" />
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
                    {children}
                </div>
            </div>
        </main>
    );
}
