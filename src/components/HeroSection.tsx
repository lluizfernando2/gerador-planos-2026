import React from 'react';
import { Search, BookOpen, Sparkles, CheckCircle2, ArrowRight, GraduationCap, ShieldCheck, Download, Layers } from 'lucide-react';
import SearchBar from './SearchBar';

interface HeroSectionProps {
  searchValue: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: () => void;
  onQuickFilter: (subjectOrGrade: string) => void;
  onOpenGuide: () => void;
}

export default function HeroSection({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onQuickFilter,
  onOpenGuide
}: HeroSectionProps) {
  const quickFilters = [
    { label: 'Matemática', value: 'Matemática' },
    { label: 'Língua Portuguesa', value: 'Língua Portuguesa' },
    { label: 'Ciências', value: 'Ciências' },
    { label: '6º Ano', value: '6º Ano' },
    { label: '1ª Série', value: '1ª Série' },
    { label: 'Ensino Técnico', value: 'Técnico' },
    { label: 'Inova Educação', value: 'Parte Diversificada' }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50 to-slate-100/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900 border-b border-slate-200/60 dark:border-slate-800 pt-8 pb-12 sm:pt-14 sm:pb-20">
      
      {/* Decorative backdrop graphics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 dark:opacity-20 overflow-hidden">
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-blue-300/30 dark:bg-blue-600/20 blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-teal-300/30 dark:bg-teal-600/20 blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Top Tag/Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/60 text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-in fade-in duration-500">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <span>Matriz Oficial SEDUC-SP 2026 • Anos Finais, Ensino Médio & Técnico</span>
        </div>

        {/* Hero Title & Subtitle */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-none mb-4 sm:mb-6">
          Currículo Priorizado
        </h1>
        
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8 sm:mb-10">
          Encontre rapidamente habilidades, aprendizagens essenciais, objetos de conhecimento e sugestões pedagógicas para apoiar o planejamento das aulas.
        </p>

        {/* Hero Search Bar */}
        <div className="max-w-3xl mx-auto mb-6">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            onSearch={onSearchSubmit}
            autoFocus={false}
          />
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline">
            Filtros rápidos:
          </span>
          {quickFilters.map((chip) => (
            <button
              key={chip.label}
              onClick={() => onQuickFilter(chip.value)}
              className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onSearchSubmit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base rounded-xl transition-all shadow-md shadow-blue-600/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <Search className="w-5 h-5" aria-hidden="true" />
            <span>Buscar no currículo</span>
          </button>

          <button
            onClick={onOpenGuide}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 font-semibold text-base rounded-xl transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>Ver guia de uso</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 sm:mt-16 text-left max-w-4xl mx-auto pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">100% Alinhado</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Diretrizes SEDUC 2026</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Todas as Etapas</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Fundamental & Médio</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Ensino Técnico</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Administração & Mais</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Gerador de Planos</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Exportação em Word</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
