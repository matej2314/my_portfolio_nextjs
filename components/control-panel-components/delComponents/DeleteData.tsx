'use client'

import Link from "next/link";
import { useActionState } from "react";

import DisplayFormMessage from "@/components/home-page-components/contact-section/components/DisplayFormMessage";
import { deleteCourse } from "@/actions/courses";
import { deleteProject } from "@/actions/projects";
import { deleteSkill } from "@/actions/skills";
import { deleteBlogPost } from "@/actions/blogPosts";

import SubmitBtn from "@/components/ui/elements/SubmitButton";



export default function DeleteData({ id, name, dataType }: { id: string, name: string, dataType: string }) {

    const deleteFunction = (() => {
        switch (dataType) {
            case 'course':
                return deleteCourse;
            case 'project':
                return deleteProject;
            case 'skill':
                return deleteSkill;
            case 'blogPost':
                return deleteBlogPost
            default:
                throw new Error(`Unknown data type: ${dataType}`);
        }
    })();

    const [state, formAction] = useActionState(deleteFunction, { success: false, error: '' });

    return (
        <main className="w-full flex flex-col items-center justify-start text-slate-200 pt-[2rem]">
            {!state?.success && <DisplayFormMessage messages={state?.error} type="error" />}
            {state?.success && <DisplayFormMessage messages={state?.message} type="success" />}
            <div className="w-full h-fit flex flex-col items-center gap-3">
                <h2 className="text-[1.4rem] font-bold text-slate-200">Are you sure you want to delete {dataType} <span className="text-yellow-400 font-bold">{name}</span> ?</h2>
                <p className="text-lg">This action cannot be undone.</p>
                <form className="w-1/2 h-fit flex justify-center" action={formAction}>
                    <input type="hidden" name="id" value={id} />
                    <SubmitBtn
                        pendingTxt="Deleting..."
                        idleTxt="Delete"
                        backgroundColor="bg-yellow-400"
                        hoverClass="hover:bg-yellow-500"

                    />
                </form>
                <Link href="/control/dashboard/courses/manage" className="text-slate-800 text-2xl font-bold w-[7rem] h-fit flex items-center justify-center text-md bg-yellow-400 hover:bg-yellow-500 rounded-md p-2">
                    Cancel
                </Link>
            </div>
        </main>
    )
}