import { createClient } from 'contentful-management';
import { NextResponse } from 'next/server';

// Rate limiting
const RATE_LIMIT = {};
const LIMIT_DURATION = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    if (RATE_LIMIT[ip]) {
      const { count, timestamp } = RATE_LIMIT[ip];
      const elapsed = Date.now() - timestamp;
      
      if (elapsed < LIMIT_DURATION) {
        if (count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: 'Too many requests, please try again later' },
            { status: 429 }
          );
        }
        RATE_LIMIT[ip].count++;
      } else {
        RATE_LIMIT[ip] = { count: 1, timestamp: Date.now() };
      }
    } else {
      RATE_LIMIT[ip] = { count: 1, timestamp: Date.now() };
    }
    
    // Get request data
    const { name, review, rating, productId } = await request.json();
    
    // Validate required fields
    if (!name || !review || !productId) {
      return NextResponse.json(
        { error: 'Name, review, and productId are required' },
        { status: 400 }
      );
    }
    
    // Initialize Contentful management client
    const client = createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
    });
    
    // Get space and environment
    const space = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master'); // or your environment name
    
    // Create entry
    const entry = await environment.createEntry('productReview', {
      fields: {
        name: { 'en-US': name },
        review: { 'en-US': review },
        rating: { 'en-US': parseInt(rating) || 5 },
        productId: { 'en-US': productId },
        date: { 'en-US': new Date().toISOString() },
        isApproved: { 'en-US': false } // Start as unapproved
      }
    });
    
    // Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Review submitted and pending approval',
      id: entry.sys.id
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}