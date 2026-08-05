import React from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export default function FavoriteButton({
  isFavorite,
  onToggle,
  size = 'md',
  className = '',
  showText = false
}: FavoriteButtonProps) {
  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'px-3 py-2 text-sm font-medium'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <button
      onClick={onToggle}
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
        isFavorite
          ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/50'
          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-rose-600 dark:hover:text-rose-400'
      } ${sizeClasses[size]} ${className}`}
      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      aria-pressed={isFavorite}
      title={isFavorite ? 'Salvo nos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart
        className={`${iconSizes[size]} transition-transform duration-200 ${
          isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400 dark:text-slate-400'
        }`}
        aria-hidden="true"
      />
      {showText && <span>{isFavorite ? 'Favoritado' : 'Favoritar'}</span>}
    </button>
  );
}
