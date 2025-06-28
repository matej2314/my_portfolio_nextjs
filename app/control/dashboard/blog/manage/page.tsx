import { getBlogPosts } from "@/actions/blogPosts"

export default async function ManageBlogPosts() {

    return (
        <main className="w-full h-full flex flex-col justify-start items-center text-slate-200 mt-4">
            <table className="w-11/12 h-fit">
                <tr className="border-[1px] border-slate-200">
                    <th className="px-4 py-2 border-[1px] border-slate-200">id</th>
                    <th className="px-4 py-2 border-[1px] border-slate-200">text</th>
                    <th className="px-4 py-2 border-[1px] border-slate-200">actions</th>
                </tr>
                <tr>
                    <td className="border-[1px] border-slate-200 px-2"></td>
                    <td className="border-[1px] border-slate-200 text-justify px-4 py-2"></td>
                    <td className="w-full h-full flex justify-center items-center border-[1px] border-slate-200">
                        <div>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </td>
                </tr>
            </table>
        </main>
    )
}