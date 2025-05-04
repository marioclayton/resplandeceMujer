"use client";

import { Button } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import Link from "next/link";
import { createClient } from 'contentful';
import Image from "next/image";
import { useState, useEffect } from 'react';

// Create Contentful client using public environment variables
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export function Layout369() {
  const [content, setContent] = useState({
    latestBlog: null,
    highestRatedProduct: null,
    isLoading: true
  });

  // Fetch data on component mount
  useEffect(() => {
    async function loadContent() {
      try {
        // Get latest blog post
        const blogResponse = await client.getEntries({
          content_type: 'blogPost',
          limit: 1,
          order: '-sys.createdAt'
        });
        
        console.log('Blog response:', blogResponse);
        
        const latestBlog = blogResponse.items[0] || null;
        
        // Add debug logs
        if (latestBlog) {
          console.log('Latest blog found:', latestBlog.sys.id);
          console.log('Blog fields available:', Object.keys(latestBlog.fields));
        } else {
          console.log('No blog posts found');
        }
        
        // Get all products
        const productsResponse = await client.getEntries({
          content_type: 'product',
        });

        // Get all approved reviews
        const reviewsResponse = await client.getEntries({
          content_type: 'productReview',
          'fields.isApproved': true
        });

        // Calculate average ratings for each product
        const productRatings = {};
        
        // Initialize rating tracking
        productsResponse.items.forEach(product => {
          productRatings[product.sys.id] = { 
            product, 
            totalRating: 0, 
            reviewCount: 0,
            averageRating: 0
          };
        });
        
        // Add up all ratings by product
        reviewsResponse.items.forEach(review => {
          const productId = review.fields.productId;
          if (productRatings[productId]) {
            productRatings[productId].totalRating += review.fields.rating || 0;
            productRatings[productId].reviewCount += 1;
          }
        });
        
        // Find highest rated product
        let highestRatedProduct = null;
        let highestRating = -1;
        
        Object.values(productRatings).forEach(item => {
          if (item.reviewCount > 0) {
            item.averageRating = item.totalRating / item.reviewCount;
            
            if (item.averageRating > highestRating) {
              highestRating = item.averageRating;
              highestRatedProduct = item.product;
            }
          }
        });

        // If no reviews, default to first product
        if (!highestRatedProduct && productsResponse.items.length > 0) {
          highestRatedProduct = productsResponse.items[0];
        }

        setContent({
          latestBlog,
          highestRatedProduct,
          isLoading: false
        });
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent(prev => ({...prev, isLoading: false}));
      }
    }

    loadContent();
  }, []);

  const { latestBlog, highestRatedProduct, isLoading } = content;

  useEffect(() => {
    if (latestBlog) {
      console.log('Blog fields:', latestBlog.fields);
      console.log('Potential slug fields:', {
        slug: latestBlog.fields.slug,
        urlSlug: latestBlog.fields.urlSlug,
        blogSlug: latestBlog.fields.blogSlug,
        id: latestBlog.sys.id
      });
    }
  }, [latestBlog]);
  
  if (isLoading) {
    return (
      <section className="darkBG px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container text-center">
          <p>Cargando contenido destacado...</p>
        </div>
      </section>
    );
  }
  
  return (
    <section id="relume" className="darkBG px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Inspiración</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Descubre tu propósito hoy
            </h2>
            <p className="md:text-md">
              Contenido destacado que te inspirará y guiará.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Latest Blog Post Card */}
          {latestBlog ? (
            <div className="flex flex-col h-full border border-border-primary rounded-4xl overflow-hidden">
              <div className="flex flex-1 flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-sm font-semibold">Último Artículo</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    {latestBlog.fields.blogTitle || "Artículo sin título"}
                  </h3>
                  <p className="line-clamp-3">
                    {latestBlog.fields.blogExcerpt || "Lee nuestro artículo más reciente."}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-6">
                  <Link href={
                    latestBlog.fields.slug ? `/blog/${latestBlog.fields.slug}` :
                    `/blog`  // Fallback to blog index if no slug
                  }>
                    <Button
                      title="Leer Artículo"
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                    >
                      Leer Artículo
                    </Button>
                  </Link>
                </div>
              </div>
              {latestBlog.fields.blogImage ? (
                <div className="h-56 md:h-64">
                  <img
                    src={latestBlog.fields.blogImage.fields.file.url}
                    alt={latestBlog.fields.blogTitle || "Blog image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-56 md:h-64 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col h-full border border-border-primary rounded-4xl overflow-hidden p-6">
              <p>No hay artículos disponibles</p>
            </div>
          )}
          
          {/* Highest Rated Product Card */}
          {highestRatedProduct && (
            <div className="flex flex-col h-full border border-border-primary rounded-4xl overflow-hidden">
              <div className="flex flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-sm font-semibold">Producto Destacado</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    {highestRatedProduct.fields.productName}
                  </h3>
                  <p className="line-clamp-3">
                    {highestRatedProduct.fields.shortDescription || "Nuestro producto mejor valorado."}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-4 md:mt-6">
                  <Link href={`/products/${highestRatedProduct.fields.productSlug}`}>
                    <Button
                      title="Ver Producto"
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                    >
                      Ver Producto
                    </Button>
                  </Link>
                </div>
              </div>
              {highestRatedProduct.fields.productImage && (
                <div className="h-56 md:h-64">
                  <img
                    src={highestRatedProduct.fields.productImage.fields.file.url}
                    alt={highestRatedProduct.fields.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
