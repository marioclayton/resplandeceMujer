"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@relume_io/relume-ui";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { format, isValid, parseISO } from "date-fns";

export function BlogPostHeader3({ post }) {
  // Add state to track navbar height
  const [topSpacing, setTopSpacing] = useState("7rem"); // Default fallback
  
  // Effect to measure navbar height on mount
  useEffect(() => {
    // Find navbar element - adjust selector to match your navbar
    const navbar = document.querySelector("header") || document.querySelector("nav");
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      setTopSpacing(`${navbarHeight + 20}px`); // Add extra 20px buffer
    }
  }, []);

  // Extract fields using correct field names from Contentful model
  const { blogTitle, blogPublishDate, blogAuthor, blogImage, blogCategories, blogExcerpt } = post.fields;

  // Format the date with improved error handling
  let formattedDate = null;
  if (blogPublishDate) {
    try {
      // First try to parse as ISO date (most reliable method)
      const date = parseISO(blogPublishDate);
      
      if (isValid(date)) {
        formattedDate = format(date, "MMMM dd, yyyy");
      } else {
        // Fallback to standard date parsing
        const fallbackDate = new Date(blogPublishDate);
        if (isValid(fallbackDate)) {
          formattedDate = format(fallbackDate, "MMMM dd, yyyy");
        } else {
          // If all parsing fails, use the raw string
          formattedDate = blogPublishDate;
        }
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      // Use the raw date as fallback if parsing fails
      formattedDate = blogPublishDate;
    }
  }

  return (
    <>
      {/* Add invisible spacer div */}
      <div className="w-full h-24 md:h-28" />
      
      {/* Blog header with inline style for precise control */}
      <div 
        className="blog-header container mx-auto px-4 py-16"
        style={{ paddingTop: topSpacing }}
      >
        {/* Breadcrumb navigation */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink aria-current="page">
                {blogTitle}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">{blogTitle}</h1>
        
        {/* Added blog excerpt below the title */}
        {blogExcerpt && (
          <p className="text-l text-gray-700 mb-6">{blogExcerpt}</p>
        )}

        {/* Categories */}
        {blogCategories && (
          <div className="mb-4">
            <span className="bg-black text-white text-sm font-medium px-3 py-1 rounded-full">
              {blogCategories}
            </span>
          </div>
        )}

        {/* Author and date info */}
        <div className="flex items-center mb-8">
          <div>
            {blogAuthor && <p className="font-medium">{blogAuthor}</p>}
            {formattedDate && <p className="text-gray-600">{formattedDate}</p>}
          </div>
        </div>

        {/* Blog Image */}
        {blogImage && (
          <div className="mb-10">
            <Image
              src={`https:${blogImage.fields.file.url}`}
              alt={blogImage.fields?.description || blogTitle}
              width={1200}
              height={600}
              className="rounded-xl w-full h-auto"
            />
          </div>
        )}
      </div>
    </>
  );
}
