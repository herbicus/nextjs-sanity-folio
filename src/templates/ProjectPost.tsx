"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import dynamic from "next/dynamic";
import RichText from "@/components/Richtext";

import { urlFor } from "@/sanity/lib/image";

// Lazy load VideoPlayer to reduce initial bundle size
const VideoPlayer = dynamic(() => import("@/components/Media/VideoPlayer"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video lg:max-w-2xl ring-1 ring-gray-200 mx-auto bg-gray-500 animate-pulse rounded-lg flex items-center justify-center" />
  ),
});

interface ProjectPostProps {
  project: {
    title: string;
    slug: any;
    category?: string;
    projectUrl?: string;
    description: any;
    thumbnail?: any;
    videos?: string[];
    images: any;
    sortOrder?: number;
  };
  className?: string;
}

const ProjectPost: React.FC<ProjectPostProps> = ({ project, className }) => {
  return (
    <div className={clsx("site-container site-max-w py-10", className)}>
      <div className="grid grid-cols-1 md:grid-cols-12">
        <section className="col-span-1 sm:col-span-6 md:col-span-4 space-y-4">
          <h1 className="text-gray-900 text-3xl font-bold md:text-4xl">
            {project.title}
          </h1>

          <h2 className="text-slate-800 text-sm uppercase font-bold tracking-wide">
            {project.category}
          </h2>

          <RichText content={project.description} />

          {project.projectUrl ? (
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/"
                className="text-gray-800 flex items-center gap-x-1 text-sm font-semibold uppercase transition hover:border-0 hover:text-secondary"
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="size-3!"
                  aria-hidden="true"
                />
                Back
              </Link>

              <a
                href={project.projectUrl}
                className="text-gray-800 flex items-center gap-x-1 text-sm font-semibold uppercase transition hover:border-0 hover:text-secondary"
                target="_blank"
                rel="nofollow noreferrer"
              >
                Visit site
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="size-3!"
                  aria-hidden="true"
                />
              </a>
            </div>
          ) : (
            <Link
              href="/"
              className="text-gray-800 flex items-center gap-x-1 text-sm font-semibold uppercase transition hover:border-0 hover:text-secondary"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="size-3!"
                aria-hidden="true"
              />
              Back
            </Link>
          )}
        </section>

        <aside className="col-span-1 space-y-8 pl-0 md:col-span-8 md:mt-0 md:pl-12 lg:space-y-12 mt-10 lg:mt-0">
          {project.videos &&
            project.videos.map((videoUrl: string, index: number) => {
              if (!videoUrl) return null;
              return (
                <VideoPlayer
                  key={`video-${index}`}
                  url={videoUrl}
                  className="rounded-lg lg:max-w-2xl ring-1 ring-gray-200 lg:mx-auto"
                />
              );
            })}

          {project.images &&
            project.images.map((image: any, index: number) => {
              const key = `image-${index}`;
              const imageSrc = image
                ? urlFor(image).width(1200).url()
                : undefined;

              return imageSrc ? (
                <Image
                  key={key}
                  src={imageSrc}
                  alt={image?.alt || project.title || ""}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  placeholder={image?.lqip ? "blur" : "empty"}
                  blurDataURL={image?.lqip}
                  sizes="(min-width: 768px) 66vw, 100vw"
                  layout="responsive"
                  loading="lazy"
                />
              ) : null;
            })}
        </aside>
      </div>
    </div>
  );
};

export default ProjectPost;
