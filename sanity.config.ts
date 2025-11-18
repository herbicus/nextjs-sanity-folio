"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { resolve } from "@/sanity/presentation/resolve";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

import StudioLogo from "./src/components/SVGs/StudioLogo";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://herbtorres.com/studio";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Herb Torres Portfolio",
  icon: StudioLogo,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  beta: {
    create: {
      startInCreateEnabled: true,
      fallbackStudioOrigin:
        process.env.NODE_ENV === "production"
          ? `${BASE_URL}/ studio`
          : "http://localhost:3000/studio",
    },
  },
});
