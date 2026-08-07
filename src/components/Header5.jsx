import Link from "next/link";
import Image from "next/image";
import { RxArrowRight } from "react-icons/rx";
import heroImage from "../../public/assets/pexels-ilyalisauskas-12041877.webp";

export function Header5() {
  return (
    <section className="home-hero relative isolate min-h-[92svh] overflow-hidden">
      <Image
        src={heroImage}
        alt="Mujer contemplando un paisaje sereno"
        fill
        loading="eager"
        fetchPriority="high"
        quality={65}
        placeholder="blur"
        className="object-cover object-[42%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(38,22,18,.82)_0%,rgba(38,22,18,.55)_48%,rgba(38,22,18,.08)_100%)]" />
      <div className="hero-glow absolute -bottom-40 -left-24 h-96 w-96 rounded-full" />

      <div className="container relative z-10 flex min-h-[92svh] items-center px-6 pb-16 pt-28 md:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6 text-[#f1cbb8]">Fe · esperanza · propósito</p>
          <h1 className="max-w-2xl text-[clamp(2.85rem,6.5vw,5.75rem)] font-normal leading-[1.02] tracking-[-.025em] text-[#fffaf2]">
            Hay una luz en ti que merece resplandecer.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#f7eee5]/90 md:text-xl">
            Enseñanzas bíblicas y recursos para crecer en tu relación con
            Jesucristo, renovar tu esperanza y vivir conforme a Su propósito.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link className="button button-light" href="/blog">
              Explorar reflexiones <RxArrowRight aria-hidden="true" />
            </Link>
            <Link className="button button-ghost-light" href="/acerca">
              Conoce este espacio
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-[5%] z-10 hidden items-center gap-3 text-sm text-[#fffaf2]/75 md:flex">
        <span className="h-px w-12 bg-[#fffaf2]/50" />
        Respira. Lee. Vuelve a ti.
      </div>
    </section>
  );
}
