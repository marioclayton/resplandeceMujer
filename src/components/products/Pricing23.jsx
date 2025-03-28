"use client";

import {
  Button,
  Card,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@relume_io/relume-ui";
import React from "react";
import { BiCheck } from "react-icons/bi";

export function Pricing23() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-8 max-w-lg text-center md:mb-10 lg:mb-12">
          <p className="mb-3 font-semibold md:mb-4">Productos</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Planes de precios
          </h1>
          <p className="md:text-md">
            Descubre nuestros planes accesibles para ti.
          </p>
        </div>
        <Tabs defaultValue="monthly">
          <TabsList className="mx-auto mb-12 w-fit">
            <TabsTrigger value="monthly">Mensual</TabsTrigger>
            <TabsTrigger value="yearly">Anual</TabsTrigger>
          </TabsList>
          <TabsContent
            value="monthly"
            className="grid grid-cols-1 gap-8 data-[state=active]:animate-tabs lg:grid-cols-3"
          >
            <Card className="flex h-full flex-col justify-between px-6 py-8 md:p-8">
              <div>
                <div className="rb-6 mb-6 text-center md:mb-8">
                  <h6 className="text-md leading-[1.4] font-bold md:text-xl">
                    Plan Básico
                  </h6>
                  <h3 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                    $19/mo
                  </h3>
                </div>
                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Acceso a contenido exclusivo</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Soporte prioritario 24/7</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Actualizaciones regulares</p>
                  </div>
                </div>
              </div>
              <div>
                <Button title="Comenzar ahora" className="w-full">
                  Comenzar ahora
                </Button>
              </div>
            </Card>
            <Card className="flex h-full flex-col justify-between px-6 py-8 md:p-8">
              <div>
                <div className="rb-6 mb-6 text-center md:mb-8">
                  <h6 className="text-md leading-[1.4] font-bold md:text-xl">
                    Plan Empresarial
                  </h6>
                  <h3 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                    $29/mo
                  </h3>
                </div>
                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Todo en el Plan Básico</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Análisis de rendimiento</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Acceso a seminarios web</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Descuentos en productos</p>
                  </div>
                </div>
              </div>
              <div>
                <Button title="Comenzar ahora" className="w-full">
                  Comenzar ahora
                </Button>
              </div>
            </Card>
            <Card className="flex h-full flex-col justify-between px-6 py-8 md:p-8">
              <div>
                <div className="rb-6 mb-6 text-center md:mb-8">
                  <h6 className="text-md leading-[1.4] font-bold md:text-xl">
                    Plan Empresarial
                  </h6>
                  <h3 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                    $49/mo
                  </h3>
                </div>
                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Todo en el Plan Empresarial</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Asesoría personalizada</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Acceso a recursos premium</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Capacitación continua</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Eventos exclusivos</p>
                  </div>
                </div>
              </div>
              <div>
                <Button title="Comenzar ahora" className="w-full">
                  Comenzar ahora
                </Button>
              </div>
            </Card>
          </TabsContent>
          <TabsContent
            value="yearly"
            className="grid grid-cols-1 gap-8 data-[state=active]:animate-tabs lg:grid-cols-3"
          >
            <Card className="flex h-full flex-col justify-between px-6 py-8 md:p-8">
              <div>
                <div className="rb-6 mb-6 text-center md:mb-8">
                  <h6 className="text-md leading-[1.4] font-bold md:text-xl">
                    Plan Básico
                  </h6>
                  <h3 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                    $180/yr
                  </h3>
                  <p className="mt-2 font-medium">Ahorra 20%</p>
                </div>
                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Todo en el Plan Básico</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Acceso a contenido exclusivo</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Soporte prioritario 24/7</p>
                  </div>
                </div>
              </div>
              <div>
                <Button title="Comenzar ahora" className="w-full">
                  Comenzar ahora
                </Button>
              </div>
            </Card>
            <Card className="flex h-full flex-col justify-between px-6 py-8 md:p-8">
              <div>
                <div className="rb-6 mb-6 text-center md:mb-8">
                  <h6 className="text-md leading-[1.4] font-bold md:text-xl">
                    Plan Empresarial
                  </h6>
                  <h3 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                    $280/yr
                  </h3>
                  <p className="mt-2 font-medium">Ahorra 20%</p>
                </div>
                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Todo en el Plan Empresarial</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Asesoría personalizada</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Acceso a recursos premium</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Capacitación continua</p>
                  </div>
                </div>
              </div>
              <div>
                <Button title="Comenzar ahora" className="w-full">
                  Comenzar ahora
                </Button>
              </div>
            </Card>
            <Card className="flex h-full flex-col justify-between px-6 py-8 md:p-8">
              <div>
                <div className="rb-6 mb-6 text-center md:mb-8">
                  <h6 className="text-md leading-[1.4] font-bold md:text-xl">
                    Plan Empresarial
                  </h6>
                  <h3 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                    $480/yr
                  </h3>
                  <p className="mt-2 font-medium">Ahorra 20%</p>
                </div>
                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Todo en el Plan Empresarial</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Asesoría personalizada</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Acceso a recursos premium</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Capacitación continua</p>
                  </div>
                  <div className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      <BiCheck className="size-6" />
                    </div>
                    <p>Eventos exclusivos</p>
                  </div>
                </div>
              </div>
              <div>
                <Button title="Comenzar ahora" className="w-full">
                  Comenzar ahora
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
