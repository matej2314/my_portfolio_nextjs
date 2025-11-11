'use client';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useDeviceType } from "@/hooks/useDeviceType";

import ContactForm from "./home-page-components/contact-section/components/ContactForm";
import ContactItems from "./home-page-components/contact-section/components/ContactItems";

export default function ContactModal() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const device = useDeviceType();

    const showModal = searchParams.get("modal") === 'contact';

    return (
        showModal && <div className="absolute w-fit h-fit justify-self-center inset-0 bg-radial-green rounded-md border-2 border-green-200 z-10 pt-2">
            <div className="text-slate-200 flex flex-col pb-3">
                <button 
                    className="w-full flex justify-end relative right-3 hover:text-green-300" 
                    onClick={router.back}
                    aria-label="Close contact modal"
                >
                    Zamknij
                </button>
                <div className="mb-3 flex justify-start">
                    <ContactItems />
                </div>
                <div className="self-start sm:-ml-[7.25rem]">
                    {device !== 'mobile' && <ContactForm />}
                    </div>
            </div>
        </div>
    )
}