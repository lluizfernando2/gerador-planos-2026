import React from 'react';
import { 
  Plus, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  GraduationCap, 
  FileText, 
  Bookmark, 
  Sparkles,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface DashboardPageProps {
  totalItems: number;
  totalSkills: number;
  favoritesCount: number;
  updateCount: number;
  lastUpdateFormatted: string;
  onNavigate: (tab: 'curriculum' | 'plan-generator' | 'recovery-plan' | 'repositories' | 'favorites' | 'help' | 'documents') => void;
  onShowTour: () => void;
  activePlanSummary?: {
    subject: string;
    grade: string;
    bimester: string;
    selectedCount: number;
  };
}

export default function DashboardPage({
  onNavigate,
  onShowTour,
  activePlanSummary = {
    subject: 'Matemática',
    grade: '9º Ano',
    bimester: '2º Bimestre',
    selectedCount: 6
  }
}: DashboardPageProps) {

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-2" translate="no" lang="pt-BR">
      
      {/* 1. SEÇÃO DE BOAS-VINDAS E AÇÃO PRINCIPAL */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {getGreeting()}, Professor(a).
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1 font-medium">
            O que você quer fazer hoje?
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-1">
          {/* Ação Principal Dominante */}
          <button
            onClick={() => onNavigate('plan-generator')}
            className="px-6 py-3.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-sm rounded-xl shadow-xs transition cursor-pointer flex items-center gap-2.5"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Novo Planejamento</span>
          </button>

          {/* Ação Secundária */}
          <button
            onClick={() => onNavigate('curriculum')}
            className="px-6 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-xl transition cursor-pointer flex items-center gap-2.5 border border-slate-200 dark:border-slate-700"
          >
            <BookOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span>Explorar Currículo</span>
          </button>
        </div>
      </div>

      {/* 2. CONTINUAR TRABALHO EM ANDAMENTO */}
      {activePlanSummary && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
            CONTINUAR
          </h2>

          <div className="bg-sky-50/60 dark:bg-slate-900/90 rounded-xl border border-sky-200/80 dark:border-slate-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Rascunho Ativo</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Planejamento de {activePlanSummary.subject}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {activePlanSummary.grade} • {activePlanSummary.bimester} • {activePlanSummary.selectedCount} habilidades selecionadas
              </p>
            </div>

            <button
              onClick={() => onNavigate('plan-generator')}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-lg transition cursor-pointer flex items-center justify-center gap-2 shrink-0"
            >
              <span>Continuar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. RECENTES */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
          RECENTES
        </h2>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
          <div 
            onClick={() => onNavigate('plan-generator')}
            className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold text-xs">
                MAT
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Planejamento de Matemática — 9º Ano
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  2º Bimestre • Atualizado recentemente
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline">
              Abrir
            </span>
          </div>

          <div 
            onClick={() => onNavigate('plan-generator')}
            className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold text-xs">
                POR
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Planejamento de Língua Portuguesa — 6º Ano
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  1º Bimestre • Salvo
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline">
              Abrir
            </span>
          </div>
        </div>
      </div>

      {/* 4. ATALHOS RÁPIDOS */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
          ATALHOS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('curriculum')}
            className="p-5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 text-left transition cursor-pointer space-y-2 group shadow-2xs"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                Currículo
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Consulte a Matriz Priorizada 2026
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('recovery-plan')}
            className="p-5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 text-left transition cursor-pointer space-y-2 group shadow-2xs"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Recuperação
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Planos para alunos em defasagem
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('plan-generator')}
            className="p-5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 text-left transition cursor-pointer space-y-2 group shadow-2xs"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Documentos
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Exporte e baixe arquivos para o Word
              </p>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}
