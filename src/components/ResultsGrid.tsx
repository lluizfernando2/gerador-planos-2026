import React, { useState } from 'react';
import ResultCard, { CurriculumCardItem } from './ResultCard';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import { ChevronDown, Sparkles } from 'lucide-react';

interface ResultsGridProps {
  items: CurriculumCardItem[];
  isLoading?: boolean;
  favorites: string[];
  onToggleFavorite: (item: CurriculumCardItem) => void;
  onViewDetails: (item: CurriculumCardItem) => void;
  onCopy: (item: CurriculumCardItem) => void;
  onClearFilters?: () => void;
}

export default function ResultsGrid({
  items,
  isLoading = false,
  favorites,
  onToggleFavorite,
  onViewDetails,
  onCopy,
  onClearFilters
}: ResultsGridProps) {
  const [visibleCount, setVisibleCount] = useState<number>(18);

  if (isLoading) {
    return <LoadingState message="Buscando informações no currículo..." />;
  }

  if (!items || items.length === 0) {
    return (
      <EmptyState
        title="Nenhum resultado encontrado"
        description="Nenhum resultado encontrado. Tente alterar os filtros ou usar outra palavra-chave."
        onClearFilters={onClearFilters}
      />
    );
  }

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <section className="w-full my-6" aria-label="Resultados da consulta curricular">
      {/* Results Header Info */}
      <div className="flex items-center justify-between mb-6" aria-live="polite">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
            Exibindo {visibleItems.length} de {items.length} itens encontrados
          </span>
        </div>

        {items.length > visibleCount && (
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
            Role para ver mais ou clique em carregar mais
          </span>
        )}
      </div>

      {/* Grid of Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleItems.map((item) => {
          const isFav = favorites.includes(item.id);
          return (
            <ResultCard
              key={item.id}
              item={item}
              isFavorite={isFav}
              onToggleFavorite={onToggleFavorite}
              onViewDetails={onViewDetails}
              onCopy={onCopy}
            />
          );
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 18)}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <ChevronDown className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span>Carregar mais resultados ({items.length - visibleCount} restantes)</span>
          </button>
        </div>
      )}
    </section>
  );
}
