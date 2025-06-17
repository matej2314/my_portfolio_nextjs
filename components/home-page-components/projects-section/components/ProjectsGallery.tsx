'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { type ProjectsGalleryProps } from "@/types/ProjectsGalleryTypes";

export default function ProjectsGallery({ projects, images }: ProjectsGalleryProps) {

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ amount: 0.4, once: false }}
            className="w-[90dvw] h-full flex justify-center items-center px-4"
        >
            <Carousel className="w-10/12 md:w-full max-w-5xl">
                <CarouselContent>
                    {projects.map((project) => {
                        const projectImages = images.find(img => img.id === project.id);
                        const coverImage = projectImages?.images?.[0];

                        if (!coverImage) return null;

                        return (
                            <CarouselItem
                                key={project.id}
                                className="md:basis-1/2 lg:basis-1/3 px-2">
                                <Link
                                    href={`/home/project/${project.id}`}
                                    className="block group"
                                >
                                    <div className="relative w-full h-64 overflow-hidden rounded-xl shadow-md">
                                        <Image
                                            src={coverImage}
                                            alt={project.project_name}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                            width={500}
                                            height={300}
                                        />
                                    </div>
                                    <div className="mt-2 text-center">
                                        <h3 className="text-lg font-kanit font-semibold text-slate-200 hover:scale-110">
                                            {project.project_name}
                                        </h3>
                                    </div>
                                </Link>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious className="w-10 h-10 bg-slate-900 text-green-400 hover:text-green-800 hover:bg-slate-400" />
                <CarouselNext className="w-10 h-10 bg-slate-900 text-green-400 hover:text-green-800 hover:bg-slate-400" />
            </Carousel>
        </motion.section>
    )
}