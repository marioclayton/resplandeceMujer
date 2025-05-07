import React from "react";
import { createClient } from 'contentful';
import { Header5 } from "../components/Header5";
import { Layout369 } from "../components/Layout369";
import { Layout4 } from "../components/Layout4";

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Fetch layout data on the server
async function getHomePageData() {
  try {
    // 1. First fetch the latest blog post
    const latestBlogResponse = await client.getEntries({
      content_type: "blogPost",
      limit: 1,
      order: ['-fields.blogPublishDate'], // Changed to array syntax
      include: 2
    });
    
    // 2. Fetch a featured or highest rated product
    const featuredProductResponse = await client.getEntries({
      content_type: "product", // Update this to match your product content type
      limit: 1,
      include: 2
    });

    // Combine the data into a single object
    return {
      latestBlog: latestBlogResponse.items[0] || null,
      highestRatedProduct: featuredProductResponse.items[0] || null
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      latestBlog: null,
      highestRatedProduct: null
    };
  }
}

// Add the async keyword to the Page component
export default async function Page() {
  // Fetch data on the server
  const layoutData = await getHomePageData();

  return (
    <div>
      <Header5 />
      <Layout369 layoutData={layoutData} />
      <Layout4 />
    </div>
  );
}
