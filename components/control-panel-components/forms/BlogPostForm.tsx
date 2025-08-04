'use client'

import { useState, useActionState } from "react";

import { saveBlogPost, updateBlogPost } from "@/actions/blogPosts";
import { getSubmitFunction } from "@/lib/utils/getSubmitFunction"

import LabelElement from "@/components/ui/elements/LabelElement"
import InputElement from "@/components/ui/elements/InputElement"
import InputFileElement from "@/components/ui/elements/InputFileElement"
import SubmitBtn from "@/components/ui/elements/SubmitButton"
import TextAreaElement from "@/components/ui/elements/TextareaElement";
import MarkdownEditor from "@/components/control-panel-components/MarkdownEditor";
import DisplayFormMessage from "@/components/home-page-components/contact-section/components/DisplayFormMessage";
import FormTitle from "./components/FormTitle";

import { type BlogPostFormProps } from '@/types/forms/blog-post-form';

export default function BlogPostForm({ blogPostData, mode = 'create' }: BlogPostFormProps) {
    const [postContent, setPostContent] = useState<string>(blogPostData?.post_content || '');

    const submitFunction = getSubmitFunction({
        create: saveBlogPost,
        edit: updateBlogPost
    }, mode);

    const [state, formAction] = useActionState(submitFunction, { success: false, error: '' })

    return (
        <main className="w-full flex flex-col gap-4 items-center text-slate-200 overflow-y-auto no-scrollbar ">
            {state?.success && <DisplayFormMessage messages={state?.message} type="success" />}
            {state?.success === false && <DisplayFormMessage messages={state?.error} type="error" />}
            <FormTitle editTitle="Edit blog post" createTitle="Create new blog post" mode={mode} />
            <form action={formAction} className="w-full max-w-[40rem] flex flex-col items-center gap-4">
                {mode === 'edit' && <input type="hidden" name="id" value={blogPostData?.id} />}
                <LabelElement
                    htmlFor="post_title"
                    className="font-bold pb-1 ml-2 text-lg tracking-wide"
                >
                    Title:
                </LabelElement>
                <InputElement type="text" name="post_title" id="post_title" placeholder="Enter title" className="text-md pl-2 tracking-wide w-[16rem]" required />
                <LabelElement
                    htmlFor="post_lead"
                    className="font-bolg pb-1 ml-2 text-lg tracking-wide "
                >
                    Enter post lead
                </LabelElement>
                <TextAreaElement id="post_lead" name="post_lead" placeholder="Enter lead" className="w-full h-[10rem] ml-2 resize-none" required />
                <LabelElement
                    htmlFor="post_content"
                    className="font-bolg pb-1 ml-2 text-lg tracking-wide "
                >
                    Enter post content
                </LabelElement>
                <MarkdownEditor
                    value={postContent}
                    onChange={(val) => setPostContent(val)}
                    wrapperClassName="w-[60rem] ml-2"
                    height={300}
                />
                <InputFileElement
                    name="post_image"
                    id="post_image"
                    placeholder="Choose a file"
                    className="text-md tracking-wide w-[25rem]"
                />
                <SubmitBtn
                    pendingTxt="Adding post..."
                    idleTxt="Add post"
                    backgroundColor="bg-yellow-500"
                    hoverClass="hover:bg-yellow-600"
                />
            </form>
        </main >
    )
}





