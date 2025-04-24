"use client";

import { Badge, Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import Image from 'next/image';
import Link from 'next/link';

export function Blog46({ relatedPosts }) {
  // If no related posts provided, don't render the component
  if (!relatedPosts || relatedPosts.length === 0) {
    console.log("No related posts available");
    return null;
  }

  console.log("Related posts available:", relatedPosts.length);
  
  // Debug - log the first related post structure
  if (relatedPosts.length > 0) {
    console.log("First related post fields:", Object.keys(relatedPosts[0].fields));
  }

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
                {relatedPost.fields.blogImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`https:${relatedPost.fields.blogImage.fields.file.url}`}
                      alt={relatedPost.fields.blogTitle || "Blog post"}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">
                    {relatedPost.fields.blogTitle}
                  </h3>
                  
                  {relatedPost.fields.blogExcerpt && (
                    <p className="text-gray-600 line-clamp-2">
                      {relatedPost.fields.blogExcerpt}
                    </p>
                  )}
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-blue-600 font-medium">Read more</span>
                    {relatedPost.fields.blogCategories && (
                      <Badge variant="subtle" color="gray">
                        {relatedPost.fields.blogCategories}
                      </Badge>
                    )}
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
