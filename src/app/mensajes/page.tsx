import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RxArrowRight } from "react-icons/rx";
import { getShortMessages } from "../../lib/messages";

export const metadata: Metadata = {
  title: "Mensajes de fe y esperanza",
  description: "Palabras breves inspiradas en la Biblia para fortalecer tu fe, renovar tu esperanza y volver el corazón a Dios cada día.",
  alternates: { canonical: "/mensajes" },
};

// Keep newly published Contentful messages reasonably fresh without fetching
// on every request.
export const revalidate = 60;

export default async function MensajesPage() {
  const messages = await getShortMessages();
  const [featured, ...remaining] = messages;

  return (
    <main className="bg-[#f8f2e9]">
      <section className="px-[5%] pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="container px-1 md:px-8">
          <header className="grid gap-8 border-b border-[#d8c2b5] pb-14 md:grid-cols-[1.1fr_.9fr] md:items-end md:pb-20">
            <div className="max-w-3xl">
              <p className="eyebrow text-[#9b5b47]">Una pausa para tu día</p>
              <h1 className="mt-5 text-[clamp(2.6rem,5.6vw,5rem)] font-normal leading-[1.04] tracking-[-.025em] text-[#2f211d]">
                Mensajes que acercan tu corazón a la verdad
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#66544d]">
              Guarda estas palabras para los días en que necesites respirar, recordar una promesa y dirigir nuevamente tu mirada hacia Jesús
            </p>
          </header>

          <article className="mt-14 grid overflow-hidden rounded-[2.25rem] bg-[#3c211b] text-[#fff8ef] md:mt-20 lg:grid-cols-[.85fr_1.15fr]">
            <div className="relative min-h-80 lg:min-h-[34rem]">
              <Image src={featured.image} alt={featured.imageAlt} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" style={{ objectPosition: featured.imagePosition }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3c211b]/35 to-transparent lg:bg-gradient-to-r" aria-hidden="true" />
            </div>
            <div className="relative flex flex-col justify-center px-7 py-12 md:px-14 md:py-16 lg:px-16">
              <div className="flex items-start justify-between gap-6">
                <p className="eyebrow text-[#e2ad94]">{featured.theme} · mensaje destacado</p>
                <span className="font-[var(--font-cuprum)] text-7xl leading-[.6] text-[#e2ad94]/55" aria-hidden="true">“</span>
              </div>
              <blockquote className="mt-8 font-[var(--font-noto-sans)] text-xl font-normal leading-[1.65] tracking-normal md:text-2xl">
                {featured.text}
              </blockquote>
              <p className="mt-9 text-sm text-[#d8c5bb]">{featured.reference}</p>
            </div>
          </article>

          <section className="mt-16 md:mt-24" aria-labelledby="all-messages-title">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#9b5b47]">Para cada temporada</p>
              <h2 id="all-messages-title" className="mt-4 text-4xl leading-none text-[#2f211d] md:text-6xl">Encuentra una palabra para este momento</h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {remaining.map((message, index) => (
                <article key={message.id} className={`overflow-hidden rounded-[2rem] border ${index % 3 === 1 ? "border-[#d5b3a1] bg-[#e7cbbd]" : "border-[#dfcbbf] bg-[#fffaf2]"}`}>
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image src={message.image} alt={message.imageAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 hover:scale-[1.025]" style={{ objectPosition: message.imagePosition }} />
                  </div>
                  <div className="flex min-h-72 flex-col justify-between p-7 md:p-8">
                    <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="eyebrow text-[#8d4d3c]">{message.theme}</p>
                      <span className="font-[var(--font-cuprum)] text-5xl leading-none text-[#b9694f]/50" aria-hidden="true">“</span>
                    </div>
                    <blockquote className="mt-5 font-[var(--font-noto-sans)] text-[1.08rem] font-normal leading-[1.75] tracking-normal text-[#2f211d]">
                      {message.text}
                    </blockquote>
                    </div>
                    <p className="mt-8 text-sm text-[#755f56]">{message.reference}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="bg-[#efe1d4] px-[5%] py-20 text-center md:py-28">
        <div className="container px-6 md:px-8">
          <p className="eyebrow text-[#9b5b47]">Sigue profundizando</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-none text-[#2f211d] md:text-6xl">De una palabra breve a una reflexión más profunda</h2>
          <Link href="/blog" className="button button-clay mt-8">Explorar el blog <RxArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
