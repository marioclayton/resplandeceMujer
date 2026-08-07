"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "resplandece-cookie-consent";

export function CookieConsent() {
  const [choice, setChoice] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChoice(window.localStorage.getItem(CONSENT_KEY));
    setReady(true);
  }, []);

  function saveChoice(value) {
    window.localStorage.setItem(CONSENT_KEY, value);
    setChoice(value);
  }

  return <>
    {choice === "accepted" && <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-YDE8BBVCB3" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-YDE8BBVCB3',{anonymize_ip:true});`}</Script>
    </>}
    {ready && !choice && <aside className="fixed bottom-4 left-4 right-4 z-[1000] mx-auto max-w-3xl rounded-[1.5rem] border border-[#d8c2b5] bg-[#fffaf2] p-5 text-[#2f211d] shadow-[0_20px_70px_rgba(45,27,23,.22)] md:flex md:items-center md:gap-6 md:p-6" aria-label="Preferencias de cookies">
      <div className="flex-1"><p className="font-semibold">Tu privacidad importa</p><p className="mt-1 text-sm leading-6 text-[#66544d]">Usamos cookies opcionales de Google Analytics para entender qué contenido resulta útil. Puedes aceptar o rechazar; el sitio funciona en ambos casos. <Link href="/privacidad#cookies" className="font-semibold text-[#7d4032] underline underline-offset-2">Cómo usamos las cookies</Link>.</p></div>
      <div className="mt-4 flex gap-2 md:mt-0"><button type="button" onClick={() => saveChoice("rejected")} className="rounded-full border border-[#c9afa1] px-4 py-2 text-sm font-semibold text-[#66544d] hover:bg-[#efe1d4]">Rechazar</button><button type="button" onClick={() => saveChoice("accepted")} className="rounded-full bg-[#7d4032] px-4 py-2 text-sm font-semibold text-white hover:bg-[#633126]">Aceptar</button></div>
    </aside>}
  </>;
}
