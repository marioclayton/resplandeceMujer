"use client";

import React, { useState, useEffect } from "react";
import { BiSolidStar } from "react-icons/bi";
import { createClient as createDeliveryClient } from 'contentful';

// Define Contentful credentials with NEXT_PUBLIC_ environment variables
const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0);
  
  // Form state
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch existing reviews from Contentful
  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
        
        if (CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN) {
          const deliveryClient = createDeliveryClient({
            space: CONTENTFUL_SPACE_ID,
            accessToken: CONTENTFUL_ACCESS_TOKEN,
          });
          
          const entries = await deliveryClient.getEntries({
            content_type: 'productReview',
            'fields.productId': productId,
            'fields.isApproved': true,
            order: '-fields.date'
          });
          
          if (entries && entries.items && entries.items.length > 0) {
            const contentfulReviews = entries.items
              .filter(item => item.fields)
              .map(item => ({
                id: item.sys.id,
                name: item.fields.name,
                review: item.fields.review,
                rating: item.fields.rating || 5,
                date: item.fields.date,
                avatar: item.fields.avatar?.fields?.file?.url || null
              }));
            
            setReviews(contentfulReviews);
          } else {
            setReviews([]);
          }
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('No se pudieron cargar las reseñas.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchReviews();
  }, [productId, refreshFlag]);

  // Calculate average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };
  
  // Function to manually refresh reviews
  const refreshReviews = () => {
    setRefreshFlag(prev => prev + 1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !review) {
      setError("Por favor completa tu nombre y reseña");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Send to server API
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          review,
          rating,
          productId
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }
      
      // Reset form
      setName('');
      setReview('');
      setRating(5);
      setSubmitSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('No se pudo enviar tu reseña. Por favor intenta más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="darkBG px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        {/* Title section */}
        <div className="mb-12 w-full md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-3xl font-bold md:mb-6 md:text-4xl">
            Reseñas del producto
          </h2>
          <div className="flex justify-between items-center">
            <p className="md:text-md">
              Comparte tu experiencia con este producto
            </p>
            <button 
              onClick={refreshReviews}
              className="text-sm text-[#501E16] hover:underline"
              aria-label="Refrescar reseñas"
            >
              Refrescar reseñas
            </button>
          </div>
        </div>
        
        {/* Review form */}
        <div className="mb-16 p-6 border border-border-primary rounded-4xl">
          <h3 className="text-2xl font-bold mb-4">Deja tu reseña</h3>
          
          {submitSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              ¡Gracias por tu reseña! Se ha enviado correctamente y está pendiente de aprobación.
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
              <label htmlFor="review" className="block mb-2 font-medium">
                Reseña <span className="text-red-500">*</span>
              </label>
              <textarea
                id="review"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#501E16]"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#501E16] text-white rounded hover:bg-[#401810] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Enviar reseña"}
            </button>
          </form>
        </div>
        
        {/* Display reviews */}
        {isLoading ? (
          <div className="flex justify-center">
            <p>Cargando reseñas...</p>
          </div>
        ) : error ? (
          <div className="text-center p-8 border border-dashed border-red-300 rounded-4xl">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={refreshReviews}
              className="mt-4 text-sm text-[#501E16] hover:underline"
            >
              Intentar nuevamente
            </button>
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:gap-16">
            {reviews.map((review, index) => (
              <div key={review.id || index} className="flex h-full max-w-lg flex-col items-start justify-start text-left border border-border-primary rounded-4xl p-6">
                <div className="mb-6 flex md:mb-8">
                  {[...Array(5)].map((_, i) => (
                    <BiSolidStar 
                      key={i}
                      className={`size-6 ${
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }`} 
                    />
                  ))}
                </div>
                <blockquote className="text-md leading-[1.4] font-bold md:text-xl mb-4">
                  "{review.review}"
                </blockquote>
                <div className="mt-auto flex w-full flex-row items-center gap-3">
                  <div>
                    <img
                      src={review.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(review.name)}
                      alt={`Foto de ${review.name}`}
                      className="size-14 min-h-14 min-w-14 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-white">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed border-gray-300 rounded-4xl">
            <p>No hay reseñas todavía. ¡Sé el primero en opinar!</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Export this function to use in ProductHeader1
export function useAverageRating(productId) {
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  
  useEffect(() => {
    async function fetchReviews() {
      if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) return;
      
      try {
        const deliveryClient = createDeliveryClient({
          space: CONTENTFUL_SPACE_ID,
          accessToken: CONTENTFUL_ACCESS_TOKEN,
        });
        
        const entries = await deliveryClient.getEntries({
          content_type: 'productReview',
          'fields.productId': productId,
          'fields.isApproved': true,
        });
        
        if (entries && entries.items && entries.items.length > 0) {
          const reviews = entries.items.filter(item => item.fields);
          setReviewCount(reviews.length);
          
          const sum = reviews.reduce((total, item) => total + (item.fields.rating || 0), 0);
          setAverageRating((sum / reviews.length).toFixed(1));
        }
      } catch (err) {
        console.error('Error fetching review ratings:', err);
      }
    }
    
    fetchReviews();
  }, [productId]);
  
  return { averageRating, reviewCount };
}