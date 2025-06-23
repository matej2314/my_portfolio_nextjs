import { getBlogPost } from "@/actions/blogPosts";
import { generatePageMetadata } from "@/lib/generatePageMetadata";

import { type Metadata } from "next";
import { type DetailsBlogPostProps } from "@/types/detailsPageTypes";

export async function generateMetadata({ params }: DetailsBlogPostProps): Promise<Metadata> {
    const { postId } = await params;
    return await generatePageMetadata('blog', postId);
}

export default async function BlogPostDetailsPage({ params }: DetailsBlogPostProps) {
    const id = (await params).postId;
    const blogPostDetails = await getBlogPost(id);

    if ('error' in blogPostDetails) {
        console.error(blogPostDetails.error);
        return <p>No details for selected blog post.</p>
    };

    const selectedBlogPost = blogPostDetails.post;

    return (
        <p>{selectedBlogPost.post_title}</p>
    )
}