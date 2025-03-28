"use client";

import { Button, Card, Input } from "@relume_io/relume-ui";
import React from "react";

export function Cta40() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <Card className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Únete a nuestra comunidad hoy
            </h2>
            <p className="md:text-md">
              Suscríbete para recibir novedades y ofertas exclusivas de nuestros
              productos diseñados para ti.
            </p>
            <div className="mt-6 w-full max-w-sm md:mt-8">
              <form className="rb-4 mb-4 grid w-full max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
                <Input
                  id="email"
                  type="email"
                  placeholder="Introduce tu correo"
                />
                <Button
                  title="Suscribirse"
                  variant="primary"
                  size="sm"
                  className="items-center justify-center px-6 py-3"
                >
                  Suscribirse
                </Button>
              </form>
              <p className="text-xs">
                Al hacer clic en Suscribirse, aceptas nuestros Términos y
                Condiciones.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape4x3.svg"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
