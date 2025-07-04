import { getAboutMe } from "@/actions/aboutMe"

import TableWrapper from "@/components/control-panel-components/TableElementWrapper";
import { createColumns } from "@/lib/createColumnsDef";

import { type AboutTextType } from "@/types/actionsTypes/actionsTypes";
import { type VisibilityState } from "@tanstack/react-table";

export default async function ManageAbout() {

    const aboutMeColumns = createColumns<AboutTextType>([
        { key: 'id', header: 'ID' },
        { key: 'about_text', header: 'Text' }
    ])

    const defaultVisible: VisibilityState = {
        id: false,
    }

    const aboutMeData = await getAboutMe();

    if ('error' in aboutMeData) {
        console.error(aboutMeData.error);
        return <p>Failed to fetch data.</p>
    };

    const aboutTxt = aboutMeData.aboutMe;

    return (
        <main className="w-full h-full flex flex-col justify-start items-center text-slate-200 mt-4 px-6">
            <section className="w-full h-fit flex justify-center  rounded-md">
                <TableWrapper
                    data={aboutTxt}
                    columns={aboutMeColumns}
                    enableColumnVisibility={true}
                    defaultColumnVisibility={defaultVisible}
                />
            </section>
        </main>
    )
}