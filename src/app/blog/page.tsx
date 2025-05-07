import React from "react";
import { Blog1 } from "../../components/blogPage/Blog1";
import { Faq3 } from "../../components/blogPage/Faq3";
import { Entry, createClient } from 'contentful';

// Add this export to enable revalidation every 60 seconds
export const revalidate = 60;

// Create Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Server-side data fetching
async function getBlogPosts(sortOrder = 'desc') {
  try {
    const orderPrefix = sortOrder === 'desc' ? '-' : '';
    
    // Add cache:false option to bypass CDN cache
    const response = await client.getEntries({
      content_type: "blogPost",
      order: [`${orderPrefix}fields.blogPublishDate`],
      include: 10,
    });
    
    // Rest of your function remains the same...
    const posts = response.items;
    
    if (posts && posts.length > 0) {
      posts.sort((a, b) => {
        // Your existing sort logic...
        const getValidDateString = (value: unknown): string => {
          if (!value) return new Date(0).toISOString();
          if (typeof value === 'string') return value;
          return new Date(0).toISOString();
        };
        
        const dateAValue = getValidDateString(a.fields.blogPublishDate);
        const dateBValue = getValidDateString(b.fields.blogPublishDate);
        
        const dateA = new Date(dateAValue);
        const dateB = new Date(dateBValue);
        
        return sortOrder === 'desc' ? 
          (dateB.getTime() - dateA.getTime()) : 
          (dateA.getTime() - dateB.getTime());
      });
    }
    
    console.log(`Fetched ${posts?.length || 0} blog posts`);
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
      <Blog1 initialPosts={posts as unknown as never[]} />
      <Faq3 />
    </div>
  );
}
