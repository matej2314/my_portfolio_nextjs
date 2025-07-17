import { getAboutMe } from "@/actions/aboutMe";
import AboutTable from "./AboutTable";


export default async function ManageAbout() {
    const aboutMeData = await getAboutMe();

    if ('error' in aboutMeData) {
        console.error(aboutMeData.error);
        return <p>Failed to fetch data.</p>
    }

    const aboutTxt = aboutMeData.aboutMe ? [aboutMeData.aboutMe] : [];


    return (
        <main className="w-full h-full flex flex-col justify-start items-center text-slate-200 mt-4 px-6">
            <section className="w-full h-fit flex justify-center rounded-md">
                <AboutTable data={aboutTxt} />
            </section>
        </main>
    );
}