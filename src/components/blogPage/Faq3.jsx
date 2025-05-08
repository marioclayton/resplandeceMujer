"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";

export function Faq3() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Preguntas
          </h2>
          <p className="md:text-md">
            Aquí encontrarás respuestas a las preguntas más comunes sobre
            nuestro blog y su contenido.
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contáctanos" variant="secondary">
              Contáctanos
            </Button>
          </div>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="item-0">
            <AccordionTrigger className="md:py-5 md:text-md">
              ¿Qué temas se abordan?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              En nuestro blog, abordamos temas de fe y crecimiento espiritual, desarrollo personal matrimonio y familia, asi como bienestar y salud fisica. Nuestro proposito es inspirar a la mujer a vivir con proposito y plenitud. Cada artículo está diseñado para ofrecer
              apoyo y reflexión.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="md:py-5 md:text-md">
              ¿Hay una comunidad?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Sí, fomentamos una comunidad activa y solidaria. Puedes unirte a
              nuestras redes sociales para conectarte con otras mujeres. Juntas,
              podemos crecer en fe y amistad.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="md:py-5 md:text-md">
              ¿Dónde encuentro recursos?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              En nuestra sección de recursos, encontrarás libros, guías y
              artículos recomendados. Estos materiales están diseñados para
              profundizar tu conocimiento y fe. Explora y aprovecha todo lo que
              ofrecemos.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="md:py-5 md:text-md">
              ¿Cómo me suscribo?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Puedes suscribirte ingresando tu correo en el formulario de la
              página. Recibirás actualizaciones sobre nuevos artículos y
              recursos. Únete a nuestra comunidad y no te pierdas nada.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
