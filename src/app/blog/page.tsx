import React from "react";
import { Blog1 } from "../../components/blogPage/Blog1";
import { Faq3 } from "../../components/blogPage/Faq3";
import { createClient } from 'contentful';

// Create Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Server-side data fetching
async function getBlogPosts() {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      order: "-fields.blogPublishDate",
    });
    
    return response.items;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function Page() {
  // Fetch blog posts on the server
  const posts = await getBlogPosts();

  return (
    <div>
      <Blog1 initialPosts={posts} />
      <Faq3 />
    </div>
  );
}
