import Link from "next/link";
import Image from "next/image";
import { RxArrowRight } from "react-icons/rx";

function getImageUrl(post) {
  const url = post?.fields?.blogImage?.fields?.file?.url;
  if (!url) return "/assets/pexels-mart-production-7218327.jpg";
  return url.startsWith("//") ? `https:${url}` : url;
}

export function Layout369({ layoutData }) {
  const posts = (layoutData?.blogs || []).slice(0, 3);

  return (
    <section className="section-shell bg-[#f8f2e9]">
      <div className="container px-6 md:px-8">
        <div className="section-heading md:flex md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#9b5b47]">Para tu camino</p>
            <h2 className="mt-4 text-5xl leading-none text-[#2f211d] md:text-7xl">
              Palabras para esta temporada
            </h2>
          </div>
          <Link href="/blog" className="text-link mt-6 md:mt-0">
            Ver todos los artículos <RxArrowRight />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((post, index) => (
              <article className="editorial-card group" key={post.sys.id}>
                <Link href={`/blog/${post.fields.blogSlug || ""}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={getImageUrl(post)}
                      alt={post.fields.blogTitle || "Artículo de Resplandece Mujer"}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={index === 0}
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-[#fffaf2]/90 px-3 py-1 text-xs font-semibold text-[#5e3028] backdrop-blur">
                      {post.fields.blogCategories || "Reflexión"}
                    </span>
                  </div>
                  <div className="px-1 pb-2 pt-6">
                    <h3 className="text-3xl leading-tight text-[#2f211d] transition group-hover:text-[#9b5b47]">
                      {post.fields.blogTitle}
                    </h3>
                    <p className="mt-3 line-clamp-3 leading-7 text-[#66544d]">
                      {post.fields.blogExcerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#7d4032]">
                      Leer reflexión <RxArrowRight />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[2rem] bg-white p-10 text-center text-[#66544d]">
            Muy pronto encontrarás nuevas reflexiones para acompañar tu camino.
          </div>
        )}
      </div>
    </section>
  );
}
