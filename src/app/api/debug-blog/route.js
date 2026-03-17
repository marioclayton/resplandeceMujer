import { NextResponse } from 'next/server';
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function GET() {
  try {
    // Fetch a few blog posts to inspect their structure
    const response = await client.getEntries({
      content_type: 'blogPost',
      limit: 5,
    });

    // Create a detailed structure report
    const report = {
      total: response.total,
      posts: response.items.map(post => ({
        id: post.sys.id,
        title: post.fields.title,
        allFields: Object.keys(post.fields),
        slug: post.fields.slug || post.fields.blogSlug || 'NO SLUG FIELD',
        blogSlug: post.fields.blogSlug,
        hasSlugField: 'slug' in post.fields,
        hasBlogSlugField: 'blogSlug' in post.fields,
      }))
    };

    return NextResponse.json(report, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog posts',
        message: error.message,
        stack: error.stack 
      },
      { status: 500 }
    );
  }
}