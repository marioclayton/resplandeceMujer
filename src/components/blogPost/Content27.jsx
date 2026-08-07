import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import Image from "next/image";

export function Content27({ post }) {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong className="font-semibold text-[#382720]">{text}</strong>,
      [MARKS.ITALIC]: (text) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text) => <span className="underline decoration-[#c6785e] underline-offset-4">{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => <p className="mb-7 text-[1.08rem] leading-[1.9] text-[#55433c]">{children}</p>,
      [BLOCKS.HEADING_1]: (_, children) => <h2 className="mb-5 mt-14 text-4xl font-normal leading-tight text-[#2f211d] md:text-5xl">{children}</h2>,
      [BLOCKS.HEADING_2]: (_, children) => <h2 className="mb-5 mt-14 text-4xl font-normal leading-tight text-[#2f211d]">{children}</h2>,
      [BLOCKS.HEADING_3]: (_, children) => <h3 className="mb-4 mt-10 text-3xl font-normal text-[#2f211d]">{children}</h3>,
      [BLOCKS.HEADING_4]: (_, children) => <h4 className="mb-3 mt-8 text-2xl font-normal text-[#2f211d]">{children}</h4>,
      [BLOCKS.UL_LIST]: (_, children) => <ul className="mb-8 list-disc space-y-3 pl-6 text-lg leading-8 text-[#55433c] marker:text-[#b9694f]">{children}</ul>,
      [BLOCKS.OL_LIST]: (_, children) => <ol className="mb-8 list-decimal space-y-3 pl-6 text-lg leading-8 text-[#55433c] marker:font-bold marker:text-[#9b5b47]">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (_, children) => <li className="pl-2">{children}</li>,
      [BLOCKS.QUOTE]: (_, children) => <blockquote className="my-10 rounded-r-2xl border-l-4 border-[#b9694f] bg-[#efe1d4] px-7 py-6 text-xl italic leading-9 text-[#4c362e]">{children}</blockquote>,
      [BLOCKS.HR]: () => <hr className="my-12 border-[#d8c2b5]" />,
      [INLINES.HYPERLINK]: (node, children) => <a href={node.data.uri} className="font-semibold text-[#8d4d3c] underline decoration-[#cba99a] underline-offset-4 hover:text-[#b9694f]" target="_blank" rel="noopener noreferrer">{children}</a>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, description, file } = node.data.target.fields;
        const { width = 800, height = 600 } = file.details?.image || {};
        return <figure className="my-12"><Image src={`https:${file.url}`} alt={description || title || "Imagen del artículo"} width={width} height={height} className="mx-auto rounded-[1.5rem]" />{title && <figcaption className="mt-3 text-center text-sm text-[#8a746b]">{title}</figcaption>}</figure>;
      },
    },
  };
  return <article className="mx-auto max-w-[46rem] px-6 py-12 md:py-16">{post.fields.blogContent && documentToReactComponents(post.fields.blogContent, options)}</article>;
}
