import React from 'react';
import { 
  Building2, 
  Layers, 
  ListChecks, 
  BrainCircuit, 
  FileCheck, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export interface StepNavigationProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  status: {
    identificacao: 'complete' | 'in_progress' | 'empty';
    componente: 'complete' | 'in_progress' | 'empty';
    aulas: 'complete' | 'in_progress' | 'empty';
    estrategias: 'complete' | 'in_progress' | 'empty';
    previa: 'complete' | 'in_progress' | 'empty';
  };
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  onSelectStep,
  status
}) => {
  const steps = [
    { id: 1, label: '1. Identificação Escolar', icon: Building2, state: status.identificacao },
    { id: 2, label: '2. Segmento & Componente', icon: Layers, state: status.componente },
    { id: 3, label: '3. Aulas & Aprendizagens (AE)', icon: ListChecks, state: status.aulas },
    { id: 4, label: '4. Metodologias & Ações Bloom', icon: BrainCircuit, state: status.estrategias },
    { id: 5, label: '5. Prévia A4 Oficial & Exportação', icon: FileCheck, state: status.previa },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#D7DCE0] p-4 shadow-xs">
      <div className="text-xs font-bold text-[#17365D] uppercase tracking-wider mb-3 px-1 flex items-center justify-between">
        <span>Roteiro do Planejamento</span>
        <span className="text-[10px] text-[#5D6872] font-semibold">10 Semanas</span>
      </div>

      <nav className="space-y-1.5" aria-label="Etapas de planejamento">
        {steps.map(step => {
          const Icon = step.icon;
          const isSelected = currentStep === step.id;
          const isComplete = step.state === 'complete';

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-medium text-left transition cursor-pointer ${
                isSelected
                  ? 'bg-[#17365D] text-white shadow-xs font-bold'
                  : 'hover:bg-[#F4F2ED] text-[#202B33]'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-300' : 'text-[#2F5597]'}`} />
                <span className="truncate">{step.label}</span>
              </div>

              <div className="shrink-0 ml-2">
                {isComplete ? (
                  <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full ${isSelected ? 'bg-emerald-400 text-[#17365D]' : 'bg-emerald-100 text-emerald-700'}`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                ) : (
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-slate-300'}`} />
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
