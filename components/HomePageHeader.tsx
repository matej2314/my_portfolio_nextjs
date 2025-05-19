import HomePageMenu from "./home-page-components/HomePageMenu";

export default function HomePageHeader() {
    return (
        <header id="headerSection" className="w-full h-fit flex justify-end">
            <HomePageMenu />
        </header>
    );
}
