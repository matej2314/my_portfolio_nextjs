import { getAboutMe } from '@/actions/aboutMe'

import EditAboutMe from '@/components/control-panel-components/forms/EditAboutMe';
import { type AboutTextType } from '@/types/actionsTypes/actionsTypes';
import { type Params } from '@/types/controlPanel';


export default async function AboutAction({ params }: Params) {
    const { action } = await params;

    if (action === 'edit') {
        const aboutMe = await getAboutMe();

        if ('error' in aboutMe) {
            console.error(aboutMe.error)
            return <p>Failed to fetch data.</p>
        }

        const aboutMeData = aboutMe.aboutMe as AboutTextType;

        return <EditAboutMe initialData={aboutMeData} />
    } else {
        return (
            <main className="w-full h-full flex flex-col justify-center items-center text-slate-200">
                <p>Invalid action</p>
            </main>
        )
    }
}