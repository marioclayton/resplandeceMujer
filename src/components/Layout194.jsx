"use client";

import React from "react";

export function Layout194() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 darkBG">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <div className="order-2 md:order-1">
            <img
              src="/assets/IMG_2321.jpg"
              className="w-full object-cover rounded-4xl"
              alt="Relume placeholder image"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
              Conoce a nuestra autora: una mujer de fe y experiencia
              transformadora.
            </h2>
            <p className="md:text-md">
              Ileana Gamero de Clayton es esposa, madre de dos hijos y una
              cristiana apasionada con un llamado especial en su corazón. Como
              emprendedora y fundadora de Resplandece Mujer, su misión es
              fortalecer la fe de la mujer y la familia, guiándolas a descubrir
              su propósito en Dios.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
