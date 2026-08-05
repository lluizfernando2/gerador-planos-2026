import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Bookmark, 
  Layers, 
  Plus, 
  HelpCircle, 
  ArrowRight, 
  Clock,
  GraduationCap, 
  CheckSquare, 
  FileSpreadsheet, 
  Lightbulb
} from 'lucide-react';

interface DashboardPageProps {
  totalItems: number;
  totalSkills: number;
  favoritesCount: number;
  updateCount: number;
  lastUpdateFormatted: string;
  onNavigate: (tab: 'curriculum' | 'plan-generator' | 'recovery-plan' | 'repositories' | 'favorites' | 'help') => void;
  onShowTour: () => void;
}

export default function DashboardPage({
  totalItems,
  totalSkills,
  favoritesCount,
  updateCount,
  lastUpdateFormatted,
  onNavigate,
  onShowTour
}: DashboardPageProps) {

  return (
    <div className="space-y-8 animate-fade-in" translate="no" lang="pt-BR">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-12 translate-x-12">
          <BookOpen className="w-96 h-96" />
        </div>
        
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Organizador Curricular • Versão Oficial 2026
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Olá, Professor(a)! Bem-vindo ao Painel Pedagógico.
          </h1>
          
          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Consulte as habilidades integradas do Currículo Priorizado da SEDUC-SP, acesse aprendizagens essenciais e elabore planos de aula alinhados em tempo recorde com as diretrizes do estado.
          </p>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate('plan-generator')}
              className="px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 active:scale-95 transition-all text-xs sm:text-sm font-bold rounded-xl shadow-sm cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Gerar Novo Plano
            </button>
            <button
              onClick={onShowTour}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all text-xs sm:text-sm font-semibold rounded-xl cursor-pointer flex items-center gap-2 border border-white/15"
            >
              <HelpCircle className="w-4 h-4 text-blue-200" />
              Ver Guia do Sistema
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
          Indicadores do Sistema
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Aulas */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-4 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">Aulas Mapeadas</p>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-0.5">{totalItems}</p>
            </div>
          </div>

          {/* Card 2: Habilidades */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-4 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">Habilidades Únicas</p>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-0.5">{totalSkills}</p>
            </div>
          </div>

          {/* Card 3: Favoritos */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-4 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">Itens Favoritos</p>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-0.5">{favoritesCount}</p>
            </div>
          </div>

          {/* Card 4: Updates */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-4 transition-all hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">Versão Sincronizada</p>
              <p className="text-sm font-extrabold text-slate-900 dark:text-slate-50 mt-1 truncate" title={lastUpdateFormatted}>
                Build #{updateCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Shortcuts + Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Quick Actions & Helpful Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Shortcuts */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Atalhos Rápidos de Trabalho
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Shortcut 1 */}
              <div 
                onClick={() => onNavigate('curriculum')}
                className="p-4 rounded-xl border border-slate-150 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 hover:border-blue-300 dark:hover:border-blue-800 transition-all cursor-pointer group flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    Consultar Matriz
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all" />
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    Filtre habilidades, baixe planilhas oficiais e consulte códigos do Currículo Paulista.
                  </p>
                </div>
              </div>

              {/* Shortcut 2 */}
              <div 
                onClick={() => onNavigate('plan-generator')}
                className="p-4 rounded-xl border border-slate-150 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all cursor-pointer group flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Plus className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                    Gerador de Planos
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all" />
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    Monte planos bimestrais estruturados com Taxonomia de Bloom e baixe formatado para Google Docs.
                  </p>
                </div>
              </div>

              {/* Shortcut 3 */}
              <div 
                onClick={() => onNavigate('recovery-plan')}
                className="p-4 rounded-xl border border-slate-150 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 hover:border-amber-300 dark:hover:border-amber-800 transition-all cursor-pointer group flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    Planos de Recuperação
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all" />
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    Crie planos semestrais para estudantes em defasagem com sugestões de atividades e avaliações.
                  </p>
                </div>
              </div>

              {/* Shortcut 4 */}
              <div 
                onClick={() => onNavigate('repositories')}
                className="p-4 rounded-xl border border-slate-150 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all cursor-pointer group flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                    Repositórios de Questões
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all" />
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    Acesse rapidamente os bancos de questões oficiais (Provão Paulista, Prova Paulista e EFAPE).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tip Card */}
          <div className="p-5 bg-blue-50/30 dark:bg-blue-950/10 rounded-2xl border border-blue-100/55 dark:border-blue-900/40 flex gap-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
              <span className="font-bold text-slate-800 dark:text-slate-100">Dica de Planejamento:</span>
              <p className="leading-relaxed">
                Utilize o botão <strong className="text-blue-700 dark:text-blue-400">"Gerar Prompt Gemini"</strong> localizado em cada semana do seu plano de aula para obter sugestões pedagógicas exclusivas de avaliações metacognitivas e dinâmicas ativas para sua turma!
              </p>
            </div>
          </div>

        </div>

        {/* Right 1 Column: Activity Logs & Documentation status */}
        <div className="space-y-6">
          


          {/* Legal / Institutional statement */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed space-y-2">
            <p className="font-semibold text-slate-600 dark:text-slate-300">
              Sobre a Matriz Integrada:
            </p>
            <p>
              O sistema foi modelado com as diretrizes do Currículo Paulista (Anos Finais e Ensino Médio), incluindo o Itinerário de Formação Técnica e Profissional (Administração) e o Itinerário de Formação Geral Básica.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
