"use client";

import Image from "next/image";
import RichText from "@/components/Richtext";
import { urlFor } from "@/sanity/lib/image";

type ContactProps = {
  contactInfo?: any;
  contactImage?: any;
};

export default function ContactTemplate({ contactInfo, contactImage }: ContactProps) {
  const bgSrc = contactImage ? urlFor(contactImage).width(2000).url() : undefined;

  return (
    <section className="relative flex h-[calc(100vh-100px)] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-200 via-gray-300 to-gray-500 px-4 pt-10 md:items-start md:px-8 md:pt-16">
      {bgSrc ? (
        <Image
          src={bgSrc}
          alt=""
          fill
          className="absolute inset-0 object-cover"
          placeholder={contactImage?.lqip ? "blur" : "empty"}
          blurDataURL={contactImage?.lqip}
          sizes="100vw"
        />
      ) : null}

      <div className="pf-container relative z-10 flex max-w-8xl md:pl-[3.9rem]">
        <div className="contact-content relative text-white">
          <div className="pointer-events-none z-0 h-[250px] w-[250px] rotate-45 bg-black opacity-50 md:h-[300px] md:w-[300px] md:opacity-40"></div>

          <div className="absolute left-1/2 top-2/4 flex h-full w-full translate-x-[-50%] translate-y-[-50%] flex-col justify-center align-middle">
            {contactInfo?.content ? (
              <RichText
                content={contactInfo.content}
                theme={contactInfo.theme || "dark"}
                textAlign={contactInfo.textAlign || "center"}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}


