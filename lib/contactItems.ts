import { type ListItemType } from "@/components/ListItem"


export const contactItems: ListItemType[] = [
    {
        label: 'matej2314',
        pathName: 'https://github.com/matej2314',
        linkClass: 'w-full flex justify-center items-center gap-2',
        itemClass: 'w-fit h-fit flex justify-center gap-4 hover:scale-150',
        iconName: 'mdi:github'
    },
    {
        label: 'mateusz-mateo2314-sliwowski',
         pathName: 'https://www.linkedin.com/in/mateusz-mateo2314-sliwowski/',
        linkClass: 'w-full flex justify-center gap-2',
        itemClass: 'w-fit h-fit flex justify-center gap-4 hover:scale-150',
        iconName: 'skill-icons:linkedin'
    },
    {
        label: 'mateo2314@gmail.com',
        pathName: 'mailto:mateo2314@gmail.com',
        linkClass: 'w-full flex justify-center gap-2',
        itemClass: 'w-fit h-fit flex justify-center gap-4 hover:scale-150',
        iconName: 'ic:outline-email'
    }
]