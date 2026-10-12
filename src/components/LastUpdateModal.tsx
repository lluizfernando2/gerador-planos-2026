import React from 'react';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Layers, 
  BookOpen, 
  GraduationCap,
  History
} from 'lucide-react';
import buildInfo from '../buildInfo.json';

export interface LastUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LastUpdateModal: React.FC<LastUpdateModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const buildDate = new Date(buildInfo.timestamp);
  const formattedDate = buildDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = buildDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calculate approximate elapsed time
  const now = new Date();
  const diffHours = Math.max(0, Math.round((now.getTime() - buildDate.getTime()) / (1000 * 60 * 60)));
  const diffDays = Math.floor(diffHours / 24);
  let timeAgoText = 'Atualizado hoje';
  if (diffDays > 0) {
    timeAgoText = `Atualizado há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
  } else if (diffHours > 0) {
    timeAgoText = `Atualizado há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="update-modal-title"
      >
        {/* Header with gradient badge */}
        <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Fechar pop-up"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Versão Oficial • Build #{buildInfo.buildNumber}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-400/20 text-emerald-100 border border-emerald-400/30">
              <History className="w-3 h-3" />
              {timeAgoText}
            </span>
          </div>

          <h2 id="update-modal-title" className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Última Atualização do Sistema
          </h2>
          <p className="text-xs text-sky-100 mt-1">
            Informações sobre a última sincronização da base curricular e dos módulos letivos.
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 text-slate-700 dark:text-slate-300">
          {/* Main date counter badge */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60">
            <div className="w-12 h-12 rounded-xl bg-sky-600 dark:bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-sky-800 dark:text-sky-300 block">
                Data e Horário da Última Atualização
              </span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white block mt-0.5">
                {formattedDate} às {formattedTime}
              </span>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                <span>Registro do Build: #{buildInfo.buildNumber}</span>
              </div>
            </div>
          </div>

          {/* Highlights of this release */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Melhorias Integradas Nesta Versão
            </h4>

            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Ensino Médio Refatorado:</strong> Bases independentes para <strong>FGB</strong>, <strong>Diversificada</strong>, <strong>Itinerários</strong> e <strong>Técnico</strong> sem telas em branco.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400 mt-1.5 shrink-0" />
                <span>
                  <strong>4º Bimestre Concluído:</strong> Aulas oficiais completas para todas as séries (1ª, 2ª e 3ª Série) e todos os anos do Fundamental (6º ao 9º Ano).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400 mt-1.5 shrink-0" />
                <span>
                  <strong>Consulta Curricular Precisa:</strong> Filtragem normalizada respeitando acentuação, ordinais e bimestres oficiais.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400">
            Seduc-SP • Currículo Paulista 2026
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            Continuar para o Sistema
          </button>
        </div>
      </div>
    </div>
  );
};

export default LastUpdateModal;
