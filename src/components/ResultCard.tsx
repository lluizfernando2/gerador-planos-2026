import React from 'react';
import { BookOpen, Copy, Eye, Check, Tag, Sparkles, Code, ArrowUpRight } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

export interface CurriculumCardItem {
  id: string;
  ano: string;
  bimestre: string;
  aula?: string;
  titulo: string;
  conteudo?: string;
  objetivos?: string;
  habilidade?: string;
  aprendizagem?: string;
  disciplina?: string;
  eixo?: string;
  raw?: any;
}

interface ResultCardProps {
  key?: React.Key;
  item: CurriculumCardItem;
  isFavorite: boolean;
  onToggleFavorite: (item: CurriculumCardItem) => void;
  onViewDetails: (item: CurriculumCardItem) => void;
  onCopy: (item: CurriculumCardItem) => void;
}

export default function ResultCard({
  item,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onCopy
}: ResultCardProps) {
  // Extract skill code if present (e.g. EF06MA03, EM13LGP01, or Aula number)
  const extractCode = (): string | null => {
    const text = `${item.habilidade || ''} ${item.titulo || ''} ${item.aula || ''}`;
    const codeMatch = text.match(/([A-Z]{2}\d{2}[A-Z]{2}\d{2,3}|EM\d{2}[A-Z]{3}\d{2}|AULA\s*\d+)/i);
    if (codeMatch) return codeMatch[1].toUpperCase();
    if (item.aula) return item.aula;
    return null;
  };

  const code = extractCode();
  const subjectName = item.disciplina || 'Componente Curricular';

  // Generate tags based on content
  const tags: string[] = [];
  if (item.habilidade) tags.push('Habilidade');
  if (item.aprendizagem) tags.push('Aprendizagem Essencial');
  if (item.objetivos) tags.push('Objeto de Conhecimento');
  if (item.eixo) tags.push(item.eixo);
  if (tags.length === 0) tags.push('Currículo Priorizado');

  return (
    <article
      className="group flex flex-col justify-between bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 p-5 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 text-left relative"
      aria-labelledby={`card-title-${item.id}`}
    >
      <div>
        {/* Card Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80">
              {subjectName}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300">
              {item.ano}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300">
              {item.bimestre}
            </span>
          </div>

          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(item)}
            size="sm"
          />
        </div>

        {/* Code Badge if present */}
        {code && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
            <Code className="w-3 h-3 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>{code}</span>
          </div>
        )}

        {/* Card Title / Description */}
        <h3
          id={`card-title-${item.id}`}
          className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 leading-snug"
        >
          {item.titulo || item.habilidade || 'Conteúdo Curricular'}
        </h3>

        {/* Card Snippet Body */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 leading-relaxed">
          {item.habilidade || item.conteudo || item.objetivos || 'Acesse os detalhes para visualizar o planejamento completo desta unidade.'}
        </p>

        {/* Visual Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800"
            >
              <Tag className="w-2.5 h-2.5 text-slate-400" aria-hidden="true" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/80">
        <button
          onClick={() => onCopy(item)}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          title="Copiar texto da habilidade"
        >
          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Copiar</span>
        </button>

        <button
          onClick={() => onViewDetails(item)}
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Ver detalhes</span>
        </button>
      </div>
    </article>
  );
}
