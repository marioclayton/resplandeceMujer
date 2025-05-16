import { createClient } from "contentful";
import Product10 from "../../components/products/Product10";

export const revalidate = 60;

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch products from Contentful
export default async function ProductsPage() {
  const res = await client.getEntries({ content_type: "product" });
  const products = res.items || [];

  return (
    <div>
      <Product10 products={products} />
    </div>
  );
}
