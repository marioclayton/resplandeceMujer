"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React, { useState, useEffect } from "react";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import { useAverageRating } from "./ProductReviews";

const Star = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const isFullStar = i < fullStars;
        const isHalfStar = hasHalfStar && i === fullStars;

        return (
          <div key={i}>
            {isFullStar ? (
              <BiSolidStar />
            ) : isHalfStar ? (
              <BiSolidStarHalf />
            ) : (
              <BiStar />
            )}
          </div>
        );
      })}
    </div>
  );
};

export function ProductHeader1({ product }) {
  if (!product) return null;

  const {
    productName,
    productImage,
    productDescription,
    price,
    productCategory,
    externalUrl,
    isFreePdf,
    pdfFile,
  } = product.fields;
  
  // Get system ID for the product
  const productId = product.sys?.id;
  
  // Get the average rating using our custom hook
  const { averageRating, reviewCount } = useAverageRating(productId);

  return (
    <header id="relume" className="darkBG px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-8 md:gap-y-10 lg:grid-cols-[1fr_1.5fr] lg:gap-x-20">
          {/* Product image container with top alignment */}
          <div className="flex justify-center items-start overflow-hidden pt-1">
            {productImage?.fields?.file?.url ? (
              <img
                src={productImage.fields.file.url}
                alt={productName || "Product image"}
                className="aspect-[5/6] max-w-full max-h-[500px] object-contain rounded-lg"
              />
            ) : (
              <div className="aspect-[5/6] max-w-full max-h-[500px] bg-gray-200 flex items-center justify-center rounded-lg">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>
          <div>
            <h1 className="mb-2 text-4xl leading-[1.2] font-bold md:text-5xl lg:text-6xl">
              {productName || "Untitled Product"}
            </h1>
            <p className="mb-5 text-xl font-bold md:mb-6 md:text-2xl">
              {isFreePdf ? 'Gratis' : `$${price || "0"}`}
            </p>
            <div className="mb-5 flex flex-wrap items-center gap-3 md:mb-6">
              <Star rating={parseFloat(averageRating) || 0} />
              <p className="text-sm">
                ({averageRating} estrellas) • {reviewCount} {reviewCount === 1 ? 'opinión' : 'opiniones'}
              </p>
            </div>
            <div className="mb-5 md:mb-6">
              {productDescription ? documentToReactComponents(productDescription) : (
                <p className="text-gray-500">No description available</p>
              )}
            </div>
            <form className="mb-8">
              <div className="mt-8 mb-4 flex flex-col gap-y-4">
                {/* Conditional rendering based on product type */}
                {isFreePdf ? (
                  // Free PDF Download Button
                  pdfFile && (
                    <Button 
                      title="Descargar PDF Gratis" 
                      className="w-full"
                      onClick={async (e) => {
                        try {
                          e.preventDefault();
                          
                          // Detect if we're on iOS/macOS Safari for special handling
                          const isIOSorSafari = /iPad|iPhone|iPod|Safari/.test(navigator.userAgent) && 
                                               !/Chrome|CriOS|FxiOS/.test(navigator.userAgent);
                          
                          if (isIOSorSafari) {
                            // For iOS/Safari: Use API route with blob approach for better compatibility
                            const response = await fetch(`/api/download?productId=${productId}`);
                            
                            if (response.ok) {
                              const blob = await response.blob();
                              const url = window.URL.createObjectURL(blob);
                              const fileName = pdfFile.fields.file.fileName || `${productName || 'product'}.pdf`;
                              
                              // Create a visible anchor for iOS compatibility
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = fileName;
                              link.style.display = 'none';
                              
                              document.body.appendChild(link);
                              
                              // Use a timeout to ensure the link is properly attached
                              setTimeout(() => {
                                link.click();
                                
                                // Clean up after a short delay
                                setTimeout(() => {
                                  document.body.removeChild(link);
                                  window.URL.revokeObjectURL(url);
                                }, 100);
                              }, 0);
                              
                            } else {
                              console.error('Download failed:', response.statusText);
                              // Fallback to direct link for iOS if API fails
                              window.open(`https:${pdfFile.fields.file.url}`, '_blank');
                            }
                          } else {
                            // For other browsers: Direct download works fine
                            const link = document.createElement('a');
                            link.href = `https:${pdfFile.fields.file.url}`;
                            link.download = pdfFile.fields.file.fileName || `${productName || 'product'}.pdf`;
                            link.target = '_blank';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }
                          
                        } catch (error) {
                          console.error('Download error:', error);
                          // Final fallback: open in new tab
                          window.open(`https:${pdfFile.fields.file.url}`, '_blank');
                        }
                      }}
                    >
                      Descargar PDF Gratis
                    </Button>
                  )
                ) : (
                  // Paid Product Buttons (existing functionality)
                  <>
                    {externalUrl && (
                      <Button 
                        title="Comprar en Hotmart" 
                        className="w-full"
                        onClick={() => window.open(externalUrl, '_blank', 'noopener,noreferrer')}
                      >
                        Comprar en Hotmart
                      </Button>
                    )}
                    
                    {product.fields.amazonUrl && (
                      <Button
                        title="Comprar en Amazon"
                        variant="secondary"
                        className="w-full"
                        onClick={() => window.open(product.fields.amazonUrl, '_blank', 'noopener,noreferrer')}
                      >
                        Comprar en Amazon
                      </Button>
                    )}
                  </>
                )}
              </div>
            </form>
            <Accordion type="multiple">
              <AccordionItem value="item-0">
                <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                  Detalles
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Si no estás completamente satisfecha con tu compra, puedes
                  devolver el producto en un plazo de 30 días. Asegúrate de que
                  esté en su estado original. Consulta nuestra política de
                  devoluciones para más detalles.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                  Envío
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Si no estás completamente satisfecha con tu compra, puedes
                  devolver el producto en un plazo de 30 días. Asegúrate de que
                  esté en su estado original. Consulta nuestra política de
                  devoluciones para más detalles.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="py-4 font-semibold md:text-md [&_svg]:size-6">
                  Devoluciones
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  Si no estás completamente satisfecha con tu compra, puedes
                  devolver el producto en un plazo de 30 días. Asegúrate de que
                  esté en su estado original. Consulta nuestra política de
                  devoluciones para más detalles.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </header>
  );
}
