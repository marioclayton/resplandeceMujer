"use client";

import React from "react";
import { Button } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import Link from "next/link";
import Image from "next/image";

// Utility to parse flexible dates
function parseFlexibleDate(dateStr) {
  let date = new Date(dateStr);
  if (!isNaN(date)) return date;
  const normalized = dateStr.replace(/-/g, '/');
  const parts = normalized.split('/');
  if (parts.length === 3) {
    let [a, b, c] = parts.map(p => p.trim());
    if (a.length === 4) return new Date(`${a}-${b.padStart(2, '0')}-${c.padStart(2, '0')}`);
    if (c.length === 4) return new Date(`${c}-${a.padStart(2, '0')}-${b.padStart(2, '0')}`);
  }
  return new Date('Invalid Date');
}

// Modify component to accept data as props instead of fetching it
export function Layout369({ layoutData }) {
  console.log("Layout369 received:", layoutData);

  if (!layoutData || !layoutData.blogs) return null;

  // Filter out blogs with invalid or missing dates
  const validBlogs = layoutData.blogs.filter(
    b => b.fields && b.fields.blogPublishDate && !isNaN(parseFlexibleDate(b.fields.blogPublishDate))
  );

  if (validBlogs.length === 0) return null;

  // Find the latest blog post by date
  const latestBlog = validBlogs.reduce((latest, current) => {
    const latestDate = parseFlexibleDate(latest.fields.blogPublishDate);
    const currentDate = parseFlexibleDate(current.fields.blogPublishDate);
    return currentDate > latestDate ? current : latest;
  }, validBlogs[0]); // <-- Provide initial value

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
          {latestBlog ? (
            <div className="flex flex-col h-full border border-border-primary rounded-4xl overflow-hidden">
              <div className="flex flex-1 flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-sm font-semibold">Último Artículo</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    {latestBlog.fields.blogTitle || "Artículo sin título"}
                  </h3>
                  <p className="line-clamp-3">
                    {latestBlog.fields.blogExcerpt || "Lee nuestro artículo más reciente."}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-6">
                  <Link href={
                    latestBlog.fields.blogSlug ? `/blog/${latestBlog.fields.blogSlug}` :
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
              {latestBlog.fields.blogImage ? (
                <div className="h-56 md:h-64">
                  <Image
                    src={
                      latestBlog.fields.blogImage.fields.file.url.startsWith("//")
                        ? "https:" + latestBlog.fields.blogImage.fields.file.url
                        : latestBlog.fields.blogImage.fields.file.url
                    }
                    alt={latestBlog.fields.blogTitle || "Blog image"}
                    className="w-full h-full object-cover"
                    width={1280}
                    height={853}
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
                <Link href="/productos/30-dias-descubriendo-tu-identidad-en-dios">
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
              <Image
                src="/assets/PinkYellowAestheticRomanticFlowerWatercolorNotebookCover1.webp"
                alt="30 días descubriendo tu identidad en Dios"
                className="w-full h-full object-cover"
                width={1280}
                height={853}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
