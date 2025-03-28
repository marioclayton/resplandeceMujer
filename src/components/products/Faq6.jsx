"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
} from "@relume_io/relume-ui";
import React from "react";
import { RxPlus } from "react-icons/rx";

export function Faq6() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
        <div>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Preguntas
          </h2>
          <p className="md:text-md">
            Aquí encontrarás respuestas a tus preguntas más frecuentes sobre
            nuestros productos y servicios.
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contáctanos" variant="secondary">
              Contáctanos
            </Button>
          </div>
        </div>
        <Accordion
          type="multiple"
          className="grid items-start justify-stretch gap-4"
        >
          <Card>
            <AccordionItem value="item-0" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                ¿Cuáles son los métodos de pago?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Aceptamos diversas formas de pago, incluyendo tarjetas de
                crédito y débito, PayPal y transferencias bancarias. Asegúrate
                de elegir la opción que más te convenga al momento de realizar
                tu compra. Si tienes dudas, no dudes en contactarnos.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem value="item-1" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                ¿Cómo se realizan los envíos?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Realizamos envíos a todo el país mediante servicios confiables.
                El tiempo de entrega varía según la ubicación, pero generalmente
                es de 3 a 7 días hábiles. Te proporcionaremos un número de
                seguimiento para que puedas rastrear tu pedido.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem value="item-2" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                ¿Puedo devolver un producto?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Sí, aceptamos devoluciones dentro de los 30 días posteriores a
                la compra. El producto debe estar en su estado original y sin
                usar. Para iniciar el proceso de devolución, contáctanos y te
                guiaremos.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem value="item-3" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                ¿Ofrecen descuentos por volumen?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Sí, ofrecemos descuentos especiales para compras al por mayor.
                Si estás interesada en adquirir productos en grandes cantidades,
                contáctanos para más detalles sobre nuestras tarifas y
                promociones. Estamos aquí para ayudarte a obtener el mejor
                precio.
              </AccordionContent>
            </AccordionItem>
          </Card>
          <Card>
            <AccordionItem value="item-4" className="border-none px-5 md:px-6">
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                ¿Cómo puedo hacer un seguimiento de mi pedido?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Una vez que tu pedido haya sido enviado, recibirás un correo
                electrónico con un número de seguimiento. Puedes usar este
                número en nuestro sitio web para ver el estado de tu envío. Si
                tienes alguna duda, no dudes en contactarnos.
              </AccordionContent>
            </AccordionItem>
          </Card>
        </Accordion>
      </div>
    </section>
  );
}
