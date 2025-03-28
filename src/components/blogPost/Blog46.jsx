"use client";

import { Badge, Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Blog46() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Blog</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Artículos Recomendados para Ti
            </h2>
            <p className="md:text-md">
              Explora más sobre tu fe y crecimiento personal.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-x-12">
          <div className="flex size-full flex-col items-start justify-start text-start">
            <a href="#" className="mb-6 w-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image"
                className="aspect-video size-full rounded-image object-cover"
              />
            </a>
            <div className="rb-4 mb-4 flex w-full items-center justify-start">
              <Badge className="mr-4">Espiritualidad</Badge>
              <p className="inline text-sm font-semibold">5 min lectura</p>
            </div>
            <a className="mb-2 flex justify-start text-start" href="#">
              <h2 className="text-xl font-bold md:text-2xl">
                Fortalece tu fe diariamente
              </h2>
            </a>
            <p>Descubre cómo aplicar la fe en tu vida cotidiana.</p>
            <Button
              title="Leer más"
              variant="link"
              size="link"
              iconRight={<RxChevronRight />}
              className="mt-6 flex items-center justify-center gap-x-2"
            >
              Leer más
            </Button>
          </div>
          <div className="flex size-full flex-col items-start justify-start text-start">
            <a href="#" className="mb-6 w-full">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image"
                className="aspect-video size-full rounded-image object-cover"
              />
            </a>
            <div className="rb-4 mb-4 flex w-full items-center justify-start">
              <Badge className="mr-4">Inspiración</Badge>
              <p className="inline text-sm font-semibold">5 min lectura</p>
            </div>
            <a className="mb-2 flex justify-start text-start" href="#">
              <h2 className="text-xl font-bold md:text-2xl">
                Reflexiones sobre la vida cristiana
              </h2>
            </a>
            <p>Encuentra paz y propósito a través de la oración.</p>
            <Button
              title="Leer más"
              variant="link"
              size="link"
              iconRight={<RxChevronRight />}
              className="mt-6 flex items-center justify-center gap-x-2"
            >
              Leer más
            </Button>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-center md:mt-20">
          <Button variant="secondary">Ver todos</Button>
        </div>
      </div>
    </section>
  );
}
