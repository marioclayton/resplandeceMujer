import { format, isValid, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export function BlogPostHeader3({ post }) {
  const { blogTitle, blogPublishDate, blogAuthor, blogImage, blogCategories, blogExcerpt } = post.fields;
  let formattedDate = blogPublishDate;
  if (blogPublishDate) {
    try {
      const date = parseISO(blogPublishDate);
      if (isValid(date)) formattedDate = format(date, "MMMM d, yyyy");
    } catch {}
  }
  const fileUrl = blogImage?.fields?.file?.url;
  const imageUrl = fileUrl?.startsWith("//") ? `https:${fileUrl}` : fileUrl;

  return (
    <header className="px-[5%] pb-12 pt-36 md:pb-16 md:pt-44">
      <div className="container">
        <nav className="mb-10 flex items-center gap-2 text-sm text-[#8a746b]" aria-label="Migas de pan">
          <Link href="/" className="hover:text-[#7d4032]">Inicio</Link><span>/</span><Link href="/blog" className="hover:text-[#7d4032]">Blog</Link>
        </nav>
        <div className="mx-auto max-w-4xl text-center">
          {blogCategories && <p className="eyebrow text-[#9b5b47]">{blogCategories}</p>}
          <h1 className="mt-5 text-[clamp(2.85rem,6.5vw,5.75rem)] font-normal leading-[1.02] tracking-[-.025em] text-[#2f211d]">{blogTitle}</h1>
          {blogExcerpt && <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#66544d]">{blogExcerpt}</p>}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-[#8a746b]">
            {blogAuthor && <span>{blogAuthor}</span>}{blogAuthor && formattedDate && <span className="text-[#c5a99a]">•</span>}{formattedDate && <time>{formattedDate}</time>}<span className="text-[#c5a99a]">•</span><span>5 min de lectura</span>
          </div>
        </div>
        {imageUrl && <div className="relative mx-auto mt-12 aspect-[16/8] max-w-6xl overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(72,44,35,.12)]"><Image src={imageUrl} alt={blogImage.fields?.description || blogTitle} fill priority className="object-cover" sizes="(max-width: 1240px) 90vw, 1200px" /></div>}
      </div>
    </header>
  );
}
