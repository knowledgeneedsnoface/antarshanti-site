"use client";

import React, { Component, ReactNode } from 'react';
import { Analytics } from '../lib/Analytics';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error Boundary Component
 * Catches errors in child components and shows fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught error:', error, errorInfo);

        // Track error in analytics
        Analytics.track('error_caught', {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack
        });

        // Call custom error handler if provided
        this.props.onError?.(error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0A0502] to-[#000000] px-6">
                    <div className="max-w-md text-center">
                        <div className="mb-6">
                            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h2 className="text-xl text-white/90 font-serif mb-2">Something went wrong</h2>
                            <p className="text-white/50 text-sm mb-6">
                                The ritual encountered an unexpected error. Please try again.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={this.handleReset}
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 text-white/50 hover:text-white/70 text-sm transition-colors"
                            >
                                Reload Page
                            </button>
                        </div>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-6 text-left">
                                <summary className="text-white/40 text-xs cursor-pointer">Error Details</summary>
                                <pre className="mt-2 p-4 bg-black/50 rounded text-red-400 text-xs overflow-auto">
                                    {this.state.error.message}
                                    {'\n\n'}
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * Static Fallback Component
 * Used when Lottie or other dynamic content fails to load
 */
export function StaticFallback({ type = 'animation' }: { type?: 'animation' | 'audio' | 'general' }) {
    const messages = {
        animation: 'Animation unavailable',
        audio: 'Audio unavailable',
        general: 'Content unavailable'
    };

    return (
        <div className="flex items-center justify-center p-8">
            <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white/40 rounded-full animate-spin" />
                </div>
                <p className="text-white/40 text-sm">{messages[type]}</p>
            </div>
        </div>
    );
}
