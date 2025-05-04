import React from "react";
import { Blog1 } from "../../components/blogPage/Blog1";
import { Faq3 } from "../../components/blogPage/Faq3";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entry, createClient } from 'contentful';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface BlogPostFields {
  blogTitle: string;
  blogExcerpt?: string;
  blogContent?: any; // ESLint rule is disabled for this file
  blogPublishDate?: string;
  blogImage?: any;
  slug?: string;
}

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
      order: [`${orderPrefix}fields.blogPublishDate`], // Wrap in square brackets
      // Add this to ensure we get the full entries
      include: 10
    });
    
    // Double-check the sorting with JavaScript as well
    const posts = response.items;
    
    // Fallback sorting if Contentful's sorting doesn't work correctly
    if (posts && posts.length > 0) {
      posts.sort((a, b) => {
        // Use more specific type handling for dates
        const getValidDateString = (value: unknown): string => {
          if (!value) return new Date(0).toISOString();
          if (typeof value === 'string') return value;
          return new Date(0).toISOString();
        };
        
        const dateAValue = getValidDateString(a.fields.blogPublishDate);
        const dateBValue = getValidDateString(b.fields.blogPublishDate);
        
        const dateA = new Date(dateAValue);
        const dateB = new Date(dateBValue);
        
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
  const posts = await getBlogPosts('desc');

  return (
    <div>
      {/* More aggressive type assertion for deployment */}
      <Blog1 initialPosts={posts as unknown as never[]} />
      <Faq3 />
    </div>
  );
}
