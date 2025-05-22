'use client'

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { motion } from 'framer-motion';

import { contactMe } from "@/actions/contact"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function SubmitBtn() {
    const { pending } = useFormStatus();
    return (
        <Button
            className="w-1/2 h-fit flex items-center justify-center bg-yellow-200 rounded-md mt-6 text-slate-950 text-3xl hover-shadow hover:bg-yellow-300"
        >
            {pending ? 'Sending...' : 'Send message'}
        </Button>
    )
}

export default function ContactForm() {
    const initialState: { success?: string, error?: any } = {};

    const [state, formAction] = useActionState(contactMe, initialState);

    return (
        <form
            action={formAction}
            className="w-full h-fit flex flex-col mx-[8rem]"
        >
            <Label
                htmlFor="client-name"
                className="font-bold pb-1 ml-2 text-lg"
            >
                Name:
            </Label>
            <Input
                type="text"
                name="client-name"
                id="client-name"
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required
            />
            <Label
                htmlFor="client-mail"
                className="font-bold pb-1 ml-2 text-lg mt-2"
            >
                E-mail:
            </Label>
            <Input
                type="email"
                name="client-mail"
                id="client-mail"
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required
            />
            <Label
                htmlFor="msg-subject"
                className="font-bold pb-1 ml-2 text-lg mt-2"
            >
                Subject:
            </Label>
            <Input
                type="text"
                name="msg-subject"
                id="msg-subject"
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required
            />
            <Label
                htmlFor="msg-content"
                className="font-bold pb-1 ml-2 text-lg mt-2"
            >
                Message:
            </Label>
            <Textarea
                id="msg-content"
                className="w-1/2 text-slate-200 text-lg p-1 border-2 border-white rounded-md"
                required
            />
            {state.error && <p>{String(state.error)}</p>}
            {state.success && <p>{state.success}</p>}
            <SubmitBtn />
        </form>
    )
}