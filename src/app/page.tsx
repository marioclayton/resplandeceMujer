import React from "react";
import { createClient } from 'contentful';
import { Header5 } from "../components/Header5";
import { Layout369 } from "../components/Layout369";
import { Layout4 } from "../components/Layout4";

export const revalidate = 60;

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Fetch layout data on the server
async function getHomePageData() {
  try {
    // Fetch ALL blog posts (remove limit: 1)
    const blogsResponse = await client.getEntries({
      content_type: "blogPost",
      order: ['-fields.blogPublishDate'],
      include: 2
    });

    // Fetch a featured or highest rated product
    const featuredProductResponse = await client.getEntries({
      content_type: "product",
      limit: 1,
      include: 2
    });

    return {
      blogs: blogsResponse.items || [],
      highestRatedProduct: featuredProductResponse.items[0] || null
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      blogs: [],
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
