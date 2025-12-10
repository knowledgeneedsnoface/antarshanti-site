"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';

// Hardcode the API key for now since env vars might not be loading
const OPENROUTER_API_KEY = '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';

const PATHS = {
  peace: {
    emoji: '🕊️',
    name: 'Path of Peace',
    description: 'Amplifies calmness and emotional balance',
    systemPrompt: 'You are a gentle spiritual guide focused on inner peace, mindfulness, and tranquility. Help seekers find calm and emotional balance through your wisdom. Keep responses concise and meaningful.'
  },
  strength: {
    emoji: '💪',
    name: 'Path of Strength',
    description: 'Enhances discipline and emotional resilience',
    systemPrompt: 'You are a warrior-spirited guide focused on discipline, resilience, and inner strength. Empower seekers to face challenges with courage. Keep responses concise and meaningful.'
  },
  devotion: {
    emoji: '🙏',
    name: 'Path of Devotion',
    description: 'Boosts discipline and energy',
    systemPrompt: 'You are a devoted spiritual guide focused on dedication, commitment, and spiritual energy. Guide practitioners in their devoted practice. Keep responses concise and meaningful.'
  },
  light: {
    emoji: '✨',
    name: 'Path of Light',
    description: 'Increases calmness and energy',
    systemPrompt: 'You are an illuminating guide focused on clarity, insight, and spiritual enlightenment. Help seekers find their inner light. Keep responses concise and meaningful.'
  }
};

export default function SpiritualTwin() {
  const [step, setStep] = useState('selection'); // 'selection' or 'chat'
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [memory, setMemory] = useState({ keywords: [] as string[], context: '' });
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Load memory from storage
    const loadMemory = async () => {
      try {
        const result = await (window as any).storage.get('twin-memory');
        if (result && result.value) {
          setMemory(JSON.parse(result.value));
        }
      } catch (error) {
        console.log('No previous memory found');
      }
    };
    loadMemory();
  }, []);

  const extractKeywords = (text: string) => {
    const stopWords = ['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for', 'of', 'as', 'by', 'i', 'me', 'my', 'myself', 'we', 'you', 'he', 'she', 'it', 'they', 'what', 'how', 'when', 'where', 'why', 'am', 'are', 'was', 'were', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.includes(word));
    
    return [...new Set(words)];
  };

  const updateMemory = async (userMessage: string, aiResponse: string) => {
    const newKeywords = [
      ...extractKeywords(userMessage),
      ...extractKeywords(aiResponse)
    ];
    
    const updatedMemory = {
      keywords: [...new Set([...memory.keywords, ...newKeywords])].slice(-50),
      context: `Previous topics: ${[...new Set([...memory.keywords, ...newKeywords])].slice(-20).join(', ')}`
    };
    
    setMemory(updatedMemory);
    
    try {
      await (window as any).storage.set('twin-memory', JSON.stringify(updatedMemory));
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  };

  const handlePathSelect = (pathKey: string) => {
    setSelectedPath(pathKey);
    setTimeout(() => {
      setStep('chat');
      setMessages([
        {
          role: 'assistant',
          content: `Welcome to the ${PATHS[pathKey as keyof typeof PATHS].name}. I am your spiritual companion on this journey. ${memory.keywords.length > 0 ? `I remember our conversations about: ${memory.keywords.slice(-5).join(', ')}. ` : ''}How may I guide you today?`
        }
      ]);
    }, 500);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading || !selectedPath) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const systemPrompt = PATHS[selectedPath as keyof typeof PATHS].systemPrompt;
      const memoryContext = memory.context ? `\n\nContext from previous conversations: ${memory.context}` : '';
      
      console.log('Sending request to OpenRouter...');
      console.log('API Key (first 20 chars):', OPENROUTER_API_KEY.substring(0, 20));
      console.log('Using site URL:', window.location.origin);
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AntarShanti Digital Twin'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-3b-instruct:free',
          messages: [
            { role: 'system', content: systemPrompt + memoryContext },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: currentInput }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Full response:', JSON.stringify(data, null, 2));
      
      if (!response.ok) {
        const errorMsg = data.error?.message || `API Error (${response.status}): ${JSON.stringify(data)}`;
        throw new Error(errorMsg);
      }
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const aiMessage = {
          role: 'assistant',
          content: data.choices[0].message.content
        };
        setMessages(prev => [...prev, aiMessage]);
        await updateMemory(currentInput, data.choices[0].message.content);
      } else {
        throw new Error(`Invalid response format: ${JSON.stringify(data)}`);
      }
    } catch (error: any) {
      console.error('Full error:', error);
      setError(error.message);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I apologize, but I encountered an issue: ${error.message}. Please check the browser console for more details.`
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (step === 'selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-4xl">🕉️</span>
              <h1 className="text-4xl font-bold text-orange-900">AntarShanti</h1>
            </div>
            <p className="text-lg text-gray-700">Your spiritual companion on the journey to inner peace</p>
            {memory.keywords.length > 0 && (
              <p className="text-sm text-orange-700 mt-2">
                ✨ I remember our journey together
              </p>
            )}
          </div>

          <div className="bg-gradient-to-r from-orange-200 to-amber-200 p-1 rounded-2xl mb-8">
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-center text-orange-900 mb-8">
                Choose your spiritual path
              </h2>

              <div className="grid grid-cols-2 gap-6">
                {Object.entries(PATHS).map(([key, path]) => (
                  <button
                    key={key}
                    onClick={() => handlePathSelect(key)}
                    className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl p-6 text-left hover:border-orange-500 hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer"
                  >
                    <div className="text-5xl mb-4">{path.emoji}</div>
                    <h3 className="text-xl font-semibold text-orange-900 mb-2">{path.name}</h3>
                    <p className="text-gray-700 text-sm">{path.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white border-b-2 border-orange-200 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedPath ? PATHS[selectedPath as keyof typeof PATHS].emoji : ''}</span>
            <div>
              <h2 className="text-xl font-bold text-orange-900">
                {selectedPath ? PATHS[selectedPath as keyof typeof PATHS].name : ''}
              </h2>
              <p className="text-sm text-gray-600">
                {selectedPath ? PATHS[selectedPath as keyof typeof PATHS].description : ''}
              </p>
            </div>
          </div>
          <button
            onClick={() => setStep('selection')}
            className="text-sm text-orange-700 hover:text-orange-900 underline"
          >
            Change Path
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-lg rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white border-2 border-orange-200 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-orange-200 rounded-2xl p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-100 border-t border-red-300 px-4 py-2">
          <div className="max-w-4xl mx-auto text-sm text-red-800">
            ⚠️ Error: {error}
          </div>
        </div>
      )}

      {/* Memory Indicator */}
      {memory.keywords.length > 0 && (
        <div className="bg-orange-100 border-t border-orange-200 px-4 py-2">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-orange-800">
            <Sparkles className="w-4 h-4" />
            <span>Memory active: {memory.keywords.length} concepts learned</span>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t-2 border-orange-200 p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share your thoughts..."
            className="flex-1 border-2 border-orange-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-orange-500 text-white rounded-xl px-6 py-3 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
