import NavLink from "./NavLink"

import { type MenuItem } from "@/lib/menuArrays"

export default function BaseMenu({ array }: { array: MenuItem[] }) {

    return (
        <ul className="text-zinc-100 text-xl flex items-center gap-x-4 mr-3 mt-1">
            {array.map((item, index) => (
                <li
                    key={index}
                    className="w-full h-full flex mx-auto text-nowrap gap-4 font-mono">
                    <NavLink
                        pathName={item.path}
                        variant={item.variant}
                    >
                        {`${index + 1}`}.{item.label}
                    </NavLink>
                    {index < array.length - 1 && <span>|</span>}
                </li>
            ))}
        </ul>
    )

}