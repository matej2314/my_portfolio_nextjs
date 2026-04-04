import { defaultData } from "@/lib/defaultData";
import TechList from "./TechList";

export default function HomeSubHeader() {
	const contentArray = defaultData.baseSectionSubHeader.content;
	return (
		<p className="mb-1 mt-1 text-center font-inter text-md md:text-2xl leading-normal text-yellow-300 xl:text-3xl">
			<TechList techArray={contentArray} />
		</p>
	);
}
