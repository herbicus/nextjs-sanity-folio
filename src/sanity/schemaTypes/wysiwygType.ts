import { defineArrayMember, defineType } from "sanity";

// Simple alias type for rich text based on Portable Text blocks
export const wysiwygType = defineType({
  name: "wysiwyg",
  title: "WYSIWYG",
  type: "array",
  of: [defineArrayMember({ type: "block" })],
});


