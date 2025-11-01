"use client";

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import { useScrollContext } from "@/context/ScrollContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import LogoLockup from "@/components/SVGs/LogoLockup";

import DrawerMenu from "./DrawerMenu";

export interface NavItem {
  name: string;
  value: string;
}

interface HeaderProps {
  navItems: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ navItems }) => {
  const { isAboveFold, isScrollUp } = useScrollContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-40 w-screen bg-white shadow-md transition-transform duration-300",
        !isAboveFold && !isScrollUp && !isMenuOpen
          ? "-translate-y-full"
          : "translate-y-0"
      )}
    >
      <nav className="site-container site-max-w">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-gray-900 transition-colors hover:text-gray-500"
            title="Home"
            aria-label="Home"
          >
            <span className="sr-only">Home</span>
            <LogoLockup
              className="max-w-48 lg:max-w-56 h-auto"
              aria-hidden="true"
            />
          </Link>

          {/* Desktop Navigation */}

          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <li key={`desktop-nav-item-${index}`}>
                <Link
                  href={item.value}
                  className="text-primary uppercase tracking-wide font-bold hover:text-secondary text-sm"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger Menu */}
          <button
            type="button"
            className={clsx(
              "cursor-pointer rounded-md p-2 text-primary",
              "hover:bg-gray-100 hover:text-secondary focus:ring-2 focus:outline-none focus:ring-blue-500 focus:ring-inset",
              "lg:hidden"
            )}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="sr-only">Open menu</span>
            <FontAwesomeIcon
              icon={faBars}
              className="size-6"
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>

      {/* Drawer Menu */}
      <DrawerMenu
        isOpen={isMenuOpen}
        handleClose={() => setIsMenuOpen(false)}
        navItems={navItems}
      />
    </header>
  );
};

export default Header;
