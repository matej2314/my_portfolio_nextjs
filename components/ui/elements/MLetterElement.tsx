import { motion, easeInOut } from 'framer-motion';

import { type AnimatedMProps } from '@/types/AnimatedMTypes';

export default function MLetter({
    size = 110,
    duration = 1.5,
    colors = ['#38a169', '#facc15', '#38a169'],
    mode = 'animated'
}: AnimatedMProps) {
    const height = (size * 130) / 110;

    if (mode === 'button') {
        return (
            <svg
                width={size}
                height={height}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className={` fill-yellow-400`}
            >
                <rect x="0" y="0" width="10" height="65" />
                <rect x="0" y="0" width="10" height="65" transform="translate(-20, -42) rotate(135 20 60)" />
                <rect x="0" y="0" width="10" height="65" transform="translate(30, 25) rotate(45 60 60)" />
                <rect x="90" y="0" width="10" height="65" />
            </svg>
        )
    }

    return (
        <motion.svg
            width="110"
            height="130"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ fill: '#4ade80' }}
            animate={{
                fill: colors,
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: easeInOut,
            }}
            aria-label="M letter"
            role="img"
        >
            <rect x="0" y="0" width="10" height="65" />
            <rect
                x="0"
                y="0"
                width="10"
                height="65"
                transform="translate(-20, -42) rotate(135 20 60)"
            />
            <rect
                x="0"
                y="0"
                width="10"
                height="65"
                transform="translate(30, 25) rotate(45 60 60)"
            />
            <rect x="90" y="0" width="10" height="65" />
        </motion.svg>
    )
}