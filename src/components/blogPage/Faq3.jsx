import Link from "next/link";

const questions = [
  ["¿Qué temas se abordan?", "Publicamos reflexiones sobre fe y crecimiento espiritual, identidad, desarrollo personal, matrimonio y familia, además de bienestar emocional y hábitos saludables."],
  ["¿Cómo puedo participar?", "Puedes compartir cada artículo, dejar un comentario respetuoso y conectar con la comunidad a través de nuestras redes sociales."],
  ["¿Dónde encuentro recursos?", "En Productos encontrarás devocionales y herramientas para profundizar las enseñanzas y llevarlas a tu vida cotidiana."],
  ["¿Cómo recibo nuevas publicaciones?", "Suscríbete al boletín desde el pie de página. Puedes darte de baja en cualquier momento desde el enlace incluido en cada correo."],
];

export function Faq3() {
  return <section className="bg-[#efe1d4] px-[5%] py-20 md:py-28"><div className="container grid gap-12 md:grid-cols-[.75fr_1.25fr] md:gap-16">
    <div><p className="eyebrow text-[#9b5b47]">Orientación</p><h2 className="mt-4 text-5xl font-normal md:text-6xl">Preguntas frecuentes</h2><p className="mt-5 leading-7 text-[#66544d]">Lo esencial para aprovechar el blog y participar con confianza.</p><Link href="/contacto" className="button button-clay mt-7">Contáctanos</Link></div>
    <div className="divide-y divide-[#c9afa1]">{questions.map(([question, answer]) => <details key={question} className="group py-2"><summary className="flex cursor-pointer list-none items-center justify-between py-5 text-lg font-semibold text-[#2f211d]">{question}<span className="ml-4 text-2xl font-normal text-[#9b5b47] transition group-open:rotate-45">+</span></summary><p className="pb-6 pr-8 leading-7 text-[#66544d]">{answer}</p></details>)}</div>
  </div></section>;
}
