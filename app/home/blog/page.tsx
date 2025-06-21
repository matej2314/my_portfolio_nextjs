import BlogPost from "@/components/blog-page-components/BlogPost";

export default function BlogPage() {
    return (
        <div className="w-full h-full flex flex-col">
            <section id="main-blog-section" className="w-full h-full flex flex-col justify-start items-start border-2 border-slate-200 px-2 py-2 gap-6.5">
                <section id="post-category-selector" className="w-full h-[2rem] flex justify-center items-center text-slate-200 pt-5 gap-3">
                    <button className="w-[5rem] h-[3rem] border-2 border-slate-400 rounded-md">Cat 1</button>
                    <button className="w-[5rem] h-[3rem] border-2 border-slate-400 rounded-md">Cat 2</button>
                    <button className="w-[5rem] h-[3rem] border-2 border-slate-400 rounded-md">Cat 3</button>
                </section>
                <BlogPost />
            </section>
        </div>
    );
}
