import Image from "next/image";
import Link from "next/link";
import { RxArrowRight } from "react-icons/rx";

export default function Product10({ products }) {
  const sortedProducts = (products || [])
    .filter((product) => product?.fields?.productName && product?.fields?.productSlug)
    .slice()
    .sort((a, b) => (a.fields.displayOrder ?? 999) - (b.fields.displayOrder ?? 999));

  return (
    <section className="bg-[#f8f2e9] px-[5%] pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="container">
        <header className="mb-14 border-b border-[#d8c2b5] pb-14 text-center md:mb-20 md:pb-20">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-5 text-[#9b5b47]">Recursos para crecer</p>
            <h1 className="text-[clamp(2.85rem,6.5vw,5.75rem)] font-normal leading-[1.02] tracking-[-.025em] text-[#2f211d]">
              Herramientas para acompañar tu fe
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#66544d]">
              Devocionales y recursos creados para ayudarte a hacer una pausa, profundizar y llevar la fe a tu vida diaria.
            </p>
          </div>
        </header>

        <section className="mb-16 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-start lg:mb-20 lg:gap-16" aria-labelledby="resources-intro-title">
          <div>
            <p className="eyebrow text-[#9b5b47]">Más que una lectura</p>
            <h2 id="resources-intro-title" className="mt-4 text-4xl font-normal leading-tight text-[#2f211d] md:text-5xl">
              Recursos pensados para acompañar procesos reales.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-[#66544d]">
            <p>
              Nuestros recursos reúnen reflexiones, preguntas y ejercicios sencillos para ayudarte a profundizar en tu identidad, ordenar tus pensamientos y crear hábitos espirituales que puedan sostenerse en medio de la vida cotidiana.
            </p>
            <p>
              No se trata de avanzar rápido ni de hacerlo perfecto. Cada material está diseñado para que puedas detenerte, escribir, orar y volver sobre aquello que Dios está trabajando en tu corazón. Puedes recorrerlos sola, con una amiga o junto a tu grupo de mujeres.
            </p>
          </div>
        </section>

        <div className="mb-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-[#d8c2b5] sm:grid-cols-3">
          <div className="bg-[#efe1d4] p-6"><p className="text-sm font-bold text-[#7d4032]">A tu propio ritmo</p><p className="mt-2 text-sm leading-6 text-[#66544d]">Avanza según tu temporada y regresa a cada enseñanza cuando la necesites.</p></div>
          <div className="bg-[#efe1d4] p-6"><p className="text-sm font-bold text-[#7d4032]">Con aplicación práctica</p><p className="mt-2 text-sm leading-6 text-[#66544d]">Convierte la reflexión en oración, escritura y pequeños pasos para tu día.</p></div>
          <div className="bg-[#efe1d4] p-6"><p className="text-sm font-bold text-[#7d4032]">Para compartir</p><p className="mt-2 text-sm leading-6 text-[#66544d]">Úsalos en tu tiempo personal o compártelos con amigas y grupos de fe.</p></div>
        </div>

        {sortedProducts.length ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => {
              const fileUrl = product.fields.productImage?.fields?.file?.url;
              const imageUrl = fileUrl?.startsWith("//") ? `https:${fileUrl}` : fileUrl;
              return (
                <article key={product.sys.id} className="group overflow-hidden rounded-[2rem] border border-[#e0cec2] bg-[#fffaf2] shadow-[0_12px_35px_rgba(72,44,35,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(72,44,35,.1)]">
                  <Link href={`/productos/${product.fields.productSlug}`} className="block">
                    <div className="relative aspect-[4/4.6] overflow-hidden bg-[#efe1d4]">
                      {imageUrl ? <Image src={imageUrl} alt={product.fields.productName} fill className="object-cover transition duration-700 group-hover:scale-[1.035]" sizes="(max-width: 768px) 100vw, 33vw" /> : <div className="flex h-full items-center justify-center text-[#8a746b]">Imagen próximamente</div>}
                      {product.fields.isFreePdf && <span className="absolute left-5 top-5 rounded-full bg-[#fffaf2]/95 px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#7d4032] backdrop-blur">Recurso gratuito</span>}
                    </div>
                    <div className="p-7">
                      <p className="text-xs font-bold uppercase tracking-[.14em] text-[#9b5b47]">{product.fields.productCategory || "Devocional"}</p>
                      <h2 className="mt-3 text-3xl font-normal leading-tight text-[#2f211d] transition group-hover:text-[#9b5b47]">{product.fields.productName}</h2>
                      <div className="mt-6 flex items-center justify-between border-t border-[#eadbd1] pt-5">
                        <span className="font-semibold text-[#66544d]">{product.fields.isFreePdf ? "Gratis" : `$${product.fields.price || "0"}`}</span>
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#7d4032]">Ver recurso <RxArrowRight /></span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : <p className="rounded-[2rem] bg-[#fffaf2] p-12 text-center text-[#66544d]">Muy pronto encontrarás nuevos recursos.</p>}

        <section className="mt-20 grid overflow-hidden rounded-[2rem] bg-[#3c211b] text-[#fff8ef] md:grid-cols-[1.1fr_.9fr]">
          <div className="p-8 md:p-12 lg:p-14">
            <p className="eyebrow text-[#e2ad94]">Cómo aprovecharlos</p>
            <h2 className="mt-4 text-4xl font-normal leading-tight text-[#fff8ef] md:text-5xl">Haz espacio para lo que quieres cultivar.</h2>
            <p className="mt-5 max-w-xl leading-7 text-[#ddcbc1]">Elige un momento tranquilo, prepara un cuaderno y permite que cada pregunta te lleve más allá de una respuesta rápida. La transformación suele crecer en lo pequeño y constante.</p>
          </div>
          <div className="border-t border-white/15 p-8 md:border-l md:border-t-0 md:p-12 lg:p-14">
            <p className="text-sm font-bold uppercase tracking-[.14em] text-[#e2ad94]">Una práctica sencilla</p>
            <ol className="mt-6 space-y-5 text-sm leading-6 text-[#eadbd2]"><li><span className="mr-3 text-[#e2ad94]">01</span> Lee sin prisa y subraya lo que te hable.</li><li><span className="mr-3 text-[#e2ad94]">02</span> Escribe una oración o una decisión concreta.</li><li><span className="mr-3 text-[#e2ad94]">03</span> Vuelve durante la semana y observa tu proceso.</li></ol>
          </div>
        </section>
      </div>
    </section>
  );
}
