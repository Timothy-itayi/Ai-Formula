// app/api/test-model/route.js
import { NextResponse } from 'next/server';
import { deepSeekService } from '@/lib/ai/modelService';

// We need to explicitly export the POST method
export async function POST(request) {
  try {
    const { query } = await request.json();
    
    // Log the incoming request for debugging
    console.log('Test endpoint received query:', query);

    const response = await deepSeekService.queryModel(query);
    console.log('Model response:', response);

    return NextResponse.json({
      status: 'success',
      response: response,
      message: 'Model is working correctly'
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: error.message 
      },
      { status: 500 }
    );
  }
}