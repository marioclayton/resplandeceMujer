import Image from "next/image";
import Link from "next/link";

export function Blog46({ relatedPosts }) {
  if (!relatedPosts?.length) return null;
  return (
    <section className="border-t border-[#d8c2b5] bg-[#efe1d4] px-[5%] py-20 md:py-28">
      <div className="container">
        <p className="eyebrow text-[#9b5b47]">Continúa leyendo</p><h2 className="mt-4 text-5xl font-normal text-[#2f211d] md:text-6xl">Reflexiones relacionadas</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">{relatedPosts.map((post) => { const raw = post.fields.blogImage?.fields?.file?.url; const src = raw?.startsWith("//") ? `https:${raw}` : raw; return <article key={post.sys.id} className="group overflow-hidden rounded-[1.75rem] bg-[#fffaf2]"><Link href={`/blog/${post.fields.blogSlug}`} className="block">{src && <div className="relative aspect-[3/2] overflow-hidden"><Image src={src} alt={post.fields.blogTitle} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" /></div>}<div className="p-6"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#9b5b47]">{post.fields.blogCategories}</p><h3 className="mt-3 text-3xl font-normal leading-tight text-[#2f211d] group-hover:text-[#9b5b47]">{post.fields.blogTitle}</h3><p className="mt-3 line-clamp-2 leading-7 text-[#66544d]">{post.fields.blogExcerpt}</p></div></Link></article>; })}</div>
      </div>
    </section>
  );
}
