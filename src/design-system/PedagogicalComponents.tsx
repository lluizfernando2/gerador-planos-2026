import React from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, FileText, Layers, Target, Compass, Sparkles } from 'lucide-react';

/**
 * Domain-oriented components for the Pedagogical Workbench
 */

export interface EssentialLearningItemProps {
  code?: string;
  description: string;
  subject?: string;
  category?: string;
  isSelected?: boolean;
  onToggle?: () => void;
}

export const EssentialLearningItem: React.FC<EssentialLearningItemProps> = ({
  code,
  description,
  subject,
  category,
  isSelected,
  onToggle
}) => {
  return (
    <div
      onClick={onToggle}
      className={`p-3 rounded-lg border text-left transition cursor-pointer flex items-start gap-3 ${
        isSelected
          ? 'bg-blue-50/70 border-[#2F5597] shadow-xs'
          : 'bg-white border-[#D7DCE0] hover:border-[#2F5597]/50'
      }`}
    >
      <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
        isSelected ? 'bg-[#17365D] border-[#17365D] text-white' : 'border-[#D7DCE0] bg-white'
      }`}>
        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {code && (
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#DCE6F1] text-[#17365D]">
              {code}
            </span>
          )}
          {subject && (
            <span className="text-[11px] font-semibold text-[#5D6872]">
              {subject}
            </span>
          )}
          {category && (
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
              {category}
            </span>
          )}
        </div>
        <p className="text-xs text-[#202B33] leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export interface CurriculumSkillItemProps {
  code: string;
  text: string;
  topic?: string;
  grade?: string;
}

export const CurriculumSkillItem: React.FC<CurriculumSkillItemProps> = ({
  code,
  text,
  topic,
  grade
}) => {
  return (
    <div className="p-3.5 rounded-lg border border-[#D7DCE0] bg-white hover:shadow-xs transition">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#DCE6F1] text-[#17365D]">
          {code}
        </span>
        {grade && <span className="text-[11px] font-medium text-[#5D6872]">{grade}</span>}
      </div>
      {topic && (
        <div className="text-xs font-semibold text-[#17365D] mb-1">
          {topic}
        </div>
      )}
      <p className="text-xs text-[#5D6872] leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export interface LessonSequenceItemProps {
  aulaNum: string | number;
  titulo: string;
  conteudo?: string;
  habilidade?: string;
  objetivo?: string;
  isSelected?: boolean;
  onToggle?: () => void;
}

export const LessonSequenceItem: React.FC<LessonSequenceItemProps> = ({
  aulaNum,
  titulo,
  conteudo,
  habilidade,
  objetivo,
  isSelected,
  onToggle
}) => {
  return (
    <div
      onClick={onToggle}
      className={`p-3 rounded-lg border text-left transition cursor-pointer flex items-start gap-3 ${
        isSelected
          ? 'bg-blue-50/60 border-[#2F5597]'
          : 'bg-white border-[#D7DCE0] hover:border-gray-300'
      }`}
    >
      <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
        isSelected ? 'bg-[#2F5597] border-[#2F5597] text-white' : 'border-[#D7DCE0] bg-white'
      }`}>
        {isSelected && <CheckCircle2 className="w-3 h-3" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-bold text-[#17365D]">
            Aula {String(aulaNum).replace(/^Aula\s*/i, '')}
          </span>
          <span className="text-xs font-medium text-[#202B33] truncate">
            {titulo}
          </span>
        </div>
        {conteudo && (
          <p className="text-[11px] text-[#5D6872] line-clamp-2 leading-relaxed">
            {conteudo}
          </p>
        )}
      </div>
    </div>
  );
};

export interface DocumentStatusNoticeProps {
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  action?: { label: string; onClick: () => void };
}

export const DocumentStatusNotice: React.FC<DocumentStatusNoticeProps> = ({
  type,
  title,
  message,
  action
}) => {
  const styles = {
    info: 'bg-[#DCE6F1]/50 border-[#2F5597]/30 text-[#17365D]',
    success: 'bg-[#3F7254]/10 border-[#3F7254]/30 text-[#3F7254]',
    warning: 'bg-[#A56816]/10 border-[#A56816]/30 text-[#A56816]',
    error: 'bg-[#A33A3A]/10 border-[#A33A3A]/30 text-[#A33A3A]'
  };

  return (
    <div className={`p-3.5 rounded-lg border text-xs flex items-start justify-between gap-3 ${styles[type]}`}>
      <div className="flex items-start gap-2">
        {type === 'warning' && <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />}
        {type === 'info' && <Compass className="w-4 h-4 shrink-0 mt-0.5" />}
        {type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />}
        {type === 'error' && <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />}
        <div>
          {title && <div className="font-bold mb-0.5">{title}</div>}
          <div className="leading-relaxed opacity-90">{message}</div>
        </div>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="underline font-bold hover:opacity-80 shrink-0 ml-2"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
