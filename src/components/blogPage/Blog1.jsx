"use client";

import React from "react";

export function Blog1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="md:mb-18 mb-12 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Blog</p>
            <h1 className="lg:text-10xl mb-5 text-6xl font-bold md:mb-6 md:text-9xl">
              Artículos Inspiradores para Mujeres
            </h1>
            <p className="md:text-md">
              Explora nuestros artículos más destacados y enriquecedores.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <div className="no-scrollbar mb-12 ml-[-5vw] flex w-screen items-center justify-start overflow-scroll pl-[5vw] md:mb-16 md:ml-0 md:w-full md:justify-center md:overflow-hidden md:pl-0">
            <a
              href="#"
              className="rounded-button inline-flex gap-3 items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none text-text-primary bg-background-primary border px-4 py-2 border-border-primary"
            >
              Ver todo
            </a>
            <a
              href="#"
              className="rounded-button inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none text-text-primary gap-2 bg-transparent border px-4 py-2 border-transparent"
            >
              Reflexiones diarias
            </a>
            <a
              href="#"
              className="rounded-button inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none text-text-primary gap-2 bg-transparent border px-4 py-2 border-transparent"
            >
              Testimonios de fe
            </a>
            <a
              href="#"
              className="rounded-button inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none text-text-primary gap-2 bg-transparent border px-4 py-2 border-transparent"
            >
              Consejos prácticos
            </a>
            <a
              href="#"
              className="rounded-button inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none text-text-primary gap-2 bg-transparent border px-4 py-2 border-transparent"
            >
              Vida espiritual
            </a>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
            <div>
              <a href="#" className="mb-6 inline-block w-full max-w-full">
                <div className="w-full overflow-hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder image 1"
                    className="rounded-image aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <a
                href="#"
                className="mb-2 mr-4 inline-block max-w-full text-sm font-semibold"
              >
                Categoría
              </a>
              <a href="#" className="mb-2 block max-w-full">
                <h5 className="text-xl font-bold md:text-2xl">
                  Cómo fortalecer tu fe diariamente
                </h5>
              </a>
              <p>Descubre cómo la fe transforma tu vida cotidiana.</p>
              <div className="mt-6 flex items-center">
                <div className="mr-4 shrink-0">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder avatar 1"
                    className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-sm font-semibold">María López</h6>
                  <div className="flex items-center">
                    <p className="text-sm">11 Ene 2022</p>
                    <span className="mx-2">•</span>
                    <p className="text-sm">5 min lectura</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <a href="#" className="mb-6 inline-block w-full max-w-full">
                <div className="w-full overflow-hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder image 1"
                    className="rounded-image aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <a
                href="#"
                className="mb-2 mr-4 inline-block max-w-full text-sm font-semibold"
              >
                Inspiración
              </a>
              <a href="#" className="mb-2 block max-w-full">
                <h5 className="text-xl font-bold md:text-2xl">
                  La importancia de la comunidad en la fe
                </h5>
              </a>
              <p>
                La comunidad es esencial para nuestro crecimiento espiritual.
              </p>
              <div className="mt-6 flex items-center">
                <div className="mr-4 shrink-0">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder avatar 1"
                    className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Ana Pérez</h6>
                  <div className="flex items-center">
                    <p className="text-sm">15 Feb 2022</p>
                    <span className="mx-2">•</span>
                    <p className="text-sm">4 min lectura</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <a href="#" className="mb-6 inline-block w-full max-w-full">
                <div className="w-full overflow-hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder image 1"
                    className="rounded-image aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <a
                href="#"
                className="mb-2 mr-4 inline-block max-w-full text-sm font-semibold"
              >
                Crecimiento
              </a>
              <a href="#" className="mb-2 block max-w-full">
                <h5 className="text-xl font-bold md:text-2xl">
                  Cómo orar efectivamente en tu vida diaria
                </h5>
              </a>
              <p>
                La oración es una herramienta poderosa para la conexión con
                Dios.
              </p>
              <div className="mt-6 flex items-center">
                <div className="mr-4 shrink-0">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder avatar 1"
                    className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Laura Gómez</h6>
                  <div className="flex items-center">
                    <p className="text-sm">20 Mar 2022</p>
                    <span className="mx-2">•</span>
                    <p className="text-sm">6 min lectura</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <a href="#" className="mb-6 inline-block w-full max-w-full">
                <div className="w-full overflow-hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder image 1"
                    className="rounded-image aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <a
                href="#"
                className="mb-2 mr-4 inline-block max-w-full text-sm font-semibold"
              >
                Oración
              </a>
              <a href="#" className="mb-2 block max-w-full">
                <h5 className="text-xl font-bold md:text-2xl">
                  Viviendo con propósito y fe
                </h5>
              </a>
              <p>
                Descubre cómo vivir con propósito en cada aspecto de tu vida.
              </p>
              <div className="mt-6 flex items-center">
                <div className="mr-4 shrink-0">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder avatar 1"
                    className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Sofía Ruiz</h6>
                  <div className="flex items-center">
                    <p className="text-sm">05 Abr 2022</p>
                    <span className="mx-2">•</span>
                    <p className="text-sm">7 min lectura</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <a href="#" className="mb-6 inline-block w-full max-w-full">
                <div className="w-full overflow-hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder image 1"
                    className="rounded-image aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <a
                href="#"
                className="mb-2 mr-4 inline-block max-w-full text-sm font-semibold"
              >
                Propósito
              </a>
              <a href="#" className="mb-2 block max-w-full">
                <h5 className="text-xl font-bold md:text-2xl">
                  El poder de la gratitud en tu vida
                </h5>
              </a>
              <p>
                La gratitud transforma nuestra perspectiva y nos acerca a Dios.
              </p>
              <div className="mt-6 flex items-center">
                <div className="mr-4 shrink-0">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder avatar 1"
                    className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Clara Torres</h6>
                  <div className="flex items-center">
                    <p className="text-sm">12 May 2022</p>
                    <span className="mx-2">•</span>
                    <p className="text-sm">3 min lectura</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <a href="#" className="mb-6 inline-block w-full max-w-full">
                <div className="w-full overflow-hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder image 1"
                    className="rounded-image aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <a
                href="#"
                className="mb-2 mr-4 inline-block max-w-full text-sm font-semibold"
              >
                Gratitud
              </a>
              <a href="#" className="mb-2 block max-w-full">
                <h5 className="text-xl font-bold md:text-2xl">
                  Cómo enfrentar desafíos con fe
                </h5>
              </a>
              <p>La fe nos da la fuerza para superar cualquier obstáculo.</p>
              <div className="mt-6 flex items-center">
                <div className="mr-4 shrink-0">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                    alt="Relume placeholder avatar 1"
                    className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-sm font-semibold">María Fernández</h6>
                  <div className="flex items-center">
                    <p className="text-sm">30 Jun 2022</p>
                    <span className="mx-2">•</span>
                    <p className="text-sm">8 min lectura</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
