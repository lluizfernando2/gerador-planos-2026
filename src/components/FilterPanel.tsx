import React, { useState } from 'react';
import { Filter, RotateCcw, ChevronDown, ChevronUp, Check, SlidersHorizontal, Layers, BookOpen, Calendar, Tag } from 'lucide-react';

export interface FilterState {
  keyword: string;
  etapa: string; // 'Todos' | 'Anos Finais' | 'Ensino Médio' | 'Parte Diversificada' | 'Ensino Técnico' | 'Itinerários Formativos'
  grade: string; // 'Todos' | '6º Ano' | '7º Ano' | '8º Ano' | '9º Ano' | '1ª Série' | '2ª Série' | '3ª Série'
  subject: string;
  bimestre: string; // 'Todos' | '1º Bimestre' | '2º Bimestre' | '3º Bimestre' | '4º Bimestre'
  contentType: string; // 'Todos' | 'Habilidade' | 'Aprendizagem Essencial' | 'Objeto de Conhecimento' | 'Conhecimento Prévio' | 'Avaliação' | 'Sugestão de Atividade'
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onApplyFilters?: () => void;
  onClearFilters: () => void;
  availableSubjects: string[];
  totalResultsCount?: number;
}

export default function FilterPanel({
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
  availableSubjects,
  totalResultsCount
}: FilterPanelProps) {
  const [isMobileAccordionOpen, setIsMobileAccordionOpen] = useState(false);

  const updateField = (key: keyof FilterState, val: string) => {
    onFilterChange({
      ...filters,
      [key]: val
    });
  };

  const hasActiveFilters =
    filters.keyword !== '' ||
    filters.etapa !== 'Todos' ||
    filters.grade !== 'Todos' ||
    filters.subject !== 'Todos' ||
    filters.bimestre !== 'Todos' ||
    filters.contentType !== 'Todos';

  const contentTypes = [
    'Todos',
    'Habilidade',
    'Aprendizagem Essencial',
    'Objeto de Conhecimento',
    'Conhecimento Prévio',
    'Avaliação',
    'Sugestão de Atividade'
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs mb-8 overflow-hidden transition-colors">
      
      {/* Mobile Accordion Header Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/80">
        <button
          type="button"
          onClick={() => setIsMobileAccordionOpen(!isMobileAccordionOpen)}
          className="flex items-center gap-2.5 font-semibold text-slate-800 dark:text-slate-100 text-base cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
          aria-expanded={isMobileAccordionOpen}
          aria-controls="mobile-filter-panel-content"
        >
          <SlidersHorizontal className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <span>Filtros do Currículo</span>
          {hasActiveFilters && (
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" aria-hidden="true" />
          )}
        </button>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs font-semibold text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 cursor-pointer"
            >
              Limpar
            </button>
          )}
          <button
            onClick={() => setIsMobileAccordionOpen(!isMobileAccordionOpen)}
            className="p-1 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            aria-label={isMobileAccordionOpen ? 'Recolher painel de filtros' : 'Expandir painel de filtros'}
          >
            {isMobileAccordionOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Filter Content (Visible always on Desktop, accordion on Mobile) */}
      <div
        id="mobile-filter-panel-content"
        className={`p-4 sm:p-6 space-y-5 ${
          isMobileAccordionOpen ? 'block' : 'hidden md:block'
        }`}
      >
        {/* Panel Header */}
        <div className="hidden md:flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/80">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Filtros de Pesquisa Curricular
            </h2>
            {typeof totalResultsCount === 'number' && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {totalResultsCount} itens
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg p-1"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Etapa de Ensino */}
          <div>
            <label
              htmlFor="filter-etapa"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Etapa de Ensino
            </label>
            <select
              id="filter-etapa"
              value={filters.etapa}
              onChange={(e) => updateField('etapa', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 text-sm font-medium transition-colors"
            >
              <option value="Todos">Todas as Etapas</option>
              <option value="Anos Finais">Ensino Fundamental (6º a 9º)</option>
              <option value="Ensino Médio">Ensino Médio (1ª a 3ª Série)</option>
              <option value="Ensino Técnico">Ensino Técnico Profissional</option>
              <option value="Parte Diversificada">Parte Diversificada / Inova</option>
              <option value="Itinerários Formativos">Itinerários Formativos</option>
            </select>
          </div>

          {/* 2. Ano / Série */}
          <div>
            <label
              htmlFor="filter-grade"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Ano / Série
            </label>
            <select
              id="filter-grade"
              value={filters.grade}
              onChange={(e) => updateField('grade', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 text-sm font-medium transition-colors"
            >
              <option value="Todos">Todos os Anos / Séries</option>
              <option value="6º Ano">6º Ano (EF)</option>
              <option value="7º Ano">7º Ano (EF)</option>
              <option value="8º Ano">8º Ano (EF)</option>
              <option value="9º Ano">9º Ano (EF)</option>
              <option value="1ª Série">1ª Série (EM)</option>
              <option value="2ª Série">2ª Série (EM)</option>
              <option value="3ª Série">3ª Série (EM)</option>
            </select>
          </div>

          {/* 3. Componente Curricular */}
          <div>
            <label
              htmlFor="filter-subject"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Componente Curricular
            </label>
            <select
              id="filter-subject"
              value={filters.subject}
              onChange={(e) => updateField('subject', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 text-sm font-medium transition-colors"
            >
              <option value="Todos">Todos os Componentes</option>
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Bimestre */}
          <div>
            <label
              htmlFor="filter-bimestre"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Bimestre
            </label>
            <select
              id="filter-bimestre"
              value={filters.bimestre}
              onChange={(e) => updateField('bimestre', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 text-sm font-medium transition-colors"
            >
              <option value="Todos">Todos os Bimestres</option>
              <option value="4º Bimestre">4º Bimestre</option>
            </select>
          </div>

        </div>

        {/* Tipo de Conteúdo Quick Selector Chips */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Tipo de Conteúdo Curricular
          </span>
          <div className="flex flex-wrap gap-2">
            {contentTypes.map((type) => {
              const isSelected = filters.contentType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateField('contentType', type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {type === 'Todos' ? 'Todos os Tipos' : type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Apply & Clear Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/80">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              Limpar filtros
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (onApplyFilters) onApplyFilters();
              setIsMobileAccordionOpen(false);
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Aplicar filtros
          </button>
        </div>

      </div>
    </div>
  );
}
