import { defineArrayMember, defineField, defineType } from "sanity";

export const projectPostType = defineType({
  name: "projectPost",
  type: "document",
  title: "Projects",
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
      name: "images",
      type: "array",
      of: [defineArrayMember({ type: "image" })],
      title: "Project Images",
    }),
    defineField({
      name: "sortOrder",
      type: "number",
      title: "Sort Order",
    }),
  ],
});


