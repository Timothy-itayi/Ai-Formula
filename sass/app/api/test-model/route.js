// app/api/test-model/route.js
import { NextResponse } from 'next/server';
import { deepSeekService } from '@/lib/ai/modelService';

export async function GET() {
  try {
    // Test the model with a simple F1-related query
    const testQuery = "What are the key components of a Formula 1 car?";
    
    console.log('Initiating model test...');
    const response = await deepSeekService.queryModel(testQuery);
    
    return NextResponse.json({
      status: 'success',
      response: response,
      message: 'Model connection successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Model test failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}