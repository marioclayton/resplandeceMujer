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
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { format } from "date-fns";

export function BlogPostHeader3({ post }) {
  const { title, publishDate, author, featuredImage } = post.fields;

  // Format the date if it exists
  const formattedDate = publishDate ? format(new Date(publishDate), "MMMM dd, yyyy") : null;

  return (
    <div className="blog-header container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>

      {/* Author and date info */}
      <div className="flex items-center mb-8">
        {author && author.fields && author.fields.image && (
          <div className="mr-4">
            <Image
              src={`https:${author.fields.image.fields.file.url}`}
              alt={author.fields.name || "Author"}
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
        )}
        <div>
          {author && <p className="font-medium">{author.fields?.name}</p>}
          {formattedDate && <p className="text-gray-600">{formattedDate}</p>}
        </div>
      </div>

      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-10">
          <Image
            src={`https:${featuredImage.fields.file.url}`}
            alt={featuredImage.fields.title || title}
            width={1200}
            height={600}
            className="rounded-xl w-full h-auto"
          />
        </div>
      )}
    </div>
  );
}
