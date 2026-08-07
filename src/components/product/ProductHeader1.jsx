"use client";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import { useAverageRating } from "./ProductReviews";

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  return <div className="flex gap-1" aria-label={`${rating} de 5 estrellas`}>{Array.from({ length: 5 }, (_, index) => index < full ? <BiSolidStar key={index} /> : half && index === full ? <BiSolidStarHalf key={index} /> : <BiStar key={index} />)}</div>;
}

export function ProductHeader1({ product }) {
  if (!product) return null;
  const { productName, productImage, productDescription, price, productCategory, externalUrl, isFreePdf, pdfFile, amazonUrl } = product.fields;
  const productId = product.sys?.id;
  const { averageRating, reviewCount } = useAverageRating(productId);
  const rawImage = productImage?.fields?.file?.url;
  const imageUrl = rawImage?.startsWith("//") ? `https:${rawImage}` : rawImage;

  return <header className="bg-[#f8f2e9] px-[5%] pb-20 pt-36 md:pb-28 md:pt-44"><div className="container"><div className="grid items-start gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-x-20">
    <div className="flex items-start justify-center overflow-hidden rounded-[2rem] border border-[#e0cec2] bg-[#efe1d4] p-6 shadow-[0_18px_50px_rgba(72,44,35,.08)]">{imageUrl ? <Image src={imageUrl} alt={productName || "Recurso de Resplandece Mujer"} width={700} height={840} className="aspect-[5/6] max-h-[560px] w-auto rounded-[1.25rem] object-contain" priority /> : <div className="flex aspect-[5/6] items-center justify-center text-[#8a746b]">Imagen próximamente</div>}</div>
    <div className="pt-2"><p className="eyebrow mb-5 text-[#9b5b47]">{productCategory || "Recurso para tu camino"}</p><h1 className="max-w-2xl text-[clamp(2.85rem,5.5vw,5rem)] font-normal leading-[1.02] tracking-[-.025em] text-[#2f211d]">{productName}</h1><p className="mt-6 text-xl font-semibold text-[#7d4032] md:text-2xl">{isFreePdf ? "Gratis" : `$${price || "0"}`}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-[#b9694f]"><Stars rating={Number.parseFloat(averageRating) || 0} /><p className="text-sm text-[#8a746b]">{reviewCount ? `${averageRating} · ${reviewCount} ${reviewCount === 1 ? "opinión" : "opiniones"}` : "Aún sin opiniones"}</p></div>
      <div className="mt-7 space-y-4 text-lg leading-8 text-[#55433c]">{productDescription ? documentToReactComponents(productDescription) : <p>Una herramienta creada para acompañar tu crecimiento espiritual.</p>}</div>
      <div className="mb-9 mt-8 flex flex-col gap-3">{isFreePdf && pdfFile && <a href={`/api/download?productId=${encodeURIComponent(productId)}`} className="button button-clay w-full">Descargar PDF gratis</a>}{!isFreePdf && externalUrl && <a href={externalUrl} target="_blank" rel="noopener noreferrer sponsored" className="button button-clay w-full">Comprar en Hotmart</a>}{!isFreePdf && amazonUrl && <a href={amazonUrl} target="_blank" rel="noopener noreferrer sponsored" className="button secondaryButton w-full">Comprar en Amazon</a>}</div>
      <div className="divide-y divide-[#d8c2b5] border-y border-[#d8c2b5]"><details className="group"><summary className="flex cursor-pointer list-none justify-between py-5 font-semibold">Sobre este recurso <span className="text-xl transition group-open:rotate-45">+</span></summary><p className="pb-6 leading-7 text-[#66544d]">Úsalo a tu ritmo como apoyo para la reflexión, la escritura y la oración personal.</p></details><details className="group"><summary className="flex cursor-pointer list-none justify-between py-5 font-semibold">Descarga y soporte <span className="text-xl transition group-open:rotate-45">+</span></summary><p className="pb-6 leading-7 text-[#66544d]">Si tienes dificultades para acceder al material, escríbenos desde la página de contacto.</p></details></div>
    </div>
  </div></div></header>;
}
