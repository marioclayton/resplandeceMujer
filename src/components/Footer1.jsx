"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React, { useState } from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoYoutube,
} from "react-icons/bi";

const useForm = () => {
  const [email, setEmail] = useState("");
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email });
  };
  return {
    email,
    handleSetEmail,
    handleSubmit,
  };
};

export function Footer1() {
  const formState = useForm();
  return (
    <footer id="relume" className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-[8vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[0.75fr_1fr] lg:gap-y-4 lg:pb-20">
          <div className="flex flex-col">
            <a href="#" className="mb-5 md:mb-6">
              <img
                src="/assets/logo.png" // Updated to use logo.png from the assets folder
                alt="Logo image"
                className="inline-block w-24 md:w-32" // Adjusted size for smaller logo
              />
            </a>
            <p className="mb-5 md:mb-6">
              Únete a nuestro boletín para recibir actualizaciones sobre
              características y lanzamientos.
            </p>
            <div className="w-full max-w-md">
              <form
                className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] md:gap-y-4"
                onSubmit={formState.handleSubmit}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Introduce tu correo"
                  value={formState.email}
                  onChange={formState.handleSetEmail}
                />
                <Button title="Suscribirse" variant="secondary" size="sm">
                  Suscribirse
                </Button>
              </form>
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
                  <a href="#" className="flex items-center gap-3">
                    <span>Privacidad</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-start">
              <h4 className="mb-3 font-semibold md:mb-4">Síguenos</h4>
              <ul className="flex flex-col items-start">
                <li className="py-2 text-sm">
                  <a href="https://www.facebook.com/profile.php?id=61565177074140" className="flex items-center gap-3">
                    <BiLogoFacebookCircle className="size-6" />
                    <span>Facebook</span>
                  </a>
                </li>
                <li className="py-2 text-sm">
                  <a href="https://www.instagram.com/resp.landecemujer/" className="flex items-center gap-3">
                    <BiLogoInstagram className="size-6" />
                    <span>Instagram</span>
                  </a>
                </li>
                <li className="py-2 text-sm">
                  <a href="https://www.youtube.com/@ResplandeceMujer-m1o" className="flex items-center gap-3">
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
          <p className="mt-6 md:mt-0">© 2024 Relume. All rights reserved.</p>
          <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li className="underline">
              <a href="#">Política de Privacidad</a>
            </li>
            <li className="underline">
              <a href="#">Términos de Servicio</a>
            </li>
            <li className="underline">
              <a href="#">Configuración de Cookies</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
