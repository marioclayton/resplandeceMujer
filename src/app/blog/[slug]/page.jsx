import { createClient } from 'contentful';
import { BlogPostHeader3 } from "../../../components/blogPost/BlogPostHeader3";
import { Content27 } from "../../../components/blogPost/Content27";
import { Testimonial5 } from "../../../components/blogPost/Testimonial5";
import { Blog46 } from "../../../components/blogPost/Blog46";
import { notFound } from 'next/navigation';

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch blog post data
async function getBlogPost(slug) {
  if (!slug) {
    console.error('No slug provided to getBlogPost function');
    return null;
  }

  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.blogSlug': slug,
      limit: 1,
    });

    return response.items[0] || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
  // Validate params object
  if (!params || typeof params !== 'object') {
    console.error('Invalid params object received', params);
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  // Access slug directly instead of destructuring
  const slug = params.slug;
  
  // Debug log to see what's actually in params
  console.log('Params in generateMetadata:', params);
  
  if (!slug) {
    console.error('No slug found in params', params);
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  const blogPost = await getBlogPost(slug);

  if (!blogPost) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: blogPost.fields.title,
    description: blogPost.fields.excerpt || `Blog post: ${blogPost.fields.title}`,
  };
}

// Page component
export default async function Page({ params }) {
  // Debug log to see what's in params
  console.log('Params in Page component:', params);
  
  // Access slug directly
  const slug = params?.slug;
  
  if (!slug) {
    console.error('Invalid or missing slug in params', params);
    notFound();
  }
  
  const blogPost = await getBlogPost(slug);

  if (!blogPost) {
    notFound();
  }

  return (
    <div>
      <BlogPostHeader3 post={blogPost} />
      <Content27 post={blogPost} />
      <Testimonial5 post={blogPost} />
      <Blog46 post={blogPost} />
    </div>
  );
}

// Generate static paths
export async function generateStaticParams() {
  try {
    const response = await client.getEntries({ 
      content_type: 'blogPost',
      limit: 100,
    });

    return response.items.map((post) => {
      // Add error handling for missing blogSlug field
      if (!post.fields.blogSlug) {
        console.warn('Blog post missing blogSlug field:', post.sys.id);
        return null;
      }
      return {
        slug: post.fields.blogSlug,
      };
    }).filter(Boolean); // Filter out null values
  } catch (error) {
    console.error('Error generating static paths:', error);
    return [];
  }
}
