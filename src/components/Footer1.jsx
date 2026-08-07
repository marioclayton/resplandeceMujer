"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoYoutube } from "react-icons/bi";

export function Footer1() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function subscribe(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("EMAIL", email);
    try {
      await fetch("https://us18.list-manage.com/subscribe/post?u=cec1ba5ac5f327afc8a747fcd&id=3b5df28383", { method: "POST", mode: "no-cors", body: data });
      setMessage("¡Gracias! Pronto recibirás inspiración en tu correo.");
      setEmail("");
    } catch {
      setMessage("No pudimos completar la suscripción. Inténtalo nuevamente.");
    }
  }

  return (
    <footer className="bg-[#271713] px-[5%] py-16 text-[#f8eee5]">
      <div className="container">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.2fr_.8fr]">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <Image src="/assets/logo.png" alt="Resplandece Mujer" width={56} height={56} />
              <span className="font-[var(--font-cuprum)] text-2xl">Resplandece Mujer</span>
            </div>
            <h2 className="mt-8 text-4xl leading-tight text-[#fff8ef] md:text-5xl">Un momento de quietud, directo a tu bandeja.</h2>
            <p className="mt-4 leading-7 text-[#d9c8be]">Recibe nuevas reflexiones, recursos y palabras de ánimo para tu caminar.</p>
            <form onSubmit={subscribe} className="mt-7 flex max-w-lg flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="footer-email">Correo electrónico</label>
              <input id="footer-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" className="min-h-13 flex-1 rounded-full border border-white/25 bg-white/8 px-5 text-white placeholder:text-white/45" />
              <button className="button button-light" type="submit">Suscribirme</button>
            </form>
            {message && <p className="mt-3 text-sm text-[#e9bca6]" aria-live="polite">{message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div><p className="eyebrow text-[#dba991]">Explora</p><div className="mt-4 flex flex-col gap-3 text-sm text-[#e7d8d0]"><Link href="/blog">Blog</Link><Link href="/productos">Recursos</Link><Link href="/acerca">Acerca</Link><Link href="/contacto">Contacto</Link></div></div>
            <div><p className="eyebrow text-[#dba991]">Legal</p><div className="mt-4 flex flex-col gap-3 text-sm text-[#e7d8d0]"><Link href="/privacidad">Privacidad y cookies</Link><Link href="/terminos">Términos de uso</Link><Link href="/aviso-legal">Aviso legal</Link></div></div>
            <div><p className="eyebrow text-[#dba991]">Síguenos</p><div className="mt-4 flex gap-3 text-2xl"><a aria-label="Facebook" href="https://www.facebook.com/profile.php?id=61565177074140" target="_blank" rel="noreferrer"><BiLogoFacebookCircle /></a><a aria-label="Instagram" href="https://www.instagram.com/resp.landecemujer/" target="_blank" rel="noreferrer"><BiLogoInstagram /></a><a aria-label="YouTube" href="https://www.youtube.com/@ResplandeceMujer-m1o" target="_blank" rel="noreferrer"><BiLogoYoutube /></a></div></div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-7 text-xs text-[#a9958a] sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Resplandece Mujer.</p><p>Fe para lo cotidiano.</p></div>
      </div>
    </footer>
  );
}
