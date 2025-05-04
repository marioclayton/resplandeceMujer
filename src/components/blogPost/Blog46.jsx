"use client";

import React from "react";
import Image from 'next/image';
import Link from 'next/link';

export function Blog46({ relatedPosts }) {
  // If no related posts provided, don't render the component
  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="darkBG py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Artículos Relacionados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {relatedPosts.map((relatedPost) => (
            <div className="border border-border-primary rounded-4xl" key={relatedPost.sys.id}>
              <Link 
                href={`/blog/${relatedPost.fields.blogSlug}`}
                className="mb-6 inline-block w-full max-w-full"
              >
                <div className="w-full overflow-hidden">
                  {relatedPost.fields.blogImage && (
                    <img
                      src={`https:${relatedPost.fields.blogImage.fields.file.url}`}
                      alt={relatedPost.fields.blogTitle || "Blog post"}
                      className="rounded-image rounded-t-4xl aspect-[3/2] size-full object-cover"
                    />
                  )}
                </div>
              </Link>
              
              <div className="px-4 pb-4">
                <Link
                  href={`/blog/category/${relatedPost.fields.blogCategories}`}
                  className="mb-2 mr-4 inline-block max-w-full text-sm font-semibold"
                >
                  {relatedPost.fields.blogCategories}
                </Link>
                
                <Link
                  href={`/blog/${relatedPost.fields.blogSlug}`}
                  className="mb-2 block max-w-full"
                >
                  <h5 className="text-xl font-bold md:text-2xl">
                    {relatedPost.fields.blogTitle}
                  </h5>
                </Link>
                
                {relatedPost.fields.blogExcerpt && (
                  <p>{relatedPost.fields.blogExcerpt}</p>
                )}
                
                <div className="mt-6 flex items-center">
                  <div>
                    <h6 className="text-sm font-semibold">
                      {relatedPost.fields.blogAuthor}
                    </h6>
                    <div className="flex items-center">
                      <p className="text-sm">
                        {relatedPost.fields.blogPublishDate}
                      </p>
                      <span className="mx-2">•</span>
                      <p className="text-sm">5 min lectura</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
