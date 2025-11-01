// src/app/projects/[slug]/page.tsx

import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import ProjectPost from "@/templates/ProjectPost";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(PROJECT_SLUGS_QUERY);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolved = await params;
  if (!resolved?.slug) {
    console.error("[projects/[slug]] Missing route param 'slug'", { params: resolved });
    return <div className="p-6">Project not found.</div>;
  }

  console.log("[projects/[slug]] resolved slug:", resolved.slug, typeof resolved.slug);

  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug: resolved.slug },
  });

  if (!project) {
    return <div className="p-6">Project not found.</div>;
  }

  return <ProjectPost project={project} />;
}


