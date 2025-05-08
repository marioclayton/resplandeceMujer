"use client";

import React from "react";
import { Button } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import Link from "next/link";

// Modify component to accept data as props instead of fetching it
export function Layout369({ layoutData }) {
  if (!layoutData) return null;

  // Use layoutData here instead of fetching directly
  return (
    <section id="relume" className="darkBG px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Inspiración</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Descubre tu propósito hoy
            </h2>
            <p className="md:text-md">
              Contenido destacado que te inspirará y guiará.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Latest Blog Post Card */}
          {layoutData.latestBlog ? (
            <div className="flex flex-col h-full border border-border-primary rounded-4xl overflow-hidden">
              <div className="flex flex-1 flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-sm font-semibold">Último Artículo</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    {layoutData.latestBlog.fields.blogTitle || "Artículo sin título"}
                  </h3>
                  <p className="line-clamp-3">
                    {layoutData.latestBlog.fields.blogExcerpt || "Lee nuestro artículo más reciente."}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-6">
                  <Link href={
                    layoutData.latestBlog.fields.blogSlug ? `/blog/${layoutData.latestBlog.fields.blogSlug}` :
                    `/blog`  // Fallback to blog index if no slug
                  }>
                    <Button
                      title="Leer Artículo"
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                    >
                      Leer Artículo
                    </Button>
                  </Link>
                </div>
              </div>
              {layoutData.latestBlog.fields.blogImage ? (
                <div className="h-56 md:h-64">
                  <img
                    src={layoutData.latestBlog.fields.blogImage.fields.file.url}
                    alt={layoutData.latestBlog.fields.blogTitle || "Blog image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-56 md:h-64 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col h-full border border-border-primary rounded-4xl overflow-hidden p-6">
              <p>No hay artículos disponibles</p>
            </div>
          )}

          {/* Featured Product Card - Hardcoded to 30 días devocional */}
          <div className="flex flex-col h-full border border-border-primary rounded-4xl overflow-hidden">
            {/* Content section */}
            <div className="flex flex-col justify-center p-6 flex-1">
              <div>
                <p className="mb-2 text-sm font-semibold">Producto Destacado</p>
                <h3 className="mb-2 text-xl font-bold md:text-2xl">
                  30 días descubriendo tu identidad en Dios
                </h3>
                <p className="line-clamp-3">
                  Un devocional de 30 días que te ayudará a descubrir quién eres en Cristo y cuál es tu propósito divino.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-4 md:mt-6">
                <Link href="/products/30-dias-descubriendo-tu-identidad-en-dios">
                  <Button
                    title="Ver Producto"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                  >
                    Ver Producto
                  </Button>
                </Link>
              </div>
            </div>
            {/* Image container */}
            <div className="h-56 md:h-64 mt-auto">
              <img
                src="https://images.ctfassets.net/z2axwray8yjn/6VqZIePYzYTQ2IlTL8UfAp/f41148eb8c4f7978ba37d556a9ffb690/PinkYellowAestheticRomanticFlowerWatercolorNotebookCover1.png"
                alt="30 días descubriendo tu identidad en Dios"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
