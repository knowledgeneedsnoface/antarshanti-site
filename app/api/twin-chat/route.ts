import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Using the same API key as Gann Baba chat
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';

export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt, memoryContext } = await request.json();

    console.log('=== Server-side API Request ===');
    console.log('Model: tngtech/deepseek-r1t2-chimera:free');
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://antarshanti-site.vercel.app',
        'X-Title': 'AntarShanti Digital Twin'
      },
      body: JSON.stringify({
        model: 'tngtech/deepseek-r1t2-chimera:free',
        messages: [
          { role: 'system', content: systemPrompt + memoryContext },
          ...messages
        ],

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
