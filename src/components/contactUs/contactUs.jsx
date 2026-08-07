"use client";

import Link from "next/link";
import { useState } from "react";
import { RxEnvelopeClosed, RxHeart } from "react-icons/rx";

const initialForm = { name: "", email: "", subject: "", message: "", website: "" };

export function ContactUs() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleChange = ({ target }) => setFormData((current) => ({ ...current, [target.name]: target.value }));
  async function handleSubmit(event) {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return setStatus({ submitting: false, success: false, error: "Por favor completa todos los campos requeridos." });
    setStatus({ submitting: true, success: false, error: null });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!response.ok) throw new Error();
      setFormData(initialForm);
      setStatus({ submitting: false, success: true, error: null });
    } catch {
      setStatus({ submitting: false, success: false, error: "Hubo un error al enviar el mensaje. Por favor intenta de nuevo." });
    }
  }

  const fieldClass = "mt-2 w-full rounded-2xl border border-[#d8c2b5] bg-[#fffdf8] px-4 py-3.5 text-[#2f211d] placeholder:text-[#9b8880] focus:border-[#9b5b47] focus:ring-1 focus:ring-[#9b5b47]";

  return (
    <section className="bg-[#f8f2e9] px-[5%] pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="container">
        <header className="mb-14 border-b border-[#d8c2b5] pb-14 text-center md:mb-20 md:pb-20">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-5 text-[#9b5b47]">Estamos cerca</p>
            <h1 className="text-[clamp(2.85rem,6.5vw,5.75rem)] font-normal leading-[1.02] tracking-[-.025em] text-[#2f211d]">Nos encantará leerte</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#66544d]">¿Tienes una pregunta, una historia que compartir o simplemente quieres saludar? Este espacio también se construye escuchándote.</p>
          </div>
        </header>

        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-[#e0cec2] bg-[#fffaf2] shadow-[0_18px_50px_rgba(72,44,35,.07)] lg:grid-cols-[.72fr_1.28fr]">
          <aside className="bg-[#3c211b] p-8 text-[#fff8ef] md:p-10">
            <RxEnvelopeClosed className="h-8 w-8 text-[#e2ad94]" />
            <h2 className="mt-8 text-4xl font-normal leading-tight text-[#fff8ef]">Una conversación cercana y respetuosa.</h2>
            <p className="mt-5 leading-7 text-[#ddcbc1]">Leemos cada mensaje con atención. Aunque la autora mantiene su identidad en privado, tu voz siempre es bienvenida.</p>
            <div className="mt-10 border-t border-white/15 pt-7"><p className="flex items-center gap-2 text-sm text-[#e2ad94]"><RxHeart /> Gracias por ser parte de esta comunidad.</p></div>
          </aside>

          <div className="p-7 md:p-10 lg:p-12">
            {status.success && <div className="mb-7 rounded-2xl border border-[#a9bca3] bg-[#eef4ea] p-4 text-[#496143]" role="status"><strong>¡Mensaje enviado!</strong><p className="mt-1 text-sm">Gracias por escribirnos. Te responderemos lo antes posible.</p></div>}
            {status.error && <div className="mb-7 rounded-2xl border border-[#d7a898] bg-[#fff0ea] p-4 text-[#7d4032]" role="alert">{status.error}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="absolute -left-[9999px]" aria-hidden="true">Sitio web<input type="text" name="website" tabIndex="-1" autoComplete="off" value={formData.website} onChange={handleChange} /></label>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="text-sm font-semibold text-[#4f3b34]">Nombre <span className="text-[#9b5b47]">*</span><input className={fieldClass} type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required /></label>
                <label className="text-sm font-semibold text-[#4f3b34]">Correo electrónico <span className="text-[#9b5b47]">*</span><input className={fieldClass} type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required /></label>
              </div>
              <label className="block text-sm font-semibold text-[#4f3b34]">Asunto<input className={fieldClass} type="text" name="subject" value={formData.subject} onChange={handleChange} /></label>
              <label className="block text-sm font-semibold text-[#4f3b34]">Mensaje <span className="text-[#9b5b47]">*</span><textarea className={fieldClass} name="message" rows={6} value={formData.message} onChange={handleChange} required /></label>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-5 text-[#8a746b]">Al enviar aceptas nuestra <Link href="/privacidad" className="underline hover:text-[#7d4032]">política de privacidad</Link>.</p>
                <button className="button button-clay min-w-40" type="submit" disabled={status.submitting}>{status.submitting ? "Enviando…" : "Enviar mensaje"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
