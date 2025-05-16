import { createClient } from 'contentful';
import { ProductHeader1 } from '@/components/product/ProductHeader1';
import { ProductReviews } from "@/components/product/ProductReviews";
import { notFound } from 'next/navigation';

export const revalidate = 60;

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch product data
async function getProduct(slug) {
  try {
    const response = await client.getEntries({
      content_type: 'product',
      'fields.productSlug': slug,
      limit: 1,
    });

    return response.items[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: product.fields.productName,
    description: `Product details for ${product.fields.productName}`,
  };
}

// Page component
export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductHeader1 product={product} />
      <ProductReviews productId={product.sys.id} />
    </main>
  );
}

// Generate static paths
export async function generateStaticParams() {
  const response = await client.getEntries({ 
    content_type: 'product',
    limit: 100,
  });

  return response.items.map((product) => ({
    slug: product.fields.productSlug,
  }));
}