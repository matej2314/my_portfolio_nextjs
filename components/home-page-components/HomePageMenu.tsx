import { homeMenuArray } from "@/lib/arrays/menuArrays";
import BaseMenu from "../BaseMenu";

export default function HomePageMenu() {
  return (
    <section id="home-page-menu" className="w-full">
      <BaseMenu array={homeMenuArray} />
    </section>
  );
}
