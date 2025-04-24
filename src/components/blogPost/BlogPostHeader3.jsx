"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@relume_io/relume-ui";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";

export function BlogPostHeader3({ post }) {
  // Extract fields using correct field names from Contentful model
  const { blogTitle, blogPublishDate, blogAuthor, blogImage, blogCategories } = post.fields;

  // Format the date if it exists and is parseable
  let formattedDate = null;
  try {
    if (blogPublishDate) {
      formattedDate = format(new Date(blogPublishDate), "MMMM dd, yyyy");
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    // Use the raw date as fallback
    formattedDate = blogPublishDate;
  }

  return (
    <div className="blog-header container mx-auto px-4 py-16">
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
            {/* Remove isCurrentPage prop and use aria-current instead */}
            <BreadcrumbLink aria-current="page">
              {blogTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">{blogTitle}</h1>

      {/* Categories */}
      {blogCategories && (
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
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
  );
}
