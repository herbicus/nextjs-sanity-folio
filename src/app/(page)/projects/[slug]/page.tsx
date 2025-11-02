// src/app/projects/[slug]/page.tsx

import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { toPlainText } from "@/sanity/lib/portableText";
import { client } from "@/sanity/lib/client";
import ProjectPost from "@/templates/ProjectPost";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(PROJECT_SLUGS_QUERY);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  if (!resolved?.slug) {
    return {};
  }

  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug: resolved.slug },
  });

  if (!project) {
    return {};
  }

  const title = project.title || "Herb Torres";
  const description = toPlainText(project.description) || "Front End Engineer";

  // Get the first image for OpenGraph
  const ogImage = project.images && project.images[0] 
    ? urlFor(project.images[0]).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
            type: "image/jpeg",
          },
        ],
      }),
    },
  };
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


