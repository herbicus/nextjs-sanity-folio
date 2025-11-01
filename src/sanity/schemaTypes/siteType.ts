import { defineField, defineType } from "sanity";

export const siteType = defineType({
  name: "site",
  type: "document",
  title: "Site",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Site title",
    }),
    defineField({
      name: "aboutImage",
      type: "image",
      title: "About Image",
    }),
    defineField({
      name: "aboutText",
      type: "wysiwyg",
      title: "About WYSIWYG",
    }),
    defineField({
      name: "aboutTech",
      type: "wysiwyg",
      title: "About Technologies WYSIWYG",
    }),
    defineField({
      name: "contactImage",
      type: "image",
      title: "Contact Image",
    }),
    defineField({
      name: "contactInfo",
      type: "wysiwyg",
      title: "Contact WYSIWYG",
    }),
  ],
});


