import React from "react";

export function Privacidad() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 md:mb-16">
          <h1 className="mb-5 text-4xl font-bold md:text-5xl lg:text-6xl">
            Política de Privacidad
          </h1>
          <p className="text-md opacity-80">
            Última actualización: Mayo 2025
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              Introducción
            </h2>
            <p className="mb-4">
              En Resplandece Mujer, respetamos tu privacidad y estamos comprometidos con proteger tus datos personales. Esta política de privacidad te informará sobre cómo cuidamos tus datos cuando visitas nuestro sitio web y te informará sobre tus derechos de privacidad.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              Información que Recopilamos
            </h2>
            <p className="mb-4">
              Podemos recopilar, usar y almacenar diferentes tipos de información personal sobre ti, que incluyen:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Información de identificación (nombre, dirección de correo electrónico)</li>
              <li>Información técnica (dirección IP, tipo de navegador)</li>
              <li>Información de uso (cómo utilizas nuestro sitio)</li>
              <li>Información de comunicaciones (tus preferencias para recibir comunicaciones)</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              Cómo Usamos tu Información
            </h2>
            <p className="mb-4">
              Utilizamos tu información personal para los siguientes propósitos:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Para procesar y responder a tus consultas o solicitudes</li>
              <li>Para proporcionarte el contenido y los servicios que solicitas</li>
              <li>Para mejorar nuestro sitio web y servicios</li>
              <li>Para enviarte comunicaciones con tu consentimiento</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              Cookies y Tecnologías Similares
            </h2>
            <p className="mb-4">
              Usamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web, comprender cómo lo utilizas y ofrecerte contenido personalizado. Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se envía una cookie.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              Tus Derechos
            </h2>
            <p className="mb-4">
              De acuerdo con las leyes de protección de datos, tienes varios derechos en relación con tus datos personales, incluyendo:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>El derecho a acceder a tus datos personales</li>
              <li>El derecho a solicitar la corrección de datos inexactos</li>
              <li>El derecho a solicitar que borremos tus datos</li>
              <li>El derecho a retirar tu consentimiento</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              Seguridad de Datos
            </h2>
            <p className="mb-4">
              Hemos implementado medidas de seguridad apropiadas para prevenir que tus datos personales se pierdan, utilicen o accedan de manera no autorizada. También limitamos el acceso a tus datos personales a aquellos empleados, agentes, contratistas y terceros que tienen una necesidad comercial de conocerlos.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              Cambios a Esta Política
            </h2>
            <p className="mb-4">
              Podemos actualizar esta política de privacidad de vez en cuando. Te notificaremos cualquier cambio significativo publicando la nueva política de privacidad en esta página.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
              Contacto
            </h2>
            <p className="mb-4">
              Si tienes alguna pregunta sobre esta política de privacidad o sobre cómo manejamos tus datos personales, por favor contáctanos a través de:
            </p>
            <p className="font-medium">
              Email: <a href="mailto:resplandecemujer4@gmail.com" className="underline hover:text-[#501E16]">resplandecemujer4@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}