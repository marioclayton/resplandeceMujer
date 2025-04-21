"use client";

import { Badge, Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from 'contentful';

// Initialize Contentful client for fetching related posts
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function Blog46({ post }) {
  // Get the current post's categories or tags for finding related posts
  const currentTags = post.fields.tags || [];
  const currentId = post.sys.id;
  
  // Fetch related posts
  const response = await client.getEntries({
    content_type: 'blogPost',
    limit: 3,
    'sys.id[ne]': currentId, // Exclude current post
    // You could add filter by tags here if needed
  });
  
  const relatedPosts = response.items;
  
  // If no related posts, don't render the component
  if (!relatedPosts.length) return null;

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Related Posts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((relatedPost) => (
            <Link 
              href={`/blog/${relatedPost.fields.blogSlug}`} 
              key={relatedPost.sys.id}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                {relatedPost.fields.featuredImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`https:${relatedPost.fields.featuredImage.fields.file.url}`}
                      alt={relatedPost.fields.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">
                    {relatedPost.fields.title}
                  </h3>
                  
                  {relatedPost.fields.excerpt && (
                    <p className="text-gray-600 line-clamp-2">
                      {relatedPost.fields.excerpt}
                    </p>
                  )}
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-blue-600 font-medium">Read more</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
