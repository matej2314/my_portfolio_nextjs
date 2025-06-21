import { verifyCookie } from "@/lib/auth"
import { redirect } from "next/navigation";

import { dataCounter } from "@/actions/dataCounter";

export default async function DashboardPage() {

    const session = await verifyCookie();
    const counter = await dataCounter();

    if (!session) {
        redirect('/control');
    };

    return (
        <section className="absolute w-full flex justify-center items-center text-slate-200">
            <p>dashboard main page</p>
        </section>
    )
}