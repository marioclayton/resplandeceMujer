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
async function getBlogPosts(sortOrder = 'desc') {
  try {
    // The minus sign (-) before the field name means descending order
    // Remove it for ascending order
    const orderPrefix = sortOrder === 'desc' ? '-' : '';
    
    const response = await client.getEntries({
      content_type: "blogPost",
      order: `${orderPrefix}fields.blogPublishDate`,
      // Add this to ensure we get the full entries
      include: 10
    });
    
    // Double-check the sorting with JavaScript as well
    const posts = response.items;
    
    // Fallback sorting if Contentful's sorting doesn't work correctly
    if (posts && posts.length > 0) {
      posts.sort((a, b) => {
        const dateA = new Date(a.fields.blogPublishDate);
        const dateB = new Date(b.fields.blogPublishDate);
        
        // For desc: return dateB - dateA
        // For asc: return dateA - dateB
        return sortOrder === 'desc' ? 
          (dateB.getTime() - dateA.getTime()) : 
          (dateA.getTime() - dateB.getTime());
      });
    }
    
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function Page() {
  // Fetch blog posts on the server
  // You can change 'desc' to 'asc' if you want oldest first
  const posts = await getBlogPosts('desc');

  return (
    <div>
      <Blog1 initialPosts={posts} />
      <Faq3 />
    </div>
  );
}
