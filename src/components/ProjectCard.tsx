import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type ProjectCardProps = {
  project: any;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const hasThumb = Boolean(project?.thumbnail);
  // Fetch ~700px wide asset for crisp @2x rendering in ~350px area
  const src = hasThumb ? urlFor(project.thumbnail).width(700).url() : undefined;

  return (
    <div className="group aspect-square w-full relative">
      {src ? (
        <Image
          src={src}
          sizes="(min-width: 1024px) 100vw, (min-width: 640px) 50vw, 100vw"
          className="absolute w-full h-full inset-0 object-center object-contain transition-all ease-out duration-500 group-hover:opacity-10 z-10"
          placeholder={project?.thumbnail?.lqip ? "blur" : "empty"}
          blurDataURL={project?.thumbnail?.lqip}
          width={700}
          height={700}
          layout="responsive"
          alt={project?.title ?? ""}
        />
      ) : null}

      <span className="absolute inset-0 z-20 flex flex-col flex-wrap items-center justify-center text-center text-gray-900 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span className="mb-1 block font-nunito text-lg font-black">
          {project.title}
        </span>
        <span className="block text-xs font-bold uppercase tracking-wide text-gray-600">
          {project.category}
        </span>
      </span>
    </div>
  );
};

export default ProjectCard;
