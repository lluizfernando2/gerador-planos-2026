import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = 'Buscando informações no currículo...'
}: LoadingStateProps) {
  return (
    <div className="w-full py-12 text-center" role="status" aria-live="polite">
      <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-950/60 rounded-full text-blue-600 dark:text-blue-400 mb-4 animate-spin">
        <Loader2 className="w-8 h-8" aria-hidden="true" />
      </div>
      <p className="text-base font-medium text-slate-700 dark:text-slate-300 mb-6">
        {message}
      </p>

      {/* Skeleton Card Grids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-4 animate-pulse"
          >
            <div className="flex justify-between items-center">
              <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
            </div>
            <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
