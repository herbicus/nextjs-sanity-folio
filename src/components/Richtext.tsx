import React from "react";
import clsx from "clsx";

import { PortableText } from "@portabletext/react";

interface RichTextProps {
  content: any;
  theme?: "light" | "dark";
  textAlign?: "left" | "center" | "right";
  classes?: string;
}

const RichText: React.FC<RichTextProps> = ({
  content,
  theme = "light",
  textAlign = "left",
  classes,
}) => {
  const defaultClasses = `prose max-w-none prose-headings:font-semibold prose-headings:leading-tight prose-h1:text-4xl prose-h1:lg:text-8xl prose-h2:text-3xl prose-h2:lg:text-6xl prose-h3:text-3xl prose-h3:lg:text-5xl prose-h4:text-xl prose-h4:lg:text-3xl prose-h5:text-base prose-h5:lg:text-2xl`;

  const getTextAlignClass = (txtAlign: string): string => {
    if (txtAlign === "right") {
      return "text-right";
    }
    if (txtAlign === "center") {
      return "text-center";
    }
    return "text-left";
  };

  const themeClass =
    theme === "dark"
      ? "prose-invert prose-li:text-white prose-p:text-white"
      : "prose-neutral";
  const textAlignClass = getTextAlignClass(textAlign);

  const classNames = `${defaultClasses} ${themeClass} ${textAlignClass} ${
    classes || ""
  }`;

  return (
    <div className={clsx(classNames)}>
      <PortableText value={content} />
    </div>
  );
};

export default RichText;
