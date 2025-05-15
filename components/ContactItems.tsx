'use client';

import { contactItems } from "@/lib/contactItems";
import { ListItem } from "./ListItem";

export default function ContactItems() {

    return (
        <>
            <ul className="w-fit h-fit flex flex-col gap-7 pl-20">
                {contactItems.map((item) =>
                    <ListItem
                        key={item.label}
                        itemClass={item.itemClass}
                        pathName={item.pathName}
                        label={item.label}
                        iconName={item.iconName}
                        linkClass={item.linkClass}
                    />)}
            </ul>
        </>
    )
}