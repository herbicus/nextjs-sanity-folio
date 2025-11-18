import React from "react";
import Image from "next/image";

export default function StudioLogo() {
  return (
    <Image
      src="/apple-touch-icon-144x144.png"
      alt="Studio Logo"
      width={144}
      height={144}
      className="w-full max-w-full h-auto"
    />
  );
}
