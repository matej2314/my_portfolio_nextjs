'use client'

import { deleteCourse } from "@/actions/courses";
import { deleteProject } from "@/actions/projects";
import { deleteSkill } from "@/actions/skills";
import { deleteBlogPost } from "@/actions/blogPosts";

import SubmitBtn from "@/components/ui/elements/SubmitButton";
import Link from "next/link";
import { useActionState } from "react";

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
        <main className="w-full flex justify-center text-slate-200 pt-[3rem]">
            {state?.success && <p className="text-green-400">{state.message}</p>}
            {state?.success === false && <p className="text-red-400">{state.error}</p>}
            <div className="w-fit h-fit flex flex-col items-center justify-center gap-2">
                <h2 className="text-2xl font-bold text-slate-200">Are you sure you want to delete {dataType} <span className="text-yellow-400 font-bold">{name}</span> ?</h2>
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
                <Link href="/control/dashboard/courses/manage" className="text-slate-800 font-bold w-[7rem] h-fit flex items-center justify-center text-md bg-yellow-400 hover:bg-yellow-500 rounded-md p-2">
                    Cancel
                </Link>
            </div>
        </main>
    )
}