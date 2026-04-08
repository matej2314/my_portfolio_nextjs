import { defaultData } from "@/lib/defaultData";
import TechList from "./TechList";

export default function HomeSubHeader() {
	const contentArray = defaultData.baseSectionSubHeader.content;
	return (
		<p className="mb-1 mt-1 text-center font-inter leading-normal text-yellow-300 max-xl:text-base max-xl:leading-normal xl:text-2xl 2xl:text-3xl">
			<TechList techArray={contentArray} />
		</p>
	);
}
