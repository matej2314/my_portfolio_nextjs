'use client';
import AboutTxtForm from "./AboutTxtForm";

import { type AboutTextType } from "@/types/actionsTypes/actionsTypes";

export default function EditAboutMe({ initialData }: { initialData: AboutTextType }) {

    return (
        <main className="w-full h-fit flex justify-center items-center">
            <AboutTxtForm aboutMeData={initialData} mode="edit" />
        </main>

    )
}