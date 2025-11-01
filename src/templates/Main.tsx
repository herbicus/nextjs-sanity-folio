import React from "react";

import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";

import type { NavItem } from "@/components/Navigation/Header";
import type { SocialNavItem } from "@/components/Navigation/Footer";

interface MainProps {
  navItems: NavItem[];
  socialNavItems: SocialNavItem[];
  children: React.ReactNode;
}

const Main = ({ navItems, socialNavItems, children }: MainProps) => {
  return (
    <>
      <Header navItems={navItems} />
      <main className="pt-16">{children}</main>
      <Footer navItems={socialNavItems} />
    </>
  );
};

export default Main;
