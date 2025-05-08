"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import Link from "next/link"; // Add this import

export function Layout4() {
  return (
    <section id="relume" className=" px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container ">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Inspiración</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Mujer, resplandece en el propósito que Dios diseñó para ti
            </h1>
            <p className="mb-6 md:mb-8 md:text-md">
              Este blog es un refugio para mujeres que buscan
              fortalecer su fe. Aquí encontrarás recursos, historias y apoyo
              para tu viaje espiritual.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Crecimiento Espiritual
                </h6>
                <p>
                  Conéctate con otras mujeres que comparten tu fe y
                  experiencias.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Apoyo Comunitario
                </h6>
                <p>
                  Únete a una comunidad que te inspira y motiva en tu caminar
                  con Dios.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Link href="/blog">
                <Button title="Blog" variant="secondary" className="secondaryButton">
                  Blog
                </Button>
              </Link>
              <Link href="/productos">
                <Button
                  className="secondaryButton"
                  title="Productos"
                >
                  Productos
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <img
              src="/assets/pexels-mart-production-7218327.jpg"
              className="w-full object-cover rounded-4xl"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
