"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';

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
  const [step, setStep] = useState('selection');
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [memory, setMemory] = useState({ keywords: [] as string[], context: '' });
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const loadMemory = async () => {
      try {
        const result = await localStorage.getItem('twin-memory');
        if (result) {
          setMemory(JSON.parse(result));
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
      await localStorage.setItem('twin-memory', JSON.stringify(updatedMemory));
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

      console.log('=== Sending Request to Twin Chat API ===');

      const response = await fetch('/api/twin-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messages.slice(-10).map(m => ({ role: m.role, content: m.content })).concat([
            { role: 'user', content: currentInput }
          ]),
          systemPrompt,
          memoryContext
        })
      });

      console.log('API Response status:', response.status);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      if (data.content) {
        const aiMessage = {
          role: 'assistant',
          content: data.content
        };
        setMessages(prev => [...prev, aiMessage]);
        await updateMemory(currentInput, data.content);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: any) {
      console.error('=== Error Details ===');
      console.error('Error:', error);
      console.error('Message:', error.message);
      setError(error.message);

      let userMessage = 'I apologize, but I encountered an issue. ';
      if (error.message.includes('Rate limit')) {
        userMessage += 'The AI service is currently experiencing high demand. Please wait a moment and try again.';
      } else if (error.message.includes('Authentication')) {
        userMessage += 'There was an authentication issue with the AI service.';
      } else {
        userMessage += error.message;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: userMessage
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
          <div className="text-center mb-8 relative">
            {/* Step Indicator */}
            <div className="absolute top-0 right-0 lg:right-[-60px] hidden md:block text-xs font-semibold text-orange-400 uppercase tracking-widest">
              Step 1 of 2
            </div>

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

          {/* New Pre-Sell CTA if already tried */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4 text-sm">Mind feels clearer?</p>
            <a href="/get-started" className="inline-flex items-center gap-2 bg-orange-900 text-white px-8 py-3 rounded-full hover:bg-orange-800 transition-colors">
              Get your starter ritual <Sparkles className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
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

          <div className="flex items-center gap-4">
            <a href="/get-started" className="hidden md:flex items-center gap-2 text-sm font-medium text-orange-900 bg-orange-100 px-4 py-2 rounded-full hover:bg-orange-200 transition-colors">
              Get Ritual Kit <Sparkles className="w-3 h-3" />
            </a>
            <button
              onClick={() => setStep('selection')}
              className="text-sm text-orange-700 hover:text-orange-900 underline"
            >
              Change Path
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-lg rounded-2xl p-4 ${msg.role === 'user'
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
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-t border-red-300 px-4 py-2">
          <div className="max-w-4xl mx-auto text-sm text-red-800">
            ⚠️ Error: {error}
          </div>
        </div>
      )}

      {memory.keywords.length > 0 && (
        <div className="bg-orange-100 border-t border-orange-200 px-4 py-2">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 text-sm text-orange-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Memory active: {memory.keywords.length} concepts learned</span>
            </div>
            {/* Mobile CTA */}
            <a href="/get-started" className="md:hidden text-xs font-bold underline">
              Get Ritual Kit →
            </a>
          </div>
        </div>
      )}

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
