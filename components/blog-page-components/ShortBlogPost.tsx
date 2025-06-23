import NavLink from "../links/NavLink";
import BlogPostCard from "../ui/elements/BlogPostCard";

import { type BlogPostProps } from "@/types/BlogPostTypes";


export default function ShortBlogPost({
    title = 'Test post',
    lead = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda consequatur consectetur doloremque eligendi, nobis quaerat.',
    date,
    id,
    imageName = 'default.jpg',
}: BlogPostProps) {

    const formattedDate = date ?? new Date("2025-06-15");
    const displayedDate = formattedDate.toLocaleDateString("pl-PL");
    const isoDate = formattedDate.toISOString().split("T")[0];


    return (
        <BlogPostCard
            title={title}
            lead={lead}
            date={displayedDate}
            isoDate={isoDate}
            imageSrc={`/blog-posts-images/${imageName}`}
            imageAlt={`image to post ${title}`}
            buttonSlot={
                <NavLink
                    pathName={`/home/blog/${id}`}
                    variant="project"
                    title={`Read post ${title}`}
                    linkClass="w-fit h-fit hover:text-green-400"
                >
                    Read more
                </NavLink>
            }

        />
    )
}