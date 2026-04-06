import { createClient } from 'contentful';
import { ProductHeader1 } from '@/components/product/ProductHeader1';
import { ProductReviews } from "@/components/product/ProductReviews";
import { notFound } from 'next/navigation';

// Revalidate every hour to reduce API usage
export const revalidate = 3600;

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
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

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
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

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
  // For development, return empty array to use dynamic rendering
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode: using dynamic rendering for products');
    return [];
  }
  
  try {
    console.log('Generating static paths for products...');
    const response = await client.getEntries({ 
      content_type: 'product',
      limit: 100,
    });

    console.log(`Found ${response.total} products for static generation`);
    
    const paths = response.items.map((product) => {
      console.log(`Creating path for product: ${product.fields.productName} -> ${product.fields.productSlug}`);
      return {
        slug: product.fields.productSlug,
      };
    }).filter(Boolean);
    
    console.log('Generated product paths:', paths);
    return paths;
  } catch (error) {
    console.error('Error generating static paths for products:', error);
    return [];
  }
}