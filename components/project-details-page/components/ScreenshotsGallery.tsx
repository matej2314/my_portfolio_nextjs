'use client';

import { useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import Image from "next/image";
import { motion } from "framer-motion";

export default function ScreenshotsGallery({ paths }: { paths: string[] }) {


    const autoplay = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    function handleMouseEnter() {
        autoplay.current.stop();
    };

    function handleMouseLeave() {
        if (autoplay) {
            autoplay.current.play();
        }
    }

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            viewport={{ amount: 0.4, once: false }}
            className="w-full h-full flex justify-center items-center px-4"
        >
            <Carousel
                plugins={[autoplay.current]}
                opts={{ loop: true }}
                className="w-full h-full items-center max-w-4xl">
                <CarouselContent>
                    {paths.map((path, index) => (
                        <CarouselItem
                            key={index}
                            className='w-full h-full flex justify-center items-center'
                        >
                            <Image
                                src={path}
                                alt={`Photo ${index + 1}`}
                                width={450}
                                height={430}
                                loading="lazy"
                                sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 960px"
                                className="w-fit h-fit flex justify-center"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="w-10 h-10 bg-slate-900 text-green-400 hover:text-green-800 hover:bg-slate-400" />
                <CarouselNext className="w-10 h-10 bg-slate-900 text-green-400 hover:text-green-800 hover:bg-slate-400" />
            </Carousel>

        </motion.section>
    )

}