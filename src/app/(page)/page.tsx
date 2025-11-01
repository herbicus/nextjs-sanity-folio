// src/app/page.tsx

import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectsList from "@/components/ProjectsList";

export default async function LandingPage() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  return (
    <section className="site-container site-max-w py-4">
      <div className="grid grid-cols-4 md:grid-cols-12 gap-4">
        <ProjectsList
          projects={projects ?? []}
          className="col-span-4 md:col-span-10 md:col-start-2"
        />
      </div>
    </section>
  );
}
