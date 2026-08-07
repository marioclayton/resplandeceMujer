import Link from "next/link";
import Image from "next/image";
import { RxArrowRight, RxHeart, RxSun, RxReader } from "react-icons/rx";

const pillars = [
  {
    icon: RxSun,
    number: "01",
    title: "Fe que sostiene",
    text: "Enseñanzas bíblicas para permanecer en Cristo y encontrar paz, identidad y dirección en cada temporada.",
  },
  {
    icon: RxHeart,
    number: "02",
    title: "Esperanza renovada",
    text: "Reflexiones para renovar tu mente, cuidar tu corazón y confiar en el amor de Jesús en cada proceso.",
  },
  {
    icon: RxReader,
    number: "03",
    title: "Recursos que acompañan",
    text: "Devocionales y herramientas prácticas para reflejar el amor de Cristo en tu hogar, tu familia y tu comunidad.",
  },
];

export function Layout4() {
  return (
    <>
      <section className="section-shell bg-[#efe1d4]">
        <div className="container px-6 md:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#8d4d3c]">Un lugar para crecer</p>
            <h2 className="mt-4 text-5xl leading-none text-[#2f211d] md:text-7xl">
              Tu vida espiritual también necesita espacio para respirar.
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] bg-[#cbaea0] md:grid-cols-3">
            {pillars.map(({ icon: Icon, number, title, text }) => (
              <div className="bg-[#f8f2e9] p-8 lg:p-10" key={title}>
                <div className="flex items-center justify-between">
                  <Icon className="h-7 w-7 text-[#9b5b47]" aria-hidden="true" />
                  <span className="text-sm text-[#9b7568]">{number}</span>
                </div>
                <h3 className="mt-10 text-3xl text-[#2f211d]">{title}</h3>
                <p className="mt-4 leading-7 text-[#66544d]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell overflow-hidden bg-[#3c211b] text-[#fff8ef]">
        <div className="container grid items-center gap-12 px-6 md:grid-cols-2 md:px-8 lg:gap-20">
          <div className="relative min-h-[30rem] overflow-hidden rounded-[2rem]">
            <Image
              src="/assets/pexels-mart-production-7218327.jpg"
              alt="Mujer disfrutando un momento de quietud y reflexión"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="max-w-xl">
            <p className="eyebrow text-[#e6bca8]">Nuestra esencia</p>
            <h2 className="mt-4 text-5xl leading-none text-[#fff8ef] md:text-7xl">
              Una voz cercana, sin protagonismos.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#eadbd2]">
              Resplandece Mujer nació para señalar hacia Jesús, no hacia una persona.
              Aquí importa el mensaje: cuando una mujer permanece en Cristo, su vida
              es transformada desde el corazón y puede reflejar Su amor dondequiera que esté.
            </p>
            <Link href="/acerca" className="button button-light mt-8">
              Nuestra historia <RxArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-8 md:py-28">
        <div className="container rounded-[2.5rem] bg-[#b9694f] px-7 py-14 text-center md:px-14 md:py-20">
          <p className="eyebrow text-[#ffe0d0]">Un regalo para comenzar</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-5xl leading-none text-white md:text-7xl">
            Descubre tu identidad en Dios, un día a la vez.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#fff3ed]">
            Explora nuestro devocional gratuito de 30 días y crea un ritmo de
            reflexión que puedas sostener.
          </p>
          <Link
            href="/productos/30-dias-descubriendo-tu-identidad-en-dios"
            className="button button-light mt-8"
          >
            Ver el devocional <RxArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
