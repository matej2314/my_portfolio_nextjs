'use client';

import { Icon } from '@iconify/react';

export type ListItemType = {
    itemClass: string;
    iconName: string;
    linkClass: string;
    label: string;
    pathName: string;
}

export const ListItem = ({ itemClass, linkClass, iconName, label, pathName }: ListItemType) => {

    return (
        <li className={itemClass}>
            <a href={pathName} className={linkClass}>
                <Icon icon={iconName} width={30} />
                <span className='text-lg'>{label}</span>
            </a>
        </li>
    )
}