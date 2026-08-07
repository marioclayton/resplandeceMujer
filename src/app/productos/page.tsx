import { createClient } from "contentful";
import Product10 from "../../components/products/Product10";

export const metadata = {
  title: "Recursos y devocionales",
  description: "Devocionales y herramientas prácticas para profundizar tu fe, cuidar tu interior y vivir con propósito.",
  alternates: { canonical: "/productos" },
};

// Revalidate every hour to reduce API usage
export const revalidate = 3600;

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch products from Contentful
export default async function ProductsPage() {
  const res = await client.getEntries({ content_type: "product", include: 1, limit: 100 });
  const products = res.items || [];

  return (
    <div>
      <Product10 products={products} />
    </div>
  );
}
