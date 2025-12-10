'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error occurred:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. The page encountered an unexpected error.
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
          >
            Try Again
          </button>
          <a
            href="/"
            className="block w-full px-6 py-3 border-2 border-amber-500 text-amber-600 font-medium rounded-xl hover:bg-amber-50 transition-all"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
