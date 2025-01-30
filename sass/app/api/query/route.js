// app/api/query/route.js
import { NextResponse } from 'next/server';
import { deepSeekService } from '@/lib/ai/modelService';

export async function POST(request) {
  try {
    const { query } = await request.json();
    
    // Input validation
    if (!query?.trim()) {
      return NextResponse.json(
        { error: 'Query cannot be empty' },
        { status: 400 }
      );
    }

    console.log('Processing query:', query); // Helpful for debugging

    // Process query through DeepSeek model
    const modelResponse = await deepSeekService.queryModel(query);

    // Return formatted response
    return NextResponse.json({
      answer: modelResponse.answer,
      timestamp: new Date().toISOString(),
      metadata: {
        model: 'DeepSeek-1.5B',
        processedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error processing query:', error);
    
    // Return user-friendly error message
    return NextResponse.json(
      { 
        error: 'Failed to process your query. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}