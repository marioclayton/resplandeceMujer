"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import Link from "next/link"; // Add this import

export function Header5() {
  return (
    <section id="relume" className="relative px-[5%] ">
      <div className="container relative z-10 ">
        <div className="flex max-h-screen min-h-svh items-center py-16 md:py-24 lg:py-28">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
              Resplandece Mujer
            </h1>
            <p className="text-text-alternative md:text-md">
              Resplendence Mujer es un espacio pensado para inspirar y acompañar
              a cada mujer en su camino hacia el bienestar, la autocomprensión y
              el crecimiento personal. Aquí encontrarás herramientas, consejos y
              reflexiones que te ayudarán a descubrir tu verdadero potencial, a
              fortalecer tu autoestima y a construir una vida plena y
              equilibrada.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Link href="/blog">
                <Button className="primaryButton" title="Descubre">Blog</Button>
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
        <img
          src="/assets/pexels-kqpho-1921168.jpg"
          className="size-full object-cover"
          alt="Relume placeholder image"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
    </section>
  );
}
