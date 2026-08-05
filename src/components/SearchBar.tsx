import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch?: (val: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Buscar por palavra-chave, código (ex: EF06MA03) ou tema...',
  className = '',
  autoFocus = false
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement !== inputRef.current &&
        !(document.activeElement instanceof HTMLInputElement) &&
        !(document.activeElement instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`} role="search">
      <label htmlFor="main-search-input" className="sr-only">
        Buscar por palavra-chave, código de habilidade ou conteúdo
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-400 dark:text-slate-500">
          <Search className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </div>
        <input
          ref={inputRef}
          id="main-search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 sm:pl-14 pr-24 py-3.5 sm:py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent text-base sm:text-lg transition-all"
        />
        <div className="absolute right-3 flex items-center gap-1.5">
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange('');
                inputRef.current?.focus();
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              aria-label="Limpar campo de busca"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            className="hidden sm:inline-flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}
