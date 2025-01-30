// app/api/query/route.js
import { NextResponse } from 'next/server';
import { deepSeekService } from '@/lib/ai/modelService';

export async function POST(request) {
  try {
    // First validate the model environment
    const isValid = await deepSeekService.validateEnvironment();
    if (!isValid) {
      throw new Error('Model environment is not properly configured');
    }

    const { query } = await request.json();
    
    if (!query?.trim()) {
      return NextResponse.json(
        { error: 'Query cannot be empty' },
        { status: 400 }
      );
    }

    console.log('Attempting to process query:', query);
    const modelResponse = await deepSeekService.queryModel(query);

    return NextResponse.json({
      answer: modelResponse.answer,
      timestamp: new Date().toISOString(),
      metadata: {
        model: 'DeepSeek-1.5B',
        processedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Detailed error in query processing:', {
      message: error.message,
      stack: error.stack
    });

    return NextResponse.json(
      { 
        error: 'Failed to process your query. Please try again.',
        details: error.message
      },
      { status: 500 }
    );
  }
}