import { createClient } from 'contentful';
import { ProductHeader1 } from '@/components/product/ProductHeader1';
import { notFound } from 'next/navigation';

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch a default product or redirect
async function getDefaultProduct() {
  try {
    const response = await client.getEntries({
      content_type: 'product',
      limit: 1,
    });

    return response.items[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage() {
  // Option 1: Fetch a default product to display
  const product = await getDefaultProduct();
  
  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductHeader1 product={product} />
    </div>
  );
  
  // Option 2: Or if this page is no longer needed, redirect to products page
  // redirect('/products');
}
