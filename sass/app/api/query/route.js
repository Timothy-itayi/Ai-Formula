// app/api/query/route.js
import { deepSeekService } from '@/lib/ai/modelService';

export async function POST(request) {
  try {
    // Validate the model environment
    const isValid = await deepSeekService.validateEnvironment();
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Model environment is not properly configured' }),
        { status: 500 }
      );
    }

    const { query } = await request.json();
    
    if (!query?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Query cannot be empty' }),
        { status: 400 }
      );
    }

    // Create a ReadableStream to stream the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log('Processing query:', query);
          
          // Get the model response
          const modelResponse = await deepSeekService.queryModel(query);
          
          // Convert the response to a Uint8Array for streaming
          const encoder = new TextEncoder();
          
          // Stream the response in chunks
          if (modelResponse && modelResponse.answer) {
            const chunk = encoder.encode(modelResponse.answer);
            controller.enqueue(chunk);
          }
          
          // Close the stream
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    // Return the streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache, no-transform',
      },
    });

  } catch (error) {
    console.error('Error in query processing:', {
      message: error.message,
      stack: error.stack
    });

    return new Response(
      JSON.stringify({ 
        error: 'Failed to process your query. Please try again.',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Set Response size limit to unlimited for streaming
export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '1mb'
    }
  }
};