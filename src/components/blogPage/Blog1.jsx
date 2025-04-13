"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export function Blog1({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Extract categories from posts
    const allCategories = initialPosts.map(
      (post) => post.fields.blogCategories
    );
    const uniqueCategories = [...new Set(allCategories)];
    setCategories(uniqueCategories);
  }, [initialPosts]);

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.fields.blogCategories === activeCategory);

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="md:mb-18 mb-12 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Blog</p>
            <h1 className="lg:text-10xl mb-5 text-6xl font-bold md:mb-6 md:text-9xl">
              Artículos Inspiradores para Mujeres
            </h1>
            <p className="md:text-md">
              Explora nuestros artículos más destacados y enriquecedores.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <p>Cargando artículos...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="flex flex-col justify-start">
            {/* Categories Filter */}
            <div className="no-scrollbar mb-12 ml-[-5vw] flex w-screen items-center justify-start overflow-scroll pl-[5vw] md:mb-16 md:ml-0 md:w-full md:justify-center md:overflow-hidden md:pl-0">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-button inline-flex gap-3 items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none border px-4 py-2 ${
                  activeCategory === "all"
                    ? "text-text-primary bg-background-primary border-border-primary"
                    : "text-text-primary gap-2 bg-transparent border-transparent"
                }`}
              >
                Ver todo
              </button>

              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-button inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none border px-4 py-2 ${
                    activeCategory === category
                      ? "text-text-primary bg-background-primary border-border-primary"
                      : "text-text-primary gap-2 bg-transparent border-transparent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div key={post.sys.id}>
                    <Link
                      href={`/blog/${post.fields.blogSlug}`}
                      className="mb-6 inline-block w-full max-w-full"
                    >
                      <div className="w-full overflow-hidden">
                        <img
                          src={post.fields.blogImage.fields.file.url}
                          alt={post.fields.blogTitle}
                          className="rounded-image aspect-[3/2] size-full object-cover"
                        />
                      </div>
                    </Link>
                    <Link
                      href={`/blog/category/${post.fields.blogCategories}`}
                      className="mb-2 mr-4 inline-block max-w-full text-sm font-semibold"
                    >
                      {post.fields.blogCategories}
                    </Link>
                    <Link
                      href={`/blog/${post.fields.blogSlug}`}
                      className="mb-2 block max-w-full"
                    >
                      <h5 className="text-xl font-bold md:text-2xl">
                        {post.fields.blogTitle}
                      </h5>
                    </Link>
                    <p>{post.fields.blogExcerpt}</p>
                    <div className="mt-6 flex items-center">
                      <div>
                        <h6 className="text-sm font-semibold">
                          {post.fields.blogAuthor}
                        </h6>
                        <div className="flex items-center">
                          <p className="text-sm">
                            {post.fields.blogPublishDate}
                          </p>
                          <span className="mx-2">•</span>
                          <p className="text-sm">5 min lectura</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-center">
                  No hay artículos en esta categoría.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
