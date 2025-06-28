import { getBlogPosts } from "@/actions/blogPosts"

import TableWrapper from "@/components/control-panel-components/TableElementWrapper"
import { createColumns } from "@/lib/createColumnsDef"

import { type Post } from "@/types/actionsTypes/actionsTypes"
import { type VisibilityState } from "@tanstack/react-table"

export default async function ManageBlogPosts() {

    const postsColumns = createColumns<Post>([
        { key: 'id', header: 'ID' },
        { key: 'post_title', header: 'Title' },
        { key: 'post_date', header: 'Date' },
        { key: 'post_content', header: 'Content' },
        { key: 'post_imageName', header: 'Image name' },
        { key: 'post_lead', header: 'Lead text' },
    ]);

    const defaultVisibleColumns: VisibilityState = {
        id: false,
        post_content: false,
        post_imageName: false,
    };

    const postsData = await getBlogPosts();

    if ('error' in postsData) {
        console.error(postsData.error);
        return <p>Failed to fetch data.</p>
    }

    const posts = postsData.posts;

    return (
        <main className="w-full h-full flex flex-col justify-start items-center text-slate-200 mt-4">
            <section className="w-full h-fit flex justify-center rounded-md">
                <TableWrapper
                    data={posts}
                    columns={postsColumns}
                    enableColumnVisibility={true}
                    defaultColumnVisibility={defaultVisibleColumns}
                />
            </section>
        </main>
    )
}