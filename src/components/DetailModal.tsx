import React, { useEffect, useRef } from 'react';
import { X, Copy, Download, Share2, BookOpen, Sparkles, Check, Code, Layers, GraduationCap, Award, HelpCircle } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { CurriculumCardItem } from './ResultCard';

interface DetailModalProps {
  item: CurriculumCardItem | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (item: CurriculumCardItem) => void;
  onCopy: (item: CurriculumCardItem) => void;
  onExport?: (item: CurriculumCardItem) => void;
}

export default function DetailModal({
  item,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onCopy,
  onExport
}: DetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap & ESC key close listener for WCAG 2.2
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const code = item.habilidade?.match(/([A-Z]{2}\d{2}[A-Z]{2}\d{2,3}|EM\d{2}[A-Z]{3}\d{2})/i)?.[0] || item.aula;
  const subjectName = item.disciplina || 'Componente Curricular';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden text-left transition-colors animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/80">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {subjectName}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {item.ano}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {item.bimestre}
              </span>
              {code && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {code}
                </span>
              )}
            </div>

            <h2
              id="detail-modal-title"
              className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight pt-1"
            >
              {item.titulo || item.habilidade || 'Detalhes da Habilidade Curricular'}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            type="button"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 shrink-0"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          
          {/* Section 1: Habilidade Curricular */}
          {item.habilidade && (
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Habilidade Priorizada (SEDUC-SP / BNCC)
              </h3>
              <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed">
                {item.habilidade}
              </p>
            </div>
          )}

          {/* Section 2: Aprendizagem Essencial */}
          {item.aprendizagem && (
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Aprendizagem Essencial
              </h3>
              <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed">
                {item.aprendizagem}
              </p>
            </div>
          )}

          {/* Section 3: Objeto de Conhecimento / Conteúdo */}
          {(item.conteudo || item.objetivos) && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-500" />
                Objeto de Conhecimento & Conteúdo Temático
              </h3>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed">
                {item.conteudo || item.objetivos}
              </div>
            </div>
          )}

          {/* Section 4: Conhecimentos Prévios & Sugestões Metodológicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Conhecimentos Prévios
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Recuperação de conceitos anteriores alinhados ao plano de reposição pedagógica SEDUC-SP 2026.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Sugestões de Atividades & Metodologias
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Resolução de problemas, rotação por estações, metodologias ativas e uso do Material Digital oficial.
              </p>
            </div>
          </div>

          {/* Section 5: Instrumentos de Avaliação & Prova Paulista */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Avaliação & Matriz Externa (Prova Paulista / SARESP)
            </h4>
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              Esta habilidade possui incidência direta nas avaliações formativas bimestrais e no banco de dados de questões diagnósticas.
            </p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80">
          <div className="flex items-center gap-2">
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={() => onToggleFavorite(item)}
              size="lg"
              showText={true}
            />

            <button
              onClick={() => onCopy(item)}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Copy className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <span>Copiar Conteúdo</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onExport && (
              <button
                onClick={() => onExport(item)}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Exportar</span>
              </button>
            )}

            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-semibold text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
