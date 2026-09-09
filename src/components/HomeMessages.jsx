import Link from "next/link";
import { RxArrowRight } from "react-icons/rx";
import { messages } from "../data/messages";

export function HomeMessages() {
  const featuredMessages = messages.slice(0, 3);

  return (
    <section className="section-shell overflow-hidden bg-[#fffaf2]">
      <div className="container px-6 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#9b5b47]">Un mensaje para hoy</p>
            <h2 className="mt-4 text-4xl leading-none text-[#2f211d] md:text-6xl">
              Palabras breves para volver el corazón a Dios
            </h2>
          </div>
          <Link href="/mensajes" className="text-link shrink-0">
            Ver todos los mensajes <RxArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featuredMessages.map((message, index) => (
            <article
              key={message.id}
              className={`flex min-h-80 flex-col justify-between rounded-[2rem] p-8 md:p-10 ${index === 1 ? "bg-[#3c211b] text-[#fff8ef]" : "border border-[#dfcbbf] bg-[#efe1d4] text-[#2f211d]"}`}
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className={`eyebrow ${index === 1 ? "text-[#e2ad94]" : "text-[#8d4d3c]"}`}>{message.theme}</p>
                  <span className={`font-[var(--font-cuprum)] text-5xl leading-none ${index === 1 ? "text-[#e2ad94]/70" : "text-[#b9694f]/55"}`} aria-hidden="true">“</span>
                </div>
                <blockquote className="mt-7 font-[var(--font-cuprum)] text-[1.75rem] leading-[1.2] tracking-[-.02em]">
                  {message.text}
                </blockquote>
              </div>
              <p className={`mt-10 text-sm ${index === 1 ? "text-[#d8c5bb]" : "text-[#755f56]"}`}>{message.reference}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
