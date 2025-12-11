import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || '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';

export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt, memoryContext } = await request.json();

    console.log('=== Server-side API Request ===');
    console.log('Model: meta-llama/llama-3.2-3b-instruct:free');
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': request.headers.get('origin') || 'https://antarshanti-site.vercel.app',
        'X-Title': 'AntarShanti Digital Twin'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [
          { role: 'system', content: systemPrompt + memoryContext },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    console.log('OpenRouter Response Status:', response.status);
    
    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter Error:', data);
      
      let errorMsg = 'Unknown error';
      if (data.error) {
        errorMsg = data.error.message || data.error.code || JSON.stringify(data.error);
      }

      // Specific error handling
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit reached. The free tier has limited requests. Please wait a moment and try again.' },
          { status: 429 }
        );
      } else if (response.status === 401) {
        return NextResponse.json(
          { error: 'Authentication failed. The API key may be invalid or expired.' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: errorMsg },
        { status: response.status }
      );
    }

    if (data.choices && data.choices[0] && data.choices[0].message) {
      return NextResponse.json({
        content: data.choices[0].message.content
      });
    }

    return NextResponse.json(
      { error: 'Invalid response format from AI provider' },
      { status: 500 }
    );

  } catch (error: any) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
