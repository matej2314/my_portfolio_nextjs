'use client';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import ContactForm from "./home-page-components/contact-section/components/ContactForm";
import ContactItems from "./home-page-components/contact-section/components/ContactItems";

export default function ContactModal() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const showModal = searchParams.get("modal") === 'contact';

    return (
        showModal && <div className="absolute w-fit h-fit justify-self-center inset-0 bg-slate-950 rounded-md border-2 border-green-200">
            <div className="text-slate-200 flex flex-col pb-3">
                <button className="w-full flex justify-end relative right-2 hover:text-green-300" onClick={router.back}>Zamknij</button>
                <div className="mb-3 flex justify-center">
                    <ContactItems />
                </div>
                <ContactForm />
            </div>
        </div >
    )
}