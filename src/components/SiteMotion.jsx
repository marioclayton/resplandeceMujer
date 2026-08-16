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
      // A percentage threshold is measured against the element's full height.
      // Long mobile sections can be taller than the viewport by enough that an
      // 8% intersection is impossible, leaving the entire section transparent.
      { threshold: 0.01, rootMargin: "0px 0px -7% 0px" },
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

        // Never make a very tall content wrapper depend on an intersection
        // ratio. Its children can still animate independently, while the page
        // itself remains readable on every viewport size.
        if (element.getBoundingClientRect().height > window.innerHeight * 1.5) {
          element.classList.add("motion-visible");
        } else {
          observer.observe(element);
        }
      });
    }, 30);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
