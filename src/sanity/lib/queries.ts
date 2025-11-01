// src/sanity/lib/queries.ts

import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  body,
  mainImage,
  relatedPosts[]{
    _key, // required for drag and drop
    ...@->{_id, title, slug} // get fields from the referenced post
  }
}`);

export const PROJECTS_QUERY =
  defineQuery(`*[_type == "projectPost" && defined(slug.current)] | order(sortOrder asc, _createdAt desc){
  _id,
  title,
  slug,
  thumbnail{
    ...,
    // Include low-quality image placeholder (LQIP) for blur-up
    "lqip": asset->metadata.lqip
  },
  category
}`);

export const PROJECT_SLUGS_QUERY =
  defineQuery(`*[_type == "projectPost" && defined(slug.current)].slug.current`);

export const PROJECT_QUERY =
  defineQuery(`*[_type == "projectPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  include,
  category,
  projectUrl,
  description,
  thumbnail,
  images,
  sortOrder
}`);

// Site content queries
export const ABOUT_QUERY = defineQuery(`*[_type == "site"][0]{
  aboutText,
  aboutTech,
  aboutImage{..., "lqip": asset->metadata.lqip}
}`);

export const CONTACT_QUERY = defineQuery(`*[_type == "site"][0]{
  contactInfo,
  contactImage{..., "lqip": asset->metadata.lqip}
}`);
