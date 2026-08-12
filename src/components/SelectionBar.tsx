import React from 'react';
import { Check, ArrowRight, X, ChevronUp, ChevronDown } from 'lucide-react';

interface SelectionBarProps {
  selectedKeys: string[];
  onClear: () => void;
  onContinue: () => void;
  onViewSelected?: () => void;
}

export default function SelectionBar({
  selectedKeys,
  onClear,
  onContinue,
  onViewSelected
}: SelectionBarProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (selectedKeys.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-2xl px-4 animate-slide-up">
      <div className="bg-slate-900 text-slate-100 rounded-2xl shadow-xl border border-slate-800 p-4 space-y-3">
        
        {/* TOP BAR SUMMARY */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
              {selectedKeys.length}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-100">
                {selectedKeys.length} {selectedKeys.length === 1 ? 'habilidade selecionada' : 'habilidades selecionadas'}
              </p>
              <p className="text-[11px] text-slate-400">
                Pronta(s) para incluir no planejamento
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1"
            >
              <span>Ver códigos</span>
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onClear}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition cursor-pointer"
              title="Limpar seleção"
            >
              <X className="w-4 h-4" />
            </button>

            <button
              onClick={onContinue}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Continuar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* EXPANDED LIST OF SELECTED KEYS */}
        {isExpanded && (
          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
            {selectedKeys.map((key) => (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 text-sky-300 rounded-md text-[11px] font-mono font-semibold"
              >
                <Check className="w-3 h-3 text-sky-400" />
                <span>{key}</span>
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
