import { type ReactNode } from "react"

export default async function ControlLayout({ children }: { children: ReactNode }) {

    return (
        <main className="w-full h-full bg-[#000805] no-scrollbar relative">
            <section className="w-full h-full flex">
                {children}
            </section>

        </main>
    )
}