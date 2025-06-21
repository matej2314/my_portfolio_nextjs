'use client'


export default function BlogPost() {

    return (
        <div className="w-[18rem] h-[25rem] flex flex-col items-center justify-start border-2 border-slate-200 gap-3 rounded-md px-2 py-2 text-slate-200">
            <div className="w-full h-[7rem] flex justify-center items-center border-[1px] border-red-500">image</div>
            <h2>Post Title</h2>
            <p>Date: 25.05.2025</p>
            <p className="w-full h-full flex justify-center items-center border-2 border-green-500">Post Lead</p>
        </div>
    )
}