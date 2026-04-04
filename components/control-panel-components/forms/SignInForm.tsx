'use client';

import { useActionState } from "react";

import { login } from "@/actions/auth";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitBtn from "@/components/ui/elements/SubmitButton";

export default function SignInForm() {

    const [state, formAction] = useActionState(login, { error: '' })

    return (
        <form
            action={formAction}
            className="w-1/3 flex flex-col justify-center gap-3 px-5 py-10  text-slate-200 rounded-md border-1 border-green-800/75 font-jakarta"
        >
            <h2 className="text-3xl">Panel kontrolny</h2>
            <p className="text-sm text-slate-400">Zaloguj się, aby uzyskać dostęp do panelu kontrolnego.</p>
            <div className="w-full flex flex-col items-start justify-center gap-3 mb-4">
            <Label
                htmlFor="email"
                className="text-lg"
            >
                E-mail:
            </Label>
            <Input
                type="email"
                id="email"
                name="email"
                className="text-lg pl-5 border-green-300/75 bg-[#0f1412] hover:border-green-800/75 active:border-green-800/75 focus:border-green-800/75 focus-visible:border-green-800/75 focus:ring-0 focus-visible:ring-0"
                />
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-3">
            <Label
                htmlFor="password"
            >
                Password:
            </Label>
            <Input
                type="password"
                id="password"
                name="password"
                className="text-lg pl-5 border-green-300/75 bg-[#0f1412] hover:border-green-800/75 active:border-green-800/75 focus:border-green-800/75 focus-visible:border-green-800/75 focus:ring-0 focus-visible:ring-0"
            />
            </div>
            {state?.error && <p className="text-red-700">{state.error}</p>}
            <SubmitBtn
                backgroundColor="bg-green-600"
                hoverClass="hover:bg-green-500"
                pendingTxt="Logging in..."
                idleTxt="Log in"
                className="w-full"
            />
        </form>
    )
}