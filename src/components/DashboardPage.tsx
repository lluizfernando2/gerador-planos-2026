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
  HelpCircle,
  Calendar,
  Settings,
  Layers,
  Search,
  Award,
  Compass,
  FileCheck
} from 'lucide-react';

export interface ActivePlanSkillsMapping {
  subject: string;
  grade: string;
  bimester: string;
  totalSelectedLessons: number;
  activeSkillCodes: string[];
  skillCounts: Record<string, number>;
  activeLessons: any[];
}

interface DashboardPageProps {
  totalItems: number;
  totalSkills: number;
  favoritesCount: number;
  updateCount: number;
  lastUpdateFormatted: string;
  onNavigate: (tab: 'curriculum' | 'plan-generator' | 'recovery-plan' | 'repositories' | 'favorites' | 'help' | 'assessment-calendar' | 'dashboard' | 'settings') => void;
  onShowTour: () => void;
  activePlanSkillsMapping?: ActivePlanSkillsMapping;
}

export default function DashboardPage({
  totalItems,
  totalSkills,
  favoritesCount,
  onNavigate,
  onShowTour,
  activePlanSkillsMapping
}: DashboardPageProps) {

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const planningTools = [
    {
      id: 'plan-generator' as const,
      title: 'Plano de Ensino (10 Semanas)',
      badge: 'Modelo 1 & Customizável',
      badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300',
      description: 'Elabore cronogramas bimestrais com Aprendizagens Essenciais (AE), Taxonomia de Bloom, estratégias ativas, paradas de verificação e exportação em Word/A4.',
      icon: BookOpen,
      iconBg: 'bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400',
      actionText: 'Criar / Editar Plano de Ensino'
    },
    {
      id: 'recovery-plan' as const,
      title: 'Plano de Recuperação Semestral',
      badge: 'Resolução SEDUC 42/2024',
      badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-300',
      description: 'Gere planos de recomposição de aprendizagem para estudantes com rendimento em defasagem e suporte às avaliações da Prova Paulista.',
      icon: GraduationCap,
      iconBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
      actionText: 'Elaborar Recuperação'
    },
    {
      id: 'curriculum' as const,
      title: 'Matriz Curricular Paulista 2026',
      badge: 'FGB, Técnico e Diversificada',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
      description: 'Pesquise e navegue por todas as habilidades oficiais, objetos de conhecimento, descritores e competências socioemocionais do Estado de SP.',
      icon: FileText,
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
      actionText: 'Explorar Matriz Curricular'
    },
    {
      id: 'assessment-calendar' as const,
      title: 'Calendário & Avaliações do 4º Bimestre',
      badge: 'SARESP & Provão Paulista',
      badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300',
      description: 'Consulte as datas oficiais do Provão Paulista (1ª, 2ª e 3ª EM), SARESP (6º ao 9º EF) e OMASP para orientar o cronograma pedagógico.',
      icon: Calendar,
      iconBg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
      actionText: 'Ver Calendário Avaliativo'
    },
    {
      id: 'repositories' as const,
      title: 'Repositório & Banco de Questões',
      badge: 'Atividades Verificadoras',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300',
      description: 'Consulte questões do SARESP, Prova Paulista e repositórios para estruturar atividades de checagem da retenção dos conteúdos.',
      icon: HelpCircle,
      iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
      actionText: 'Abrir Banco de Questões'
    },
    {
      id: 'favorites' as const,
      title: 'Habilidades Favoritas & Acervo',
      badge: favoritesCount > 0 ? `${favoritesCount} salvas` : 'Acervo Pessoal',
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
      description: 'Acesse rapidamente suas habilidades e itens curriculares favoritados para inclusão em planejamentos futuros.',
      icon: Bookmark,
      iconBg: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
      actionText: 'Acessar Favoritos'
    }
  ];

  const systemTools = [
    {
      id: 'settings' as const,
      title: 'Configurações do Sistema',
      description: 'Ajuste preferências visuais, tipografia, estilos de bordas e gerenciamento de armazenamento local.',
      icon: Settings,
      actionText: 'Configurações'
    },
    {
      id: 'help' as const,
      title: 'Central de Treinamento & Guia',
      description: 'Aprenda a utilizar todos os recursos da plataforma através do tour guiado explicativo.',
      icon: Compass,
      actionText: 'Iniciar Tutorial'
    }
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-2 animate-fadeIn" translate="no" lang="pt-BR">
      
      {/* 1. HERO HEROIC BANNER / LANDING HUB */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-700/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mesa de Trabalho Pedagógico SP • 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {getGreeting()}, Professor(a).
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Selecione uma das ferramentas abaixo para iniciar seu planejamento de aula, consultar a matriz curricular priorizada ou gerar documentos institucionais oficiais.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('plan-generator')}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Novo Plano de Ensino</span>
            </button>
            <button
              onClick={() => onNavigate('recovery-plan')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-600 transition cursor-pointer flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Plano de Recuperação</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HUB CARDS GRID (FORMER SIDEBAR ITEMS AS LANDING PORTALS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <span>Ferramentas de Planejamento de Ensino</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Escolha a dimensão pedagógica que deseja trabalhar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planningTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-sky-500 dark:hover:border-sky-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl ${tool.iconBg} flex items-center justify-center font-bold`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 transition">
                  <span>{tool.actionText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SYSTEM & TUTORIAL HUB SECTION */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Geral & Suporte ao Sistema</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {systemTools.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.id}
                onClick={() => {
                  if (st.id === 'help') {
                    onShowTour();
                    onNavigate('help');
                  } else {
                    onNavigate(st.id);
                  }
                }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-slate-400 transition cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition">
                      {st.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 shrink-0 group-hover:translate-x-1 transition" />
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
