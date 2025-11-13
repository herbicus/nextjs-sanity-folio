import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type ProjectCardProps = {
  project: any;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const hasThumb = Boolean(project?.thumbnail);
  const src = hasThumb ? urlFor(project.thumbnail).width(700).height(700).url() : undefined;

  return (
    <div className="group aspect-square w-full relative">
      {src ? (
        <Image
          src={src}
          className="absolute w-full h-auto inset-0 object-center object-contain transition-all ease-out duration-500 group-hover:opacity-10 z-10"
          placeholder={project?.thumbnail?.lqip ? "blur" : "empty"}
          blurDataURL={project?.thumbnail?.lqip}
          width={320}
          height={320}
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
