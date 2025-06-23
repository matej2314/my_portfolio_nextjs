import { verifyCookie } from "@/lib/auth"
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const session = await verifyCookie();

    if (!session) {
        redirect('/control');
    };

    return (
        <section className="absolute w-full flex justify-center items-center text-slate-200">
            <p>dashboard main page</p>
        </section>
    )
}