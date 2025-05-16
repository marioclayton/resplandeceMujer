"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React, { useState } from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoYoutube,
} from "react-icons/bi";

export function Footer1() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    // Mailchimp POST URL
    const url =
      "https://us18.list-manage.com/subscribe/post?u=cec1ba5ac5f327afc8a747fcd&id=3b5df28383";
    // Mailchimp expects form data, not JSON
    const formData = new FormData();
    formData.append("EMAIL", email);

    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "no-cors", // Mailchimp doesn't send CORS headers
        body: formData,
      });
      setShowPopup(true);
      setEmail("");
      setTimeout(() => setShowPopup(false), 4000);
    } catch (err) {
      setError("Hubo un error. Intenta de nuevo.");
    }
  };

  return (
    <footer id="footer" className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-[8vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[0.75fr_1fr] lg:gap-y-4 lg:pb-20">
          <div className="flex flex-col">
            <a href="#" className="mb-5 md:mb-6">
              <img
                src="/assets/logo.png"
                alt="Logo image"
                className="inline-block w-24 md:w-32"
              />
            </a>
            <p className="mb-5 md:mb-6">
              Únete a nuestro boletín para recibir actualizaciones sobre
              características y lanzamientos.
            </p>
            <div className="w-full max-w-md">
              <form
                onSubmit={handleSubmit}
                className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] md:gap-y-4"
              >
                <Input
                  id="email"
                  type="email"
                  name="EMAIL"
                  placeholder="Introduce tu correo"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button title="Suscribirse" variant="secondary" size="sm">
                  Suscribirse
                </Button>
              </form>
              {showPopup && (
                <div className="mb-3 flex items-center justify-center rounded-lg border border-white bg-black px-4 py-3 text-white shadow-md">
                  <span className="font-medium">¡Gracias por suscribirte!</span>
                </div>
              )}
              {error && (
                <div className="mb-3 flex items-center justify-center rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 shadow-md">
                  {error}
                </div>
              )}
              <p className="text-xs">
                Al suscribirte, aceptas nuestra Política de Privacidad y
                consientes recibir actualizaciones.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-y-10 sm:grid-cols-3 sm:gap-x-6 md:gap-x-8 md:gap-y-4">
            <div className="flex flex-col items-start justify-start">
              <h4 className="mb-3 font-semibold md:mb-4">Links</h4>
              <ul>
                <li className="py-2 text-sm">
                  <a href="/blog" className="flex items-center gap-3">
                    <span>Blog</span>
                  </a>
                </li>
                <li className="py-2 text-sm">
                  <a href="/productos" className="flex items-center gap-3">
                    <span>Productos</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-start">
              <h4 className="mb-3 font-semibold md:mb-4">Legal</h4>
              <ul>
                <li className="py-2 text-sm">
                  <a href="/privacidad" className="flex items-center gap-3">
                    <span>Privacidad</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-start">
              <h4 className="mb-3 font-semibold md:mb-4">Síguenos</h4>
              <ul className="flex flex-col items-start">
                <li className="py-2 text-sm">
                  <a
                    href="https://www.facebook.com/profile.php?id=61565177074140"
                    className="flex items-center gap-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BiLogoFacebookCircle className="size-6" />
                    <span>Facebook</span>
                  </a>
                </li>
                <li className="py-2 text-sm">
                  <a
                    href="https://www.instagram.com/resp.landecemujer/"
                    className="flex items-center gap-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BiLogoInstagram className="size-6" />
                    <span>Instagram</span>
                  </a>
                </li>
                <li className="py-2 text-sm">
                  <a
                    href="https://www.youtube.com/@ResplandeceMujer-m1o"
                    className="flex items-center gap-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BiLogoYoutube className="size-6" />
                    <span>YouTube</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex flex-col-reverse items-start justify-between pb-4 pt-6 text-sm md:flex-row md:items-center md:pb-0 md:pt-8">
          <p className="mt-6 md:mt-0">
            © 2024 Resplandece Mujer. All rights reserved.
          </p>
          <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li className="underline">
              <a href="/privacidad">Política de Privacidad</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
