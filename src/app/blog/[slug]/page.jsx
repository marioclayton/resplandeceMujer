import { createClient } from 'contentful';
import { BlogPostHeader3 } from "../../../components/blogPost/BlogPostHeader3";
import { Content27 } from "../../../components/blogPost/Content27";
import { Testimonial5 } from "../../../components/blogPost/Testimonial5";
import { Blog46 } from "../../../components/blogPost/Blog46";
import { notFound } from 'next/navigation';

export const revalidate = 60;


// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Debug function to check content types
async function debugContentful() {
  try {
    // List all content types to verify
    const contentTypes = await client.getContentTypes();
    console.log('Available content types:', contentTypes.items.map(type => type.name));
    
    // Check for any blog posts
    const entries = await client.getEntries({
      content_type: 'blogPost',
      limit: 5,
    });
    
    console.log('Found blog posts:', entries.total);
    if (entries.items.length > 0) {
      console.log('Sample blog post fields:', Object.keys(entries.items[0].fields));
      console.log('First blog post:', {
        id: entries.items[0].sys.id,
        title: entries.items[0].fields.blogTitle || entries.items[0].fields.title,
        slug: entries.items[0].fields.blogSlug || entries.items[0].fields.slug || '[No slug field]'
      });
    }
    return entries.items.length > 0;
  } catch (error) {
    console.error('Contentful debug error:', error);
    return false;
  }
}

// Fetch blog post data
async function getBlogPost(slug) {
  console.log('=== getBlogPost CALLED WITH SLUG:', slug, '===');
  
  if (!slug) {
    console.error('No slug provided to getBlogPost function');
    return null;
  }

  // Decode the URL-encoded slug (e.g., convert "C%C3%B3mo" to "Cómo")
  const decodedSlug = decodeURIComponent(slug);
  console.log(`Original slug: "${slug}", Decoded slug: "${decodedSlug}"`);
  
  try {
    console.log('=== STARTING CONTENTFUL QUERIES ===');
    
    // First, try to find by blogSlug field
    console.log(`Attempting to fetch blog post with decoded slug: "${decodedSlug}"`);
    let response = await client.getEntries({
      content_type: 'blogPost',
      'fields.blogSlug': decodedSlug,
      limit: 1,
    });
    
    console.log(`Query results with blogSlug field: found ${response.total} entries`);
    
    // If no results with blogSlug, try with 'slug' field
    if (response.total === 0) {
      console.log(`Trying with 'slug' field: "${decodedSlug}"`);
      response = await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': decodedSlug,
        limit: 1,
      });
      console.log(`Query results with slug field: found ${response.total} entries`);
    }

    // If no results with decoded slug, try with original (encoded) slug
    if (response.total === 0) {
      console.log(`Trying with original blogSlug field: "${slug}"`);
      response = await client.getEntries({
        content_type: 'blogPost',
        'fields.blogSlug': slug,
        limit: 1,
      });
      console.log(`Query results with original blogSlug: found ${response.total} entries`);
    }

    // If still no results, try with original slug field
    if (response.total === 0) {
      console.log(`Trying with original slug field: "${slug}"`);
      response = await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': slug,
        limit: 1,
      });
      console.log(`Query results with original slug field: found ${response.total} entries`);
    }
    
    console.log('=== CHECKING IF FOUND MATCH ===');
    if (response.items[0]) {
      console.log('Found blog post:', {
        id: response.items[0].sys.id,
        title: response.items[0].fields.blogTitle || response.items[0].fields.title,
        slug: response.items[0].fields.blogSlug || response.items[0].fields.slug
      });
      return response.items[0];
    }
    
    // If still no results, try fetching all and manually searching
    console.log('No exact matches found, fetching all posts to search manually');
    const allPosts = await client.getEntries({
      content_type: 'blogPost',
      limit: 100,
    });
    
    console.log(`Fetched ${allPosts.total} total posts to search through`);
    
    // Log the first few posts' slugs to debug
    if (allPosts.items.length > 0) {
      console.log('Available slugs:');
      allPosts.items.slice(0, 10).forEach(item => {
        const blogSlug = item.fields.blogSlug || item.fields.slug;
        console.log(`- ID: ${item.sys.id}, Title: ${item.fields.blogTitle || item.fields.title}, BlogSlug: ${item.fields.blogSlug || 'N/A'}, Slug: ${item.fields.slug || 'N/A'}, Effective Slug: ${blogSlug}`);
      });
    }
    
    // Search with multiple variations and case insensitivity
    const matchingPost = allPosts.items.find(item => {
      const itemSlugBlog = item.fields.blogSlug;
      const itemSlug = item.fields.slug;
      if (!itemSlugBlog && !itemSlug) return false;
      
      return (itemSlugBlog && (
        itemSlugBlog.toLowerCase() === decodedSlug.toLowerCase() || 
        itemSlugBlog.toLowerCase() === slug.toLowerCase() ||
        decodedSlug.toLowerCase().includes(itemSlugBlog.toLowerCase()) ||
        itemSlugBlog.toLowerCase().includes(decodedSlug.toLowerCase())
      )) ||
      (itemSlug && (
        itemSlug.toLowerCase() === decodedSlug.toLowerCase() || 
        itemSlug.toLowerCase() === slug.toLowerCase() ||
        decodedSlug.toLowerCase().includes(itemSlug.toLowerCase()) ||
        itemSlug.toLowerCase().includes(decodedSlug.toLowerCase())
      ));
    });
    
    if (matchingPost) {
      const effectiveSlug = matchingPost.fields.blogSlug || matchingPost.fields.slug;
      console.log(`Found matching post: "${matchingPost.fields.blogTitle || matchingPost.fields.title}" with effective slug: "${effectiveSlug}"`);
      return matchingPost;
    }

    console.log('=== NO BLOG POST FOUND ===');
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Fetch related posts from server component
async function getRelatedPosts(currentPost) {
  try {
    if (!currentPost) return [];
    
    const currentId = currentPost.sys.id;
    // Try to match by any common tags or categories if available
    const currentTags = currentPost.fields.tags || [];
    
    // Fetch related posts (excluding current)
    const response = await client.getEntries({
      content_type: 'blogPost',
      limit: 3,
      'sys.id[ne]': currentId, // Exclude current post
    });
    
    return response.items || [];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  console.log('Generating metadata for slug:', slug);
  
  if (!slug) {
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
    title: blogPost.fields.blogTitle || blogPost.fields.title || 'Blog Post',
    description: blogPost.fields.blogExcerpt || blogPost.fields.excerpt || `Blog post: ${blogPost.fields.blogTitle || blogPost.fields.title}`,
  };
}

// Page component
export default async function Page({ params }) {
  console.log('=== BLOG POST PAGE CALLED ===');
  const resolvedParams = await params;
  console.log('Rendering page for params:', resolvedParams);
  const slug = resolvedParams?.slug;
  
  if (!slug) {
    console.error('Invalid or missing slug in params', resolvedParams);
    notFound();
  }
  
  console.log('=== FETCHING BLOG POST FOR SLUG:', slug, '===');
  const blogPost = await getBlogPost(slug);

  if (!blogPost) {
    console.error(`Blog post not found for slug: ${slug}`);
    notFound();
  }

  // Fetch related posts on the server
  const relatedPosts = await getRelatedPosts(blogPost);

  console.log('Successfully found blog post:', blogPost.fields.blogTitle || blogPost.fields.title);
  
  return (
    <div className='darkBG'>
      <BlogPostHeader3 post={blogPost} />
      <Content27 post={blogPost} />
      <Testimonial5 postSlug={slug} />
      <Blog46 relatedPosts={relatedPosts} />
    </div>
  );
}

// Generate static paths
export async function generateStaticParams() {
  // For development, return empty array to use dynamic rendering
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode: using dynamic rendering for blog posts');
    return [];
  }
  
  try {
    console.log('Generating static paths for blog posts...');
    
    // First, debug the Contentful connection
    const hasData = await debugContentful();
    if (!hasData) {
      console.error('No data found in Contentful or connection failed');
      return [];
    }
    
    const response = await client.getEntries({ 
      content_type: 'blogPost',
      limit: 100,
    });

    console.log(`Found ${response.total} blog posts for static generation`);
    
    const paths = response.items.map((post) => {
      // Check for both blogSlug and slug fields
      const effectiveSlug = post.fields.blogSlug || post.fields.slug;
      
      if (!effectiveSlug) {
        console.warn(`Blog post missing slug fields: ${post.sys.id}, title: ${post.fields.blogTitle || post.fields.title}`);
        return null;
      }
      
      console.log(`Creating path for slug: "${effectiveSlug}"`);
      return { slug: effectiveSlug };
    }).filter(Boolean);
    
    console.log('Generated paths count:', paths.length);
    return paths;
  } catch (error) {
    console.error('Error generating static paths:', error);
    return [];
  }
}
