import React from "react";
import Link from "next/link";
import clsx from "clsx";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface NavItem {
  name: string;
  value: string;
}

interface DrawerMenuProps {
  isOpen: boolean;
  handleClose: () => void;
  navItems: NavItem[];
  className?: string;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  handleClose,
  navItems,
  className,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className={clsx("relative z-50", className)}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-out data-closed:translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="size-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </TransitionChild>

              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <nav className="flex flex-col">
                    {navItems.map((item, index) => (
                      <Link
                        key={`drawer-menu-item-${index}`}
                        href={item.value}
                        className="rounded-md px-3 py-4 text-sm uppercase tracking-wide font-bold text-primary hover:bg-gray-100 hover:text-gray-900"
                        onClick={handleClose}
                        aria-label={item.name}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DrawerMenu;
