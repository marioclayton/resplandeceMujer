"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const postsPerPage = 12;

export function Blog1({ initialPosts = [] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const categories = [...new Set(initialPosts.map((post) => post.fields.blogCategories).filter(Boolean))];
  const filteredPosts = activeCategory === "all" ? initialPosts : initialPosts.filter((post) => post.fields.blogCategories === activeCategory);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  useEffect(() => setCurrentPage(1), [activeCategory]);

  return (
    <section id="blog" className="bg-[#f8f2e9] px-[5%] pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="container">
        <header className="mb-14 border-b border-[#d8c2b5] pb-14 text-center md:mb-20 md:pb-20">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-5 text-[#9b5b47]">Reflexiones para tu camino</p>
            <h1 className="text-[clamp(2.85rem,6.5vw,5.75rem)] font-normal leading-[1.02] tracking-[-.025em] text-[#2f211d]">
              Descubre el poder transformador de la fe
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#66544d]">
              Historias, enseñanzas y pausas de reflexión para fortalecer tu fe y vivir con mayor intención.
            </p>
          </div>
        </header>

        <section className="mb-16 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-start lg:mb-20 lg:gap-16" aria-labelledby="blog-intro-title">
          <div>
            <p className="eyebrow text-[#9b5b47]">Un espacio para volver a lo esencial</p>
            <h2 id="blog-intro-title" className="mt-4 text-4xl font-normal leading-tight text-[#2f211d] md:text-5xl">
              Fe para los días luminosos y también para los difíciles.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-[#66544d]">
            <p>
              En este blog encontrarás reflexiones bíblicas y conversaciones honestas sobre identidad, familia, bienestar emocional y crecimiento personal. Cada artículo nace con una intención sencilla: acompañarte a mirar tu vida con esperanza y responder a ella con sabiduría.
            </p>
            <p>
              No necesitas leerlo todo de una vez. Elige la categoría que se parezca a tu temporada, guarda aquello que quieras meditar y regresa cuando necesites una pausa. Queremos que estas palabras se conviertan en compañía práctica, no solamente en inspiración momentánea.
            </p>
          </div>
        </section>

        <div className="mb-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-[#d8c2b5] sm:grid-cols-3">
          <div className="bg-[#efe1d4] p-6"><p className="text-sm font-bold text-[#7d4032]">Para fortalecer tu fe</p><p className="mt-2 text-sm leading-6 text-[#66544d]">Enseñanzas que conectan la Palabra con las preguntas de cada día.</p></div>
          <div className="bg-[#efe1d4] p-6"><p className="text-sm font-bold text-[#7d4032]">Para cuidar tu interior</p><p className="mt-2 text-sm leading-6 text-[#66544d]">Reflexiones sobre emociones, descanso, identidad y relaciones saludables.</p></div>
          <div className="bg-[#efe1d4] p-6"><p className="text-sm font-bold text-[#7d4032]">Para vivir con propósito</p><p className="mt-2 text-sm leading-6 text-[#66544d]">Ideas sencillas que te ayudan a convertir lo aprendido en pasos concretos.</p></div>
        </div>

        <div className="mb-14 flex flex-wrap justify-center gap-2" aria-label="Filtrar artículos por categoría">
          {[{ label: "Ver todo", value: "all" }, ...categories.map((category) => ({ label: category, value: category }))].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveCategory(value)}
              className={`rounded-full border px-5 py-2.5 text-sm ${activeCategory === value ? "border-[#9b5b47] bg-[#9b5b47] text-white" : "border-[#d8c2b5] text-[#66544d] hover:border-[#9b5b47] hover:text-[#7d4032]"}`}
              aria-pressed={activeCategory === value}
            >
              {label}
            </button>
          ))}
        </div>

        {currentPosts.length ? (
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post, index) => {
              const slug = post.fields.blogSlug || post.fields.slug;
              const fileUrl = post.fields.blogImage?.fields?.file?.url;
              const imageUrl = fileUrl?.startsWith("//") ? `https:${fileUrl}` : fileUrl;
              return (
                <article key={post.sys.id} className="group overflow-hidden rounded-[1.75rem] border border-[#e0cec2] bg-[#fffaf2] shadow-[0_12px_35px_rgba(72,44,35,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(72,44,35,.1)]">
                  <Link href={`/blog/${slug}`} className="block">
                    {imageUrl && (
                      <div className="overflow-hidden">
                        <Image src={imageUrl} alt={post.fields.blogTitle || "Artículo de Resplandece Mujer"} width={800} height={600} className="aspect-[3/2] w-full object-cover transition duration-700 group-hover:scale-[1.04]" priority={index < 3} />
                      </div>
                    )}
                    <div className="px-6 pb-7 pt-6">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-[#9b5b47]">{post.fields.blogCategories}</p>
                      <h2 className="text-3xl font-normal leading-tight text-[#2f211d] transition group-hover:text-[#9b5b47]">{post.fields.blogTitle}</h2>
                      <p className="mt-3 line-clamp-3 leading-7 text-[#66544d]">{post.fields.blogExcerpt}</p>
                      <div className="mt-6 flex items-center justify-between border-t border-[#eadbd1] pt-4 text-xs text-[#8a746b]">
                        <span>{post.fields.blogPublishDate}</span><span>5 min de lectura</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : <p className="py-16 text-center text-[#66544d]">No hay artículos en esta categoría.</p>}

        {totalPages > 1 && (
          <nav className="mt-16 flex flex-wrap items-center justify-center gap-2" aria-label="Paginación del blog">
            <button onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={currentPage === 1} className="rounded-full border border-[#d8c2b5] px-4 py-2 text-sm text-[#66544d] disabled:cursor-not-allowed disabled:opacity-40">← Anterior</button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)} aria-current={currentPage === page ? "page" : undefined} className={`flex h-10 min-w-10 items-center justify-center rounded-full border text-sm ${currentPage === page ? "border-[#9b5b47] bg-[#f8f2e9] font-bold text-[#7d4032]" : "border-transparent text-[#66544d] hover:border-[#d8c2b5] hover:bg-[#efe1d4]"}`}>{page}</button>
            ))}
            <button onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={currentPage === totalPages} className="rounded-full border border-[#d8c2b5] px-4 py-2 text-sm text-[#66544d] disabled:cursor-not-allowed disabled:opacity-40">Siguiente →</button>
          </nav>
        )}

        <section className="mt-20 rounded-[2rem] bg-[#3c211b] px-7 py-12 text-center text-[#fff8ef] md:px-12 md:py-16">
          <p className="eyebrow text-[#e2ad94]">Lee a tu propio ritmo</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-normal leading-tight text-[#fff8ef] md:text-5xl">Una reflexión puede ser el comienzo de una conversación más profunda con Dios.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#ddcbc1]">Haz una pausa antes de continuar con tu día. Anota una frase, comparte el artículo con una amiga o llévalo a tu tiempo de oración.</p>
        </section>
      </div>
    </section>
  );
}
