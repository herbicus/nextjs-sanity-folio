import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";

import { ScrollProvider } from "@/context/ScrollContext";

import Main from "@/templates/Main";

import {
  faAddressCard,
  faHouse,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faCodepen,
} from "@fortawesome/free-brands-svg-icons";

import type { NavItem } from "@/components/Navigation/Header";

export const socialLinks = [
  {
    name: "LinkedIn",
    value: "https://www.linkedin.com/in/herb-torres-7b5aa1a1",
    icon: faLinkedin,
  },
  {
    name: "Instagram",
    value: "https://www.instagram.com/herb_torres/",
    icon: faInstagram,
  },
  { name: "CodePen", value: "https://codepen.io/herbicus", icon: faCodepen },
  {
    name: "Facebook",
    value: "https://www.facebook.com/herb.torres.73",
    icon: faFacebook,
  },
];

interface SitePreviewLayoutProps {
  children: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: "Home", value: "/" },
  { name: "About", value: "/about" },
  { name: "Contact", value: "/contact" },
];

export default async function SitePreviewLayout({
  children,
}: SitePreviewLayoutProps) {
  const { isEnabled } = await draftMode();
  return (
    <ScrollProvider>
      <Main navItems={navItems} socialNavItems={socialLinks}>
        {children}
      </Main>

      <SanityLive />
      {isEnabled ? (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      ) : null}
    </ScrollProvider>
  );
}
