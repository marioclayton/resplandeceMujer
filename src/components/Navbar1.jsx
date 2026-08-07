"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar1() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["Inicio", "/"], ["Blog", "/blog"], ["Acerca", "/acerca"], ["Productos", "/productos"], ["Contacto", "/contacto"]];

  return (
    <header className={`fixed inset-x-0 top-0 z-[999] px-[5%] transition-all ${!isHomePage || scrolled || open ? "bg-[#2d1b17]/95 shadow-lg backdrop-blur-md" : "bg-[#2d1b17]/35 backdrop-blur-sm"}`}>
      <div className="mx-auto flex min-h-20 max-w-[1240px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/assets/logo.png" alt="Resplandece Mujer" width={44} height={44} className="h-11 w-11" />
          <span className="brand-wordmark hidden text-xl tracking-wide text-[#fff8ef] sm:block">Resplandece Mujer</span>
        </Link>
        <button className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
          <span className={`h-px w-6 bg-white transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-white transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
        <nav className={`absolute left-0 right-0 top-20 overflow-hidden bg-[#2d1b17] transition-[max-height] duration-300 lg:static lg:max-h-none lg:overflow-visible lg:bg-transparent ${open ? "max-h-96" : "max-h-0"}`} aria-label="Navegación principal">
          <div className="flex flex-col px-[5%] pb-6 lg:flex-row lg:items-center lg:gap-1 lg:p-0">
            {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-full px-4 py-3 text-sm font-medium text-[#fff8ef]/90 hover:bg-white/10 hover:text-white lg:py-2">{label}</Link>)}
          </div>
        </nav>
      </div>
    </header>
  );
}
