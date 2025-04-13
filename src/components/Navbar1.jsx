"use client";

import { useMediaQuery } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";

  return {
    toggleMobileMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
  };
};

export function Navbar1() {
  const [isClient, setIsClient] = useState(false);
  const [hasBackground, setHasBackground] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasBackground(true);
      } else {
        setHasBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const useActive = useRelume();

  if (!isClient) return null; // Avoid SSR hydration mismatch

  return (
    <section
      id="relume"
      className={`z-[999] fixed top-0 left-0 w-full items-center transition-colors duration-300 ${
        hasBackground ? "bg-[#0a0a0a] shadow-md" : "bg-transparent"
      }`}
    >
      <div className="size-full lg:flex lg:items-center lg:justify-between max-w-[1240px] mx-auto">
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-16 lg:min-h-16 lg:px-0">
          <a href="/">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
              alt="Logo image"
            />
          </a>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={useActive.toggleMobileMenu}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={useActive.animateMobileMenuButtonSpan}
              variants={{
                open: { translateY: 8, transition: { delay: 0.1 } },
                rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
                closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
              }}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={useActive.animateMobileMenu}
              variants={{
                open: { width: 0, transition: { duration: 0.1 } },
                closed: {
                  width: "1.5rem",
                  transition: { delay: 0.3, duration: 0.2 },
                },
              }}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-black"
              animate={useActive.animateMobileMenuButtonSpan}
              variants={{
                open: { translateY: -8, transition: { delay: 0.1 } },
                rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
                closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
              }}
            />
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
            href="/"
            className="block py-3 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2"
          >
            Inicio
          </a>
          <a
            href="/blog"
            className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
          >
            Blog
          </a>
          <a
            href="/products"
            className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
          >
            Productos
          </a>
          <a
            href="#"
            className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
          >
            Contacto
          </a>
        </motion.div>
      </div>
    </section>
  );
}
