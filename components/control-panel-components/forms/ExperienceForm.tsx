'use client';

// import { useActionState } from "react";

// import FormTitle from "./components/FormTitle";
// import { getSubmitFunction } from "@/lib/utils/getSubmitFunction";
// // import { saveExperience, updateExperience } from "@/actions/experience";
import { type ExperienceFormProps } from '@/types/forms/experience-form';


export default function ExperienceForm({ experienceData, mode = 'create' }: ExperienceFormProps) {

// const submitFunction = getSubmitFunction({
//     create: saveExperience,
//     edit: updateExperience
// }, mode);



    return (
        <main className="w-full h-full flex flex-col justify-center items-center text-slate-200"></main>
    )
}