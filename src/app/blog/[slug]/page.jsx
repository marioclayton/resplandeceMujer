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
        title: entries.items[0].fields.title,
        slug: entries.items[0].fields.blogSlug || '[No blogSlug field]'
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
  if (!slug) {
    console.error('No slug provided to getBlogPost function');
    return null;
  }

  // Decode the URL-encoded slug (e.g., convert "C%C3%B3mo" to "Cómo")
  const decodedSlug = decodeURIComponent(slug);
  console.log(`Original slug: "${slug}", Decoded slug: "${decodedSlug}"`);
  
  try {
    // Try with the decoded slug first
    console.log(`Attempting to fetch blog post with decoded slug: "${decodedSlug}"`);
    let response = await client.getEntries({
      content_type: 'blogPost',
      'fields.blogSlug': decodedSlug,
      limit: 1,
    });
    
    console.log(`Query results with decoded slug: found ${response.total} entries`);
    
    // If no results with decoded slug, try with original (encoded) slug
    if (response.total === 0) {
      console.log(`Trying with original slug: "${slug}"`);
      response = await client.getEntries({
        content_type: 'blogPost',
        'fields.blogSlug': slug,
        limit: 1,
      });
      console.log(`Query results with original slug: found ${response.total} entries`);
    }
    
    // If still no results, try fetching all and manually searching
    if (response.total === 0) {
      console.log('No exact matches found, fetching all posts to search manually');
      const allPosts = await client.getEntries({
        content_type: 'blogPost',
        limit: 100,
      });
      
      console.log(`Fetched ${allPosts.total} total posts to search through`);
      
      // Log the first few posts' slugs to debug
      if (allPosts.items.length > 0) {
        console.log('Available slugs:');
        allPosts.items.slice(0, 5).forEach(item => {
          console.log(`- ID: ${item.sys.id}, Title: ${item.fields.title}, Slug: ${item.fields.blogSlug || 'N/A'}`);
        });
      }
      
      // Search with multiple variations and case insensitivity
      const matchingPost = allPosts.items.find(item => {
        const itemSlug = item.fields.blogSlug;
        if (!itemSlug) return false;
        
        return itemSlug.toLowerCase() === decodedSlug.toLowerCase() || 
               itemSlug.toLowerCase() === slug.toLowerCase() ||
               decodedSlug.toLowerCase().includes(itemSlug.toLowerCase()) ||
               itemSlug.toLowerCase().includes(decodedSlug.toLowerCase());
      });
      
      if (matchingPost) {
        console.log(`Found matching post: "${matchingPost.fields.title}" with slug: "${matchingPost.fields.blogSlug}"`);
        return matchingPost;
      }
    }

    return response.items[0] || null;
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
  const slug = params?.slug;
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
    title: blogPost.fields.title,
    description: blogPost.fields.excerpt || `Blog post: ${blogPost.fields.title}`,
  };
}

// Page component
export default async function Page({ params }) {
  console.log('Rendering page for params:', params);
  const slug = params?.slug;
  
  if (!slug) {
    console.error('Invalid or missing slug in params', params);
    notFound();
  }
  
  const blogPost = await getBlogPost(slug);

  if (!blogPost) {
    console.error(`Blog post not found for slug: ${slug}`);
    notFound();
  }

  // Fetch related posts on the server
  const relatedPosts = await getRelatedPosts(blogPost);

  console.log('Successfully found blog post:', blogPost.fields.title);
  
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
  try {
    console.log('Generating static paths for blog posts...');
    const response = await client.getEntries({ 
      content_type: 'blogPost',
      limit: 100,
    });

    console.log(`Found ${response.total} blog posts for static generation`);
    
    const paths = response.items.map((post) => {
      // Check for the blog slug field
      const slug = post.fields.blogSlug;
      
      if (!slug) {
        console.warn(`Blog post missing blogSlug field: ${post.sys.id}, title: ${post.fields.title}`);
        return null;
      }
      
      return { slug };
    }).filter(Boolean);
    
    console.log('Generated paths:', paths);
    return paths;
  } catch (error) {
    console.error('Error generating static paths:', error);
    return [];
  }
}
