import type { MetadataRoute } from "next";
import { createClient } from "contentful";

const baseUrl = "https://www.resplandecemujer.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/blog", "/productos", "/acerca", "/contacto", "/privacidad", "/terminos", "/aviso-legal"].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.6 }));
  try {
    const client = createClient({ space: process.env.CONTENTFUL_SPACE_ID || "", accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "" });
    const [posts, products] = await Promise.all([
      client.getEntries({ content_type: "blogPost", limit: 1000, select: ["fields.blogSlug", "sys.updatedAt"] }),
      client.getEntries({ content_type: "product", limit: 1000, select: ["fields.productSlug", "sys.updatedAt"] }),
    ]);
    return [...staticRoutes,
      ...posts.items.filter((item) => item.fields.blogSlug).map((item) => ({ url: `${baseUrl}/blog/${encodeURIComponent(String(item.fields.blogSlug))}`, lastModified: new Date(item.sys.updatedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
      ...products.items.filter((item) => item.fields.productSlug).map((item) => ({ url: `${baseUrl}/productos/${encodeURIComponent(String(item.fields.productSlug))}`, lastModified: new Date(item.sys.updatedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
    ];
  } catch { return staticRoutes; }
}
