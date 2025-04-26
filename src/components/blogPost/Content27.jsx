"use client";

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';

export function Content27({ post }) {
  const { blogContent } = post.fields;
  
  // Configure the rich text renderer options
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong className="font-bold">{text}</strong>,
      [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: (text) => <span className="underline">{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-6 text-lg leading-relaxed text-justify">{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => <h1 className="text-4xl font-bold mb-4 mt-10">{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-3xl font-bold mb-4 mt-8">{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-2xl font-bold mb-3 mt-6">{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4 className="text-xl font-bold mb-3 mt-6">{children}</h4>,
      [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc pl-8 mb-6 text-lg text-justify">{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal pl-8 mb-6 text-lg text-justify">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li className="mb-2">{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-justify">{children}</blockquote>,
      [BLOCKS.HR]: () => <hr className="my-8 border-t border-gray-300" />,
      [INLINES.HYPERLINK]: (node, children) => {
        return <Link href={node.data.uri} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{children}</Link>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, description, file } = node.data.target.fields;
        const { url, details } = file;
        const { image } = details;
        const { width, height } = image || { width: 800, height: 600 };
        
        return (
          <div className="my-8">
            <Image
              src={`https:${url}`}
              alt={description || title || "Blog image"}
              width={width}
              height={height}
              className="rounded-lg mx-auto"
            />
            {title && <p className="text-center text-sm text-gray-500 mt-2">{title}</p>}
          </div>
        );
      },
    },
  };

  return (
    <div className="blog-content container mx-auto px-4 py-8 max-w-3xl">
      {blogContent && documentToReactComponents(blogContent, options)}
    </div>
  );
}
