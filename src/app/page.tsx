import React from "react";
import type { Metadata } from "next";
import { createClient } from 'contentful';
import { Header5 } from "../components/Header5";
import { Layout369 } from "../components/Layout369";
import { HomeMessages } from "../components/HomeMessages";
import { Layout4 } from "../components/Layout4";
import { getShortMessages } from "../lib/messages";

export const metadata: Metadata = {
  title: "Resplandece Mujer | Crece en tu relación con Jesucristo",
  description: "Enseñanzas bíblicas, reflexiones y recursos para fortalecer tu fe, renovar tu esperanza y vivir el propósito de Dios en Cristo.",
  alternates: { canonical: "/" },
};

// Refresh frequently enough for newly published short messages to reach the
// homepage promptly while retaining static-page performance.
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
      include: 2,
      limit: 3
    });

    const messages = await getShortMessages(3);

    return {
      blogs: blogsResponse.items || [],
      messages,
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      blogs: [],
      messages: await getShortMessages(3),
    };
  }
}

// Add the async keyword to the Page component
export default async function Page() {
  // Fetch data on the server
  const layoutData = await getHomePageData();

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Resplandece Mujer",
        url: "https://www.resplandecemujer.com",
        description: "Enseñanzas bíblicas, reflexiones y recursos para crecer en tu relación con Jesucristo, fortalecer tu fe y vivir el propósito de Dios.",
        inLanguage: "es",
        publisher: { "@type": "Organization", name: "Resplandece Mujer", url: "https://www.resplandecemujer.com", logo: "https://www.resplandecemujer.com/assets/logo.png" },
      }).replace(/</g, "\\u003c") }} />
      <Header5 />
      <Layout369 layoutData={layoutData} />
      <HomeMessages messages={layoutData.messages} />
      <Layout4 />
    </div>
  );
}
