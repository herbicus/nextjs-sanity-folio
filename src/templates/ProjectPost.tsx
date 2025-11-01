"use client";

import React from "react";

type ProjectPostProps = {
  project: any;
};

const ProjectPost: React.FC<ProjectPostProps> = ({ project }) => {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl mb-2">{project?.title ?? "Untitled Project"}</h1>
      <p className="text-sm text-gray-500 mb-4">{project?.category ?? "Uncategorized"}</p>
      <pre className="text-xs bg-gray-50 p-4 rounded overflow-auto">{JSON.stringify(project, null, 2)}</pre>
    </main>
  );
};

export default ProjectPost;


