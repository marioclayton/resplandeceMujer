import { NextResponse } from 'next/server';
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Fetch product from Contentful
    const product = await client.getEntry(productId);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if it's a free PDF product
    const { isFreePdf, pdfFile } = product.fields;

    if (!isFreePdf) {
      return NextResponse.json({ error: 'Product is not free' }, { status: 403 });
    }

    if (!pdfFile) {
      return NextResponse.json({ error: 'PDF file not found' }, { status: 404 });
    }

    // Optional: Log download analytics here
    console.log(`PDF downloaded: ${product.fields.productName} - ${new Date().toISOString()}`);

    // Return the file URL for download
    const fileUrl = `https:${pdfFile.fields.file.url}`;
    const fileName = pdfFile.fields.file.fileName || `${product.fields.productName}.pdf`;

    // Fetch the file and return it as a download
    const fileResponse = await fetch(fileUrl);
    
    if (!fileResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
    }

    const fileBuffer = await fileResponse.arrayBuffer();

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}