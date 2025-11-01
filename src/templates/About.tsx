"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import RichText from "@/components/Richtext";

type AboutProps = {
  aboutImage?: any;
  aboutText?: any;
  aboutTech?: any;
};

export default function AboutTemplate({
  aboutImage,
  aboutText,
  aboutTech,
}: AboutProps) {
  const aboutImgSrc = aboutImage
    ? urlFor(aboutImage).width(1400).url()
    : undefined;

  return (
    <>
      <section className="site-container site-max-w pt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-x-6">
          <div className="col-span-1 md:col-span-6 lg:col-span-7">
            {aboutImgSrc ? (
              <Image
                src={aboutImgSrc}
                alt=""
                layout="responsive"
                width={aboutImage?.width || 1440}
                height={aboutImage?.height || 900}
                className="w-full max-w-full h-auto"
                placeholder={aboutImage?.lqip ? "blur" : "empty"}
                blurDataURL={aboutImage?.lqip}
                sizes="(min-width: 1024px) 66vw, 100vw"
              />
            ) : null}
          </div>
          <div className="col-span-1 md:col-span-6 lg:col-span-5">
            {aboutText ? (
              <RichText
                content={aboutText}
                theme="light"
                textAlign="left"
              />
            ) : null}
          </div>
        </div>
      </section>
      <section className="site-container site-max-w py-10">
        {aboutTech ? (
          <RichText
            content={aboutTech}
            theme="light"
            textAlign="left"
          />
        ) : null}
      </section>
    </>
  );
}
