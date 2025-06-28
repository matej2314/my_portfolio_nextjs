import { getAboutMe } from "@/actions/aboutMe"

import TableWrapper from "@/components/control-panel-components/TableElementWrapper";
import { createColumns } from "@/lib/createColumnsDef";

import { type AboutTextType } from "@/types/actionsTypes/actionsTypes";


export default async function ManageAbout() {

    const aboutMeColumns = createColumns<AboutTextType>([
        { key: 'id', header: 'ID' },
        { key: 'about_text', header: 'Text' }
    ])

    const aboutMeData = await getAboutMe();

    if ('error' in aboutMeData) {
        console.error(aboutMeData.error);
        return <p>Failed to fetch data.</p>
    };

    const aboutTxt = aboutMeData.aboutMe;

    return (
        <main className="w-full h-full flex flex-col justify-start items-center text-slate-200 mt-4 px-6">
            <section className="w-full h-fit border-[1px] flex justify-center inset-ring-3 inset-ring-slate-500 border-slate-300 rounded-md">
                <TableWrapper
                    data={aboutTxt}
                    columns={aboutMeColumns}
                    enableColumnVisibility={false}
                />
            </section>
        </main>
    )
}