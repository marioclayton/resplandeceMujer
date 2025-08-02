"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Header5() {
  return (
    <section id="relume" className="relative px-[5%]">
      <div className="container relative z-10">
        <div className="flex max-h-screen min-h-svh items-center py-16 md:py-24 lg:py-28">
          {/* Ensure the wrapping div stays centered on mobile */}
          <div className="max-w-md mx-auto text-center md:ml-auto md:text-right md:mr-0">
            <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
              Resplandece Mujer
            </h1>
            <p className="text-text-alternative text-justify md:text-md md:text-right">
              Resplendence Mujer es un espacio pensado para inspirar y acompañar a cada mujer en su camino hacia la fe, el bienestar y el crecimiento personal. Aquí encontrarás herramientas, consejos y reflexiones que te ayudarán a descubrir tu verdadero potencial, a fortalecerte y a construir una vida plena y equilibrada.            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center md:mt-8 md:justify-end">
              <Link href="/blog">
                <Button className="primaryButton" title="Descubre">
                  Blog
                </Button>
              </Link>
              <Link href="/productos">
                <Button className="secondaryButton" title="Únete" variant="secondary-alt">
                  Productos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/pexels-ilyalisauskas-12041877.webp"
          alt="Relume placeholder image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
    </section>
  );
}
