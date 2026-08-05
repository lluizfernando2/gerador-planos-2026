import React from 'react';
import { SearchX, RotateCcw, SlidersHorizontal } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onClearFilters?: () => void;
  isError?: boolean;
  onRetry?: () => void;
}

export default function EmptyState({
  title = 'Nenhum resultado encontrado',
  description = 'Nenhum resultado encontrado. Tente alterar os filtros ou usar outra palavra-chave.',
  onClearFilters,
  isError = false,
  onRetry
}: EmptyStateProps) {
  return (
    <div
      className="w-full bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 sm:p-14 text-center shadow-xs my-6 transition-colors"
      role="region"
      aria-label="Sem resultados"
    >
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center mx-auto mb-5 text-slate-400 dark:text-slate-500">
          <SearchX className="w-8 h-8 sm:w-10 sm:h-10 text-slate-500 dark:text-slate-400" aria-hidden="true" />
        </div>

        <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Limpar todos os filtros</span>
            </button>
          )}

          {isError && onRetry && (
            <button
              onClick={onRetry}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm rounded-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <span>Tentar novamente</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
