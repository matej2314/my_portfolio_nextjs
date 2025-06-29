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
            className="w-1/3 h-fit flex flex-col items-center justify-center gap-3 px-5 pb-5 bg-linear-green text-slate-200 rounded-md border-[1px] border-slate-200"
        >
            <h2 className="text-3xl">Log in</h2>
            <Label
                htmlFor="email"
                className="text-lg"
            >
                Type your e-mail:
            </Label>
            <Input
                type="email"
                id="email"
                name="email"
                className="text-lg pl-5"
            />
            <Label
                htmlFor="password"
            >
                Type your password:
            </Label>
            <Input
                type="password"
                id="password"
                name="password"
            />
            {state?.error && <p className="text-red-700">{state.error}</p>}
            <SubmitBtn
                backgroundColor="bg-yellow-200"
                hoverClass="hover:bg-yellow-300"
                pendingTxt="Logging in..."
                idleTxt="Log in"
            />
        </form>
    )
}