import React from "react";
import { ContactUs } from "../../components/contactUs/contactUs";

export const metadata = { title: "Contacto", description: "Escribe a Resplandece Mujer para compartir una pregunta, historia o comentario.", alternates: { canonical: "/contacto" } };

export default function Page() {
  return (
    <div>
      
      <ContactUs />
    </div>
  );
}
