import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RxArrowRight, RxHeart, RxSun, RxValue } from "react-icons/rx";

export const metadata: Metadata = {
  title: "Acerca",
  description: "Conoce cómo Resplandece Mujer acompaña a cada mujer a crecer en su relación con Jesucristo y reflejar Su amor.",
  alternates: { canonical: "/acerca" },
};

const values = [
  { icon: RxSun, title: "Esperanza", text: "Creemos en palabras que alumbran sin ignorar las temporadas difíciles." },
  { icon: RxHeart, title: "Cercanía", text: "Escribimos como quien se sienta a tu lado: con verdad, gracia y sin juicio." },
  { icon: RxValue, title: "Propósito", text: "Cada reflexión busca ayudarte a llevar la fe a decisiones y hábitos cotidianos." },
];

export default function AcercaPage() {
  return (
    <main>
      <section className="bg-[#3c211b] px-[5%] pb-24 pt-40 text-[#fff8ef] md:pb-32 md:pt-48">
        <div className="container grid items-end gap-12 md:grid-cols-[1.1fr_.9fr]">
          <div><p className="eyebrow text-[#e2ad94]">Acerca de este espacio</p><h1 className="mt-5 text-6xl leading-[.95] text-[#fff8ef] md:text-8xl">Una invitación a vivir desde adentro hacia afuera.</h1></div>
          <p className="max-w-xl text-lg leading-8 text-[#e5d4cb]">Resplandece Mujer acompaña a cada mujer a crecer en su relación con Jesucristo y reflejar Su amor en cada área de su vida.</p>
        </div>
      </section>

      <section className="section-shell bg-[#f8f2e9]">
        <div className="container grid items-center gap-12 px-6 md:grid-cols-2 md:px-8 lg:gap-20">
          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem]"><Image src="/assets/pexels-garonpiceli-852793.jpg" alt="Un momento sereno de lectura y reflexión" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div>
          <div><p className="eyebrow text-[#9b5b47]">Por qué existimos</p><h2 className="mt-4 text-5xl leading-none md:text-7xl">Para ayudarte a permanecer en Cristo y resplandecer con Su luz.</h2><div className="mt-7 space-y-5 text-lg leading-8 text-[#66544d]"><p>Resplandece Mujer es un espacio creado para acompañar a cada mujer a crecer en su relación con Jesucristo y reflejar Su amor en cada área de su vida.</p><p>Aquí encontrarás enseñanzas bíblicas, reflexiones, recursos y herramientas prácticas para fortalecer tu fe, renovar tu esperanza y vivir conforme al propósito que Dios tiene para ti.</p><p>Creemos que cuando una mujer permanece en Cristo, su vida es transformada desde el corazón y puede resplandecer con la luz de Jesús en su hogar, su familia y el mundo que la rodea.</p><p>La autora permanece anónima intencionalmente. La atención no está en un rostro ni en una marca personal, sino en Jesús y en el mensaje que puede transformar tu vida.</p></div></div>
        </div>
      </section>

      <section className="section-shell bg-[#efe1d4]">
        <div className="container px-6 md:px-8"><p className="eyebrow text-[#9b5b47]">Lo que nos guía</p><h2 className="mt-4 max-w-2xl text-5xl leading-none md:text-7xl">Tres valores, una misma intención.</h2><div className="mt-12 grid gap-5 md:grid-cols-3">{values.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-[2rem] bg-[#fffaf2] p-8"><Icon className="h-8 w-8 text-[#a85f48]" /><h3 className="mt-8 text-3xl">{title}</h3><p className="mt-3 leading-7 text-[#66544d]">{text}</p></div>)}</div></div>
      </section>

      <section className="px-[5%] py-20 text-center md:py-28"><div className="container"><p className="eyebrow text-[#9b5b47]">Tu camino continúa</p><h2 className="mx-auto mt-4 max-w-3xl text-5xl leading-none md:text-7xl">Quizás hoy encuentres justo las palabras que necesitabas.</h2><Link href="/blog" className="button button-clay mt-8">Explorar el blog <RxArrowRight /></Link></div></section>
    </main>
  );
}
