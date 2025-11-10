import { defineArrayMember, defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

import {CodeBlockIcon} from '@sanity/icons'

export const projectPostType = defineType({
  name: "projectPost",
  type: "document",
  title: "Projects",
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Project title",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Project Slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "include",
      type: "boolean",
      title: "Include",
      initialValue: false,
      description:
        "Whether to include the project on the landing page project grid.",
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
    }),
    defineField({
      name: "projectUrl",
      type: "url",
      title: "Project URL",
    }),
    defineField({
      name: "description",
      title: "Project description",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
    }),
    defineField({
      name: "videos",
      type: "array",
      title: "Videos",
      description: "Array of video URLs (mainly YouTube URLs)",
      of: [defineArrayMember({ type: "url" })],
    }),
    defineField({
      name: "images",
      type: "array",
      of: [defineArrayMember({ type: "image" })],
      title: "Project Images",
    }),
    orderRankField({ type: "projectPost" }),
  ],
  preview: {
    select: {
      title: "title",
      include: "include",
      media: "thumbnail",
    },
    prepare({ title, include, media }) {
      return {
        title,
        subtitle: include ? undefined : "Not Listed",
        media,
      };
    },
  },
});


