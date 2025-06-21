import { type ReactNode } from "react";
import SiteHeader from "@/components/home-page-components/SiteHeader";

export default async function BlogLayout({ children }: { children: ReactNode }) {
    return (
        <main className="w-screen h-screen bg-[#000805] flex flex-col items-center justify-start overflow-hidden">
            <div
                id="mainSection"
                className="w-[90dvw] h-full flex flex-col justify-start gap-[0.5rem] overflow-hidden pt-2"
            >
                <SiteHeader variant="blog" />
                <div className="h-full overflow-hidden">
                    {children}
                </div>
            </div>
        </main>
    );
}
