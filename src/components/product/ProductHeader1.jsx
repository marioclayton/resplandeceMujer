"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@relume_io/relume-ui";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";

const Star = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const isFullStar = i < fullStars;
        const isHalfStar = hasHalfStar && i === fullStars;

        return (
          <div key={i}>
            {isFullStar ? (
              <BiSolidStar />
            ) : isHalfStar ? (
              <BiSolidStarHalf />
            ) : (
              <BiStar />
            )}
          </div>
        );
      })}
    </div>
  );
};

const useCarousel = () => {
  const [mainApi, setMainApi] = useState();
  const [thumbApi, setThumbApi] = useState();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!mainApi || !thumbApi) {
      return;
    }
    mainApi.on("select", () => {
      const index = mainApi.selectedScrollSnap();
      setCurrent(index);
      thumbApi.scrollTo(index);
    });
  }, [mainApi, thumbApi]);
  const handleClick = (index) => () => {
    return mainApi?.scrollTo(index);
  };
  const getThumbStyles = (index) => {
    return clsx("block", current === index && "opacity-60");
  };
  return {
    setMainApi,
    setThumbApi,
    handleClick,
    getThumbStyles,
  };
};

export function ProductHeader1({ product }) {
  const useActive = useCarousel();

  if (!product) return null;

  const {
    productName,
    productImage,
    productDescription,
    price,
    productCategory,
    externalUrl,
  } = product.fields;

  return (
    <header id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <Breadcrumb className="mb-6 flex flex-wrap items-center text-sm">
          <BreadcrumbList>
            <Fragment>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Ver todo</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
            <Fragment>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/category/${productCategory}`}>
                  {productCategory}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
            <Fragment>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{productName}</BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-1 gap-y-8 md:gap-y-10 lg:grid-cols-[1.25fr_1fr] lg:gap-x-20">
          <div className="grid grid-cols-1 md:grid-cols-[5rem_1fr] md:gap-x-4">
            <div className="relative hidden h-full md:block">
              <div className="absolute top-0 bottom-0 max-h-full overflow-y-auto">
                <Carousel
                  setApi={useActive.setThumbApi}
                  orientation="vertical"
                  opts={{
                    align: "start",
                    containScroll: "keepSnaps",
                    dragFree: true,
                  }}
                  className="m-0"
                >
                  <CarouselContent className="m-0 gap-y-4">
                    <CarouselItem className="p-0">
                      <button
                        onClick={useActive.handleClick(0)}
                        className={useActive.getThumbStyles(0)}
                      >
                        <img
                          src={productImage.fields.file.url}
                          alt={productName}
                          className="aspect-[5/6] size-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
            <div className="overflow-hidden">
              <Carousel
                setApi={useActive.setMainApi}
                opts={{ loop: true, align: "start" }}
                className="m-0"
              >
                <CarouselContent className="m-0">
                  <CarouselItem className="basis-full pl-0">
                    <button>
                      <img
                        src={productImage.fields.file.url}
                        alt={productName}
                        className="aspect-[5/6] size-full object-cover"
                      />
                    </button>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          <div>
            <h1 className="mb-2 text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl">
              {productName}
            </h1>
            <p className="mb-5 text-xl font-bold md:mb-6 md:text-2xl">
              ${price}
            </p>
            <div className="mb-5 flex flex-wrap items-center gap-3 md:mb-6">
              <Star rating={3.5} />
              <p className="text-sm">(3.5 estrellas) • 10 opiniones</p>
            </div>
            <div className="mb-5 md:mb-6">
              {documentToReactComponents(productDescription)}
            </div>
            <form className="mb-8">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col">
                  <Label className="mb-2">Variante</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-choice">Option One</SelectItem>
                      <SelectItem value="second-choice">Option Two</SelectItem>
                      <SelectItem value="third-choice">Option Three</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <Label className="mb-2">Variante</Label>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="rounded-button inline-flex gap-3 items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none border border-border-primary bg-background-alternative text-text-alternative px-4 py-2"
                    >
                      Opción uno
                    </a>
                    <a
                      href="#"
                      className="rounded-button inline-flex gap-3 items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none border border-border-primary text-text-primary bg-background-primary px-4 py-2"
                    >
                      Opción dos
                    </a>
                    <a
                      href="#"
                      className="rounded-button inline-flex gap-3 items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none border border-border-primary text-text-primary bg-background-primary px-4 py-2 pointer-events-none opacity-25"
                    >
                      Opción tres
                    </a>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="quantity" className="mb-2">
                    Cantidad
                  </Label>
                  <Input
                    type="number"
                    id="quantity"
                    placeholder="1"
                    className="w-16"
                  />
                </div>
              </div>
              <div className="mt-8 mb-4 flex flex-col gap-y-4">
                <Button title="Agregar al carrito">Agregar al carrito</Button>
                <Button title="Comprar ahora" variant="secondary">
                  Comprar ahora
                </Button>
              </div>
              <p className="text-center text-xs">Envío gratis sobre $50</p>
            </form>
            <Accordion type="multiple">
              <AccordionItem value="item-0">
                <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                  Detalles
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Si no estás completamente satisfecha con tu compra, puedes
                  devolver el producto en un plazo de 30 días. Asegúrate de que
                  esté en su estado original. Consulta nuestra política de
                  devoluciones para más detalles.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                  Envío
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Si no estás completamente satisfecha con tu compra, puedes
                  devolver el producto en un plazo de 30 días. Asegúrate de que
                  esté en su estado original. Consulta nuestra política de
                  devoluciones para más detalles.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                  Devoluciones
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Si no estás completamente satisfecha con tu compra, puedes
                  devolver el producto en un plazo de 30 días. Asegúrate de que
                  esté en su estado original. Consulta nuestra política de
                  devoluciones para más detalles.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </header>
  );
}
