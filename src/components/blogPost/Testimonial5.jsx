"use client";

import React, { useState, useEffect } from "react";
import { BiSolidStar } from "react-icons/bi";
import { createClient as createDeliveryClient } from 'contentful';

// Define Contentful credentials with NEXT_PUBLIC_ environment variables
const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export function Testimonial5({ postSlug }) {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0); // Add this for manual refresh
  
  // Form state
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch existing testimonials from Contentful
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Try Contentful if credentials are available
        if (CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN) {
          console.log('Fetching testimonials for:', postSlug);
          
          const deliveryClient = createDeliveryClient({
            space: CONTENTFUL_SPACE_ID,
            accessToken: CONTENTFUL_ACCESS_TOKEN,
          });
          
          const entries = await deliveryClient.getEntries({
            content_type: 'comment',
            'fields.postSlug': postSlug,
            'fields.isApproved': true,
            order: '-fields.date'
          });
          
          console.log('Retrieved entries:', entries);
          
          if (entries && entries.items && entries.items.length > 0) {
            const contentfulComments = entries.items.map(item => {
              if (!item.fields) {
                console.warn('Missing fields in item:', item);
                return null;
              }
              
              return {
                id: item.sys?.id,
                name: item.fields.name,
                comment: item.fields.comment,
                rating: item.fields.rating || 5,
                date: item.fields.date,
                avatar: item.fields.avatar?.fields?.file?.url || null,
                reply: item.fields.reply || null
              };
            }).filter(Boolean); // Remove any null entries
            
            console.log('Processed comments:', contentfulComments);
            setTestimonials(contentfulComments);
          } else {
            console.log('No comments found or entries structure incorrect');
            setTestimonials([]);
          }
        } else {
          console.warn('Contentful credentials missing');
          setTestimonials([]);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('No se pudieron cargar los comentarios desde Contentful.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchTestimonials();
  }, [postSlug, refreshFlag]); // Add refreshFlag to dependencies

  // Function to manually refresh comments
  const refreshComments = () => {
    setRefreshFlag(prev => prev + 1);
  };

  // Handle form submission - sending only to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !comment === undefined) {
      setError("Por favor completa tu nombre y comentario");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Send to server API
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          comment,
          rating,
          postSlug
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit comment');
      }
      
      // Reset form
      setName('');
      setComment('');
      setRating(5);
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting comment:', err);
      setError('No se pudo enviar tu comentario. Por favor intenta más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="darkBG px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        {/* Title section */}
        <div className="mb-12 w-full md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-3xl font-bold md:mb-6 md:text-4xl">
            Testimonios de lectoras
          </h2>
          <div className="flex justify-between items-center">
            <p className="md:text-md">
              Comparte tu experiencia sobre este artículo
            </p>
            {/* Add refresh button */}
            <button 
              onClick={refreshComments}
              className="text-sm text-[#501E16] hover:underline"
              aria-label="Refrescar comentarios"
            >
              Refrescar comentarios
            </button>
          </div>
        </div>
        
        {/* Comment form */}
        <div className="mb-16 p-6 border border-border-primary rounded-4xl">
          <h3 className="text-2xl font-bold mb-4">Deja tu comentario</h3>
          
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              ¡Gracias por tu comentario! Se ha enviado correctamente y está pendiente de aprobación.
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#501E16]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Calificación
              </label>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="mr-1 focus:outline-none"
                  >
                    <BiSolidStar 
                      className={`size-6 ${
                        star <= rating ? "text-yellow-500" : "text-gray-300"
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="comment" className="block mb-2 font-medium">
                Comentario <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comment"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#501E16]"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#501E16] text-white rounded hover:bg-[#401810] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Enviar comentario"}
            </button>
          </form>
        </div>
        
        {/* Display testimonials */}
        {isLoading ? (
          <div className="flex justify-center">
            <p>Cargando comentarios...</p>
          </div>
        ) : error ? (
          <div className="text-center p-8 border border-dashed border-red-300 rounded-4xl">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={refreshComments}
              className="mt-4 text-sm text-[#501E16] hover:underline"
            >
              Intentar nuevamente
            </button>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-16">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id || index} className="flex h-full max-w-lg flex-col items-start justify-start text-left border border-border-primary rounded-4xl p-6">
                <div className="mb-6 flex md:mb-8">
                  {[...Array(5)].map((_, i) => (
                    <BiSolidStar 
                      key={i}
                      className={`size-6 ${
                        i < testimonial.rating ? "text-yellow-500" : "text-gray-300"
                      }`} 
                    />
                  ))}
                </div>
                <blockquote className="text-md leading-[1.4] font-bold md:text-xl mb-4">
                  "{testimonial.comment}"
                </blockquote>
                
                {/* Display reply if it exists */}
                {testimonial.reply && (
                  <div className="mt-4 mb-4 p-4 bg-[#f8f4f1] border-l-4 border-[#501E16] rounded-r-lg">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-semibold text-[#501E16]">Respuesta del autor:</span>
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "{testimonial.reply}"
                    </p>
                  </div>
                )}
                
                <div className="mt-auto flex w-full flex-row items-center gap-3">
                  <div>
                    <img
                      src={testimonial.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(testimonial.name)}
                      alt={`Foto de ${testimonial.name}`}
                      className="size-14 min-h-14 min-w-14 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-white">
                      {new Date(testimonial.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed border-gray-300 rounded-4xl">
            <p>No hay comentarios todavía. ¡Sé el primero en comentar!</p>
          </div>
        )}
      </div>
    </section>
  );
}
