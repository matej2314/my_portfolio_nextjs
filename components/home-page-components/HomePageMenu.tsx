import NavLink from "../NavLink";
import { homeMenuArray } from "@/lib/homeMenuArray";

export default function HomePageMenu() {

    return (
        <ul className="text-zinc-100 text-xl flex items-center gap-x-4 mr-3 mt-1">
            {homeMenuArray.map((item, index) => (
                <li key={index} className="w-full h-full flex mx-auto text-nowrap gap-4 font-mono">
                    <NavLink
                        pathName={item.path}
                    >
                        {`${index}`}.{item.label}
                    </NavLink>
                    {index < homeMenuArray.length - 1 && <span>|</span>}
                </li>
            ))}


        </ul>
    )
}