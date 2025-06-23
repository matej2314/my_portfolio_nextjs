import { getBlogPosts } from "@/actions/blogPosts";
import { generatePageMetadata } from "@/lib/generatePageMetadata";

import ShortBlogPost from "@/components/blog-page-components/ShortBlogPost";

export async function generateMetadata() {
    return generatePageMetadata('page', null, {
        title: 'Blog | msliwowski.net',
        description: 'Check interesting blog posts about Web development, IT Security and SEO!'
    });
};

export default async function BlogPage() {

    const posts = await getBlogPosts();

    if ('error' in posts) {
        return <p>No blog posts</p>
    };

    const postsToDisplay =
        posts.posts.length === 0
            ? [
                {
                    id: "demo-1",
                    post_title: "Testowy wpis",
                    post_lead:
                        "To przykładowy lead do wpisu blogowego — jeśli go widzisz - skontaktuj się z właścicielem strony",
                    post_content: "Markdown **content** z testowego wpisu.",
                    post_date: new Date(),
                    post_imageName: "default.jpg",
                },
            ]
            : posts.posts;

    return (
        <div className="w-full h-full flex flex-col bg-linear-green overflow-hidden">
            <section id="main-blog-section" className="w-full h-full flex flex-col justify-start items-start px-4 py-5 gap-6.5">
                {postsToDisplay.length === 0 ? (
                    <p className="text-white">No posts yet — check back later!</p>
                ) : (
                    postsToDisplay.map(post => (
                        <ShortBlogPost
                            key={post.id}
                            id={post.id}
                            title={post.post_title}
                            lead={post.post_lead ?? undefined}
                            date={post.post_date}
                            imageName={post.post_imageName ?? undefined}
                        />
                    ))
                )}
            </section>
        </div>
    );
}
