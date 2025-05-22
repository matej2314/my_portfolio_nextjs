'use client';

import { motion } from 'framer-motion';

import { contactItems } from "@/lib/contactItems";
import { ListItem } from '@/components/ListItem';

const contactItemsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            staggerChildren: 0.2
        }
    },
    exit: { opacity: 0, scale: 0.5 }
};

export default function ContactItems() {

    return (
        <>
            <motion.ul
                variants={contactItemsVariants}
                initial='hidden'
                whileInView='visible'
                exit='exit'
                className="w-fit h-fit flex flex-col gap-7 pl-20"
            >
                {contactItems.map((item) =>
                    <ListItem
                        key={item.label}
                        itemClass={item.itemClass}
                        pathName={item.pathName}
                        label={item.label}
                        iconName={item.iconName}
                        linkClass={item.linkClass}
                    />)}
            </motion.ul >
        </>
    )
}