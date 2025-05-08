"use client";

import React, { useState } from "react";
import { Button } from "@relume_io/relume-ui";

export function ContactUs() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Form status
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        submitting: false,
        success: false,
        error: "Por favor completa todos los campos requeridos."
      });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      // Create FormData object
      const formElement = e.target;
      const formSubmitData = new FormData(formElement);
      
      // Submit the form using fetch
      const response = await fetch(formElement.action, {
        method: 'POST',
        body: formSubmitData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }
      
      // Clear form on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setStatus({
        submitting: false,
        success: true,
        error: null
      });
    } catch (error) {
      setStatus({
        submitting: false,
        success: false,
        error: "Hubo un error al enviar el mensaje. Por favor intenta de nuevo."
      });
    }
  };

  return (
    <section id="contact" className="darkBG px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-16 lg:mb-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 font-semibold md:mb-4">Contáctanos</p>
            <h2 className="mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
              Estamos aquí para ti
            </h2>
            <p className="md:text-lg">
              Tienes preguntas, inquietudes o simplemente quieres saludar? Estamos aquí para escucharte.
            </p>
          </div>
        </div>
        
        <div className="mx-auto max-w-3xl">
          {status.success && (
            <div className="mb-8 rounded-lg border border-white p-4">
              <p className="font-medium">¡Mensaje enviado con éxito!</p>
              <p>Gracias por contactarnos. Te responderemos lo más pronto posible.</p>
            </div>
          )}
          
          {status.error && (
            <div className="mb-8 rounded-lg bg-red-100 p-4 text-red-800">
              <p className="font-medium">Error:</p>
              <p>{status.error}</p>
            </div>
          )}
          
          {/* Update form to use FormSubmit */}
          <form 
            onSubmit={handleSubmit} 
            action="https://formsubmit.co/resplandecemujer4@gmail.com" 
            method="POST"
            className="space-y-6"
          >
            {/* FormSubmit configuration */}
            <input type="hidden" name="_subject" value="Nuevo mensaje desde Resplandece Mujer" />
            <input type="hidden" name="_next" value="https://resplandece-mujer.vercel.app/thanks" />
            <input type="text" name="_honey" style={{ display: 'none' }} /> {/* Honeypot for spam */}
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block font-medium">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border-primary bg-transparent px-4 py-3 focus:border-[#501E16]  focus:ring-1 focus:ring-[#501E16]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="mb-2 block font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border-primary bg-transparent px-4 py-3 focus:border-[#501E16]  focus:ring-1 focus:ring-[#501E16]"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="mb-2 block font-medium">
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-border-primary bg-transparent px-4 py-3 focus:border-[#501E16]  focus:ring-1 focus:ring-[#501E16]"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="mb-2 block font-medium">
                Mensaje <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-lg border border-border-primary bg-transparent px-4 py-3 focus:border-[#501E16]  focus:ring-1 focus:ring-[#501E16]"
                required
              />
            </div>
            
            <div className="flex justify-center">
              <Button 
                type="submit"
                disabled={status.submitting}
                className="min-w-[200px]"
              >
                {status.submitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </div>
            
            <p className="mt-4 text-center text-sm">
              Al enviar este formulario, aceptas nuestra{" "}
              <a href="/privacy-policy" className="underline">
                política de privacidad
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}