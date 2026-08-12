import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

export type PlanStep = 'context' | 'curriculum' | 'planning' | 'conference';

interface PlanStepHeaderProps {
  currentStep: PlanStep;
  setStep: (step: PlanStep) => void;
  selectedCount: number;
}

export default function PlanStepHeader({
  currentStep,
  setStep,
  selectedCount
}: PlanStepHeaderProps) {
  const steps: { id: PlanStep; label: string; number: number }[] = [
    { id: 'context', label: 'Contexto', number: 1 },
    { id: 'curriculum', label: 'Currículo', number: 2 },
    { id: 'planning', label: 'Planejamento', number: 3 },
    { id: 'conference', label: 'Conferência & Documento', number: 4 },
  ];

  const getStepIndex = (step: PlanStep) => {
    switch (step) {
      case 'context': return 1;
      case 'curriculum': return 2;
      case 'planning': return 3;
      case 'conference': return 4;
    }
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 shadow-2xs mb-6">
      <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4">
        {steps.map((s, idx) => {
          const isActive = currentStep === s.id;
          const isCompleted = currentIndex > s.number;

          return (
            <React.Fragment key={s.id}>
              {idx > 0 && (
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-700 shrink-0 hidden sm:block" />
              )}
              
              <button
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 text-left
                  ${isActive 
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 font-bold' 
                    : isCompleted 
                      ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800' 
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                  ${isActive 
                    ? 'bg-sky-600 text-white' 
                    : isCompleted 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.number}
                </div>
                
                <span className="truncate">{s.label}</span>
                
                {s.id === 'curriculum' && selectedCount > 0 && (
                  <span className="text-[10px] font-bold bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 px-1.5 py-0.5 rounded-full">
                    {selectedCount}
                  </span>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
