import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface SocialNavItem {
  name: string;
  value: string;
  icon: IconDefinition;
}

interface FooterProps {
  navItems: SocialNavItem[];
  children?: React.ReactNode;
}

const Footer = ({ navItems }: FooterProps) => {
  return (
    <footer className="border-0 bg-primary py-10 text-sm">
      <nav className="flex site-container site-max-w flex-wrap items-center justify-end sm:justify-between">
        <p className="hidden text-xs text-white sm:block">
          © {new Date().getFullYear()} Herb Torres
        </p>

        <ul className="flex flex-nowrap space-x-6">
          {navItems &&
            navItems.map((link, index) => {
              const key = `social-nav-item-${index}`;

              return (
                <li key={key}>
                  <a
                    href={link.value}
                    className="border-0 text-white transition hover:border-0 hover:text-secondary"
                    target="_blank"
                    rel="nofollow noreferrer"
                    aria-label={link.name}
                    title={link.name}
                  >
                    <span className="sr-only">{link.name}</span>
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="h-6! w-6!"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
