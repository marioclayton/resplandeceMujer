"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronDown } from "react-icons/rx";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(true);
  };
  const closeOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(false);
  };
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
  return {
    isMobileMenuOpen, // Export this state variable
    isDropdownOpen,   // Export this state variable
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    animateDropdownMenu,
    animateDropdownMenuIcon,
  };
};

export function Navbar1() {
  const useActive = useRelume();
  return (
    <section
      id="relume"
      className="z-[999] flex w-full items-center border-b border-border-primary bg-background-primary lg:min-h-18 lg:px-[5%]"
    >
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
          <a href="#">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
              alt="Logo image"
            />
          </a>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={useActive.toggleMobileMenu}
          >
            <svg
              width="24"
              height="18"
              viewBox="0 0 24 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M1 1H23"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                animate={
                  useActive.isMobileMenuOpen // Access through useActive
                    ? { d: "M2 16L22 2" }
                    : { d: "M1 1H23" }
                }
              />
              <motion.path
                d="M1 9H23"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                animate={
                  useActive.isMobileMenuOpen // Access through useActive
                    ? { opacity: 0 } 
                    : { opacity: 1 }
                }
              />
              <motion.path
                d="M1 17H23"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                animate={
                  useActive.isMobileMenuOpen // Access through useActive
                    ? { d: "M2 2L22 16" }
                    : { d: "M1 17H23" }
                }
              />
            </svg>
          </button>
        </div>
        <motion.div
          variants={{
            open: { height: "var(--height-open, 100dvh)" },
            close: { height: "var(--height-closed, 0)" },
          }}
          initial="close"
          exit="close"
          animate={useActive.animateMobileMenu}
          transition={{ duration: 0.4 }}
          className="overflow-hidden px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          <a
            href="#"
            className="block py-3 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2"
          >
            Inicio Rápido
          </a>
          <a
            href="#"
            className="block py-3 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2"
          >
            Sobre Nosotras
          </a>
          <a
            href="#"
            className="block py-3 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2"
          >
            Recursos Útiles
          </a>
          <div
            onMouseEnter={useActive.openOnDesktopDropdownMenu}
            onMouseLeave={useActive.closeOnDesktopDropdownMenu}
          >
            <button
              className="flex w-full items-center justify-between gap-2 py-3 text-left text-md lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base"
              onClick={useActive.openOnMobileDropdownMenu}
            >
              <span>Productos</span>
              <motion.span
                variants={{ rotated: { rotate: 180 }, initial: { rotate: 0 } }}
                animate={useActive.animateDropdownMenuIcon}
                transition={{ duration: 0.3 }}
              >
                <RxChevronDown />
              </motion.span>
            </button>
            <AnimatePresence>
              <motion.nav
                variants={{
                  open: {
                    visibility: "visible",
                    opacity: "var(--opacity-open, 100%)",
                    display: "block",
                    y: 0,
                  },
                  close: {
                    visibility: "hidden",
                    opacity: "var(--opacity-close, 0)",
                    display: "none",
                    y: "var(--y-close, 0%)",
                  },
                }}
                animate={useActive.animateDropdownMenu}
                initial="close"
                exit="close"
                transition={{ duration: 0.2 }}
                className="bg-background-primary lg:absolute lg:z-50 lg:border lg:border-border-primary lg:p-2 lg:[--y-close:25%]"
              >
                <a
                  href="#"
                  className="block py-3 pl-[5%] text-md lg:px-4 lg:py-2 lg:text-base"
                >
                  Libros Recomendados
                </a>
                <a
                  href="#"
                  className="block py-3 pl-[5%] text-md lg:px-4 lg:py-2 lg:text-base"
                >
                  Testimonios
                </a>
                <a
                  href="#"
                  className="block py-3 pl-[5%] text-md lg:px-4 lg:py-2 lg:text-base"
                >
                  Contacto
                </a>
              </motion.nav>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex flex-col items-center gap-4 lg:mt-0 lg:ml-4 lg:flex-row">
            <Button
              title="Únete"
              variant="secondary"
              size="sm"
              className="w-full"
            >
              Únete
            </Button>
            <Button title="Explorar" size="sm" className="w-full">
              Explorar
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
