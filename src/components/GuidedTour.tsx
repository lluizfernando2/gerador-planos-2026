import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Database, 
  Filter, 
  CheckSquare, 
  Download, 
  Sparkles, 
  BookOpen, 
  Play,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface GuidedTourProps {
  isOpen?: boolean;
  onClose?: () => void;
  onNavigateToTab?: (tab: 'plan-generator' | 'curriculum' | 'recovery-plan' | 'repositories') => void;
}

export const TOUR_STEPS = [
  {
    id: 'step-base',
    number: 1,
    title: 'Carregar a Base Curricular',
    subtitle: 'Passo 1 de 4',
    icon: Database,
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Comece selecionando o segmento escolar e o formato do plano de ensino desejado para 2026.',
    details: [
      'Escolha entre Ensino Fundamental (Anos Finais) ou Ensino Médio.',
      'Selecione o formato de modelo oficial (padrão SEDUC-SP ou AVA-EFAPE).',
      'Acesse tanto a Formação Geral Básica (FGB) quanto a Parte Diversificada (Tecnologia, Projeto de Vida, etc.).'
    ],
    tip: '💡 Dica: Os dados são pré-carregados com as diretrizes e matrizes curriculares oficiais de 2026.',
    actionTab: 'plan-generator' as const,
    actionLabel: 'Ver no Gerador de Planos'
  },
  {
    id: 'step-filter',
    number: 2,
    title: 'Filtrar Disciplinas e Anos/Séries',
    subtitle: 'Passo 2 de 4',
    icon: Filter,
    color: 'from-blue-500 to-indigo-600',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Filtre com precisão o componente curricular e o período letivo para carregar o escopo-sequência exato.',
    details: [
      'Selecione a disciplina (ex: Matemática, Língua Portuguesa, História, Ciências, etc.).',
      'Filtre o ano ou série desejado (ex: 6º ao 9º Ano ou 1ª à 3ª Série).',
      'Restrinja a busca por Bimestre para planejar um período específico do ano letivo.'
    ],
    tip: '💡 Dica: Na aba "Matriz Curricular Priorizada", você também pode buscar por descritores e habilidades da BNCC.',
    actionTab: 'curriculum' as const,
    actionLabel: 'Ver Matriz Curricular'
  },
  {
    id: 'step-select',
    number: 3,
    title: 'Selecionar Aulas e Materiais Digitais',
    subtitle: 'Passo 3 de 4',
    icon: CheckSquare,
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Escolha as semanas de aula e os materiais digitais homologados que farão parte do seu plano de aula.',
    details: [
      'Visualize o sequenciamento semanal com os códigos das aulas digitais oficiais.',
      'Ajuste o número de aulas por semana conforme a carga horária da sua turma.',
      'O sistema inclui automaticamente os Objetivos, Ações da Taxonomia de Bloom, Conteúdos e Metodologias.'
    ],
    tip: '💡 Dica: É possível marcar e desmarcar aulas individualmente ou selecionar múltiplos blocos semanais.',
    actionTab: 'plan-generator' as const,
    actionLabel: 'Ver Seleção de Aulas'
  },
  {
    id: 'step-export',
    number: 4,
    title: 'Exportar o Plano de Ensino',
    subtitle: 'Passo 4 de 4',
    icon: Download,
    color: 'from-purple-500 to-indigo-700',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Baixe e compartilhe seu plano devidamente formatado para impressão ou entrega pedagógica.',
    details: [
      'Exporte em documento Word (.doc) em orientação Paisagem e tabelas independentes por semana.',
      'Copie com um clique para colar diretamente no Google Docs sem desformatar.',
      'Baixe em arquivo HTML limpo ou envie para a fila de Impressão/PDF da sua impressora.',
      'Gere também prompts otimizados para criar avaliações no Gemini!'
    ],
    tip: '💡 Dica: Os títulos das tabelas no Word já vêm destacados em negrito pronto para homologação.',
    actionTab: 'plan-generator' as const,
    actionLabel: 'Iniciar Meu Planejamento'
  }
];

export default function GuidedTour({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  onNavigateToTab
}: GuidedTourProps) {
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    if (isControlled && externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleOpen = () => {
    setCurrentStepIndex(0);
    if (!isControlled) {
      setInternalIsOpen(true);
    }
  };

  const currentStep = TOUR_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      handleClose();
      if (onNavigateToTab) {
        onNavigateToTab('plan-generator');
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex]);

  return (
    <>
      {/* Floating Trigger Button (Always accessible if not controlled externally) */}
      {!isControlled && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-full shadow-xl border-2 border-emerald-400/30 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group"
          title="Abrir Tour Guiado de Como Usar"
        >
          <HelpCircle className="h-4 w-4 text-emerald-300 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Tour Guiado</span>
          <span className="bg-emerald-700/80 text-emerald-100 text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase">
            Como Usar
          </span>
        </button>
      )}

      {/* Modal / Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden my-8"
            >
              {/* Header with Step Banner */}
              <div className={`bg-gradient-to-r ${currentStep.color} p-6 text-white relative`}>
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition cursor-pointer"
                  title="Fechar Tour"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    {currentStep.subtitle}
                  </span>
                  <span className="text-white/80 text-xs font-medium">
                    {currentStepIndex + 1} de {TOUR_STEPS.length} passos
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md shrink-0 border border-white/20">
                    <currentStep.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      {currentStep.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/90 mt-1 font-medium">
                      {currentStep.description}
                    </p>
                  </div>
                </div>

                {/* Progress Bar Header */}
                <div className="w-full bg-black/20 h-1.5 rounded-full mt-5 overflow-hidden">
                  <div 
                    className="bg-white h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((currentStepIndex + 1) / TOUR_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Body Content */}
              <div className="p-6 space-y-5 bg-white">
                {/* Details list */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    Ações deste passo:
                  </h3>
                  <ul className="space-y-2">
                    {currentStep.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tip box */}
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed font-medium flex items-start gap-2">
                  <span>{currentStep.tip}</span>
                </div>

                {/* Step indicator dots */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    {TOUR_STEPS.map((step, idx) => (
                      <button
                        key={step.id}
                        onClick={() => setCurrentStepIndex(idx)}
                        className={`transition-all cursor-pointer ${
                          idx === currentStepIndex
                            ? 'w-7 h-2.5 bg-emerald-600 rounded-full'
                            : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300 rounded-full'
                        }`}
                        title={`Ir para ${step.title}`}
                      />
                    ))}
                  </div>

                  {/* Optional Action to Jump to Tab */}
                  {onNavigateToTab && (
                    <button
                      onClick={() => {
                        onNavigateToTab(currentStep.actionTab);
                        if (currentStepIndex === TOUR_STEPS.length - 1) {
                          handleClose();
                        }
                      }}
                      className="text-xs font-extrabold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer underline decoration-emerald-300 hover:decoration-emerald-600 underline-offset-2"
                    >
                      <span>{currentStep.actionLabel}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition cursor-pointer"
                >
                  Pular Tour
                </button>

                <div className="flex items-center gap-2">
                  {currentStepIndex > 0 && (
                    <button
                      onClick={handlePrev}
                      className="px-4 py-2 text-xs font-extrabold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg shadow-2xs transition flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Anterior
                    </button>
                  )}

                  <button
                    onClick={handleNext}
                    className="px-5 py-2 text-xs font-extrabold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    {currentStepIndex < TOUR_STEPS.length - 1 ? (
                      <>
                        Próximo
                        <ChevronRight className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Concluir e Começar
                        <Sparkles className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
