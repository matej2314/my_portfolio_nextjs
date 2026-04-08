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
        <div className="flex w-full min-w-0 flex-col bg-linear-green pb-6">
            <section
                id="main-blog-section"
                className="flex w-full min-w-0 flex-col items-stretch justify-start gap-6 px-1 py-4 sm:gap-8 sm:px-2 sm:py-5"
            >
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
