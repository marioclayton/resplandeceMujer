"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -7% 0px" },
    );

    const timer = window.setTimeout(() => {
      const elements = document.querySelectorAll(
        "main section:not(.home-hero), main article, body > div > section:not(.home-hero), body > div > div > section:not(.home-hero), footer .container",
      );

      elements.forEach((element, index) => {
        if (element.closest("section") !== element && element.tagName === "ARTICLE") {
          const siblings = [...element.parentElement.children].filter((item) => item.tagName === "ARTICLE");
          element.style.setProperty("--motion-delay", `${Math.min(siblings.indexOf(element) * 80, 320)}ms`);
        } else {
          element.style.setProperty("--motion-delay", `${Math.min(index * 20, 100)}ms`);
        }
        element.classList.add("motion-reveal");
        observer.observe(element);
      });
    }, 30);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
