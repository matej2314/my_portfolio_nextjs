import BlogPostForm from "@/components/control-panel-components/forms/BlogPostForm"

export default function AddBlogPost() {
    return (
        <main className="w-full h-full flex justify-center items-start overflow-y-auto no-scrollbar">
            <BlogPostForm mode="create" />
        </main>
    )
}