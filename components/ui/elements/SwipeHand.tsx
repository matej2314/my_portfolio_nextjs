'use client';

import { Icon } from '@iconify/react';
import { motion, easeInOut } from 'framer-motion';

interface SwipeHandProps {
    width?: number;
    height?: number;
}

export default function SwipeHand({ width = 50, height = 50 }: SwipeHandProps) {

    return (
        <div className='relative w-fit h-fit pointer-events-none select-none block text-slate-200 lg:hidden'>
            <motion.div
                className='relative-z-10'
                initial={{ x: 0, opacity: 0 }}
                whileInView={{ x: [0, -20, 0], opacity: [0, 1, 0] }}
                transition={{
                    duration: 1.2,
                    repeat: 2,
                    ease: easeInOut
                }}
            >
                <Icon icon='la:hand-pointer' fill='white' width={width} height={height} color='white' />
            </motion.div>
        </div>
    )
}