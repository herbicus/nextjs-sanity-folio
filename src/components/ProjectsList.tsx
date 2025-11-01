"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";

import ProjectCard from "@/components/ProjectCard";

type ProjectsListProps = {
  projects: any[];
  className?: string;
};

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, className }) => {
  if (!projects || projects.length === 0)
    return (
      <div className="col-span-full py-10">
        <span className="text-center block w-full text-gray-500">
          No projects found
        </span>
      </div>
    );

  return (
    <div
      className={clsx(
        "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {projects.map((project) => (
        <Link
          key={project._id}
          href={`/projects/${encodeURIComponent(project.slug.current as string)}`}
        >
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  );
};

export default ProjectsList;
