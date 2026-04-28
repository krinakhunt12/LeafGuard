import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

import type { FallbackProps } from 'react-error-boundary';

export const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const isDev = (import.meta as any).env?.DEV;
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-600 mb-6">
          <AlertTriangle size={32} />
        </div>
        
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Something went wrong</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          {errorMessage || "An unexpected error occurred. We've been notified and are working to fix it."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors gap-2"
          >
            <RotateCcw size={18} />
            Retry
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition-colors gap-2"
          >
            <Home size={18} />
            Go back to home
          </a>
        </div>

        {isDev && error instanceof Error && (
          <div className="mt-8 text-left p-4 bg-slate-100 rounded border border-slate-200 overflow-auto max-h-40">
            <p className="text-xs font-mono text-slate-500 whitespace-pre-wrap">
              {error.stack}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
