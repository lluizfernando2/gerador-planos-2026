import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Bookmark, 
  HelpCircle, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  PlusCircle,
  FolderKanban,
  Check,
  AlertTriangle,
  RotateCw,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  favoritesCount: number;
  onShowTour: () => void;
  onReturnToLanding?: () => void;
  saveStatus?: 'saved' | 'saving' | 'error' | 'idle';
  currentPlanningTitle?: string;
}

export default function AppLayout({
  children,
  activeTab,
  setActiveTab,
  favoritesCount,
  onShowTour,
  onReturnToLanding,
  saveStatus = 'saved',
  currentPlanningTitle
}: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPlanningsExpanded, setIsPlanningsExpanded] = useState(true);

  // New UX Navigation Groups
  const navigationSections = [
    {
      title: "GERAL",
      items: [
        { id: 'dashboard', label: 'Início', icon: Home },
      ]
    },
    {
      title: "PLANEJAMENTO",
      isGroup: true,
      label: "Planejamentos",
      icon: FolderKanban,
      subItems: [
        { id: 'dashboard', label: 'Meus planejamentos', icon: FolderKanban },
        { id: 'plan-generator', label: 'Novo planejamento', icon: PlusCircle },
      ]
    },
    {
      title: "CONSULTA & RECURSOS",
      items: [
        { id: 'curriculum', label: 'Currículo', icon: BookOpen },
        { id: 'documents', label: 'Documentos', icon: FileText },
        { id: 'recovery-plan', label: 'Recuperação', icon: GraduationCap },
        { id: 'favorites', label: 'Favoritos', icon: Bookmark, badge: favoritesCount > 0 ? favoritesCount : undefined },
      ]
    },
    {
      title: "SISTEMA",
      items: [
        { id: 'settings', label: 'Configurações', icon: Settings },
        { id: 'help', label: 'Ajuda', icon: HelpCircle },
      ]
    }
  ];

  const handleNavClick = (id: string) => {
    if (id === 'help') {
      onShowTour();
      setActiveTab('help');
    } else {
      setActiveTab(id);
    }
    setIsSidebarOpen(false);
  };

  const getBreadcrumbs = () => {
    switch (activeTab) {
      case 'dashboard':
        return ['Início', 'Visão Geral'];
      case 'plan-generator':
        return ['Planejamentos', 'Novo Planejamento'];
      case 'curriculum':
        return ['Currículo', 'Matriz Paulista 2026'];
      case 'documents':
        return ['Documentos', 'Gerador de DOCX'];
      case 'recovery-plan':
        return ['Recuperação', 'Plano Semestral'];
      case 'favorites':
        return ['Favoritos', 'Habilidades Salvas'];
      case 'settings':
        return ['Configurações', 'Preferências'];
      case 'help':
        return ['Ajuda', 'Central de Treinamento'];
      default:
        return ['Início'];
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-200 selection:bg-sky-100 selection:text-sky-900" translate="no" lang="pt-BR">
      
      {/* MOBILE DRAWER OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR NAVEGAÇÃO */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-slate-900 text-slate-300 z-50 flex flex-col transition-all duration-300 border-r border-slate-800 shadow-md
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-[260px]'} w-[260px]`}
      >
        {/* BRAND HEADER */}
        <div className="h-16 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 bg-slate-950/60">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white shrink-0 font-bold shadow-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <span className="text-sm font-bold text-white tracking-tight block truncate">
                  Currículo Priorizado
                </span>
                <span className="text-[10px] text-sky-400 font-semibold tracking-wider uppercase block leading-tight">
                  Sede SP • 2026
                </span>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SIDEBAR LINKS */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5 no-scrollbar">
          {navigationSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              {!isCollapsed && sec.title && (
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
                  {sec.title}
                </h4>
              )}

              {sec.items && sec.items.map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 py-2.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer text-left
                      ${isActive 
                        ? 'bg-sky-600/20 text-sky-300 font-bold border-l-3 border-sky-400 rounded-l-none' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
                  >
                    <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}
                    {item.badge !== undefined && !isCollapsed && (
                      <span className="text-[10px] font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {sec.isGroup && (
                <div className="space-y-1">
                  <button
                    onClick={() => setIsPlanningsExpanded(!isPlanningsExpanded)}
                    className="w-full flex items-center justify-between py-2.5 px-3 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <FolderKanban className="w-4 h-4 text-slate-400 shrink-0" />
                      {!isCollapsed && <span>{sec.label}</span>}
                    </div>
                    {!isCollapsed && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isPlanningsExpanded ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {(isPlanningsExpanded || isCollapsed) && (
                    <div className={`${isCollapsed ? '' : 'pl-6 space-y-1'}`}>
                      {sec.subItems?.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeTab === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleNavClick(sub.id)}
                            title={isCollapsed ? sub.label : undefined}
                            className={`w-full flex items-center gap-2.5 py-2 px-3 text-xs font-medium rounded-md transition-all cursor-pointer text-left
                              ${isSubActive 
                                ? 'bg-sky-600/30 text-sky-200 font-bold' 
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}
                          >
                            <SubIcon className={`w-3.5 h-3.5 shrink-0 ${isSubActive ? 'text-sky-300' : 'text-slate-500'}`} />
                            {!isCollapsed && <span className="truncate">{sub.label}</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 space-y-2 shrink-0">
          <div className="flex items-center gap-3 px-1.5 py-1">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-bold text-xs shrink-0">
              PR
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">Professor(a)</p>
                <p className="text-[10px] text-slate-400 truncate">Rede Estadual SP</p>
              </div>
            )}
          </div>

          {onReturnToLanding && (
            <button
              onClick={onReturnToLanding}
              className="w-full flex items-center justify-center py-1.5 bg-slate-800/60 hover:bg-slate-800 rounded-md text-slate-300 text-[11px] font-medium gap-1.5 cursor-pointer transition"
              title="Apresentação institucional"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              {!isCollapsed && <span>Página Inicial</span>}
            </button>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center py-1.5 bg-slate-800/30 hover:bg-slate-800/80 rounded-md text-slate-400 hover:text-slate-200 text-[11px] font-medium gap-1 cursor-pointer transition"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Recolher</span></>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className={`flex-1 min-w-0 min-h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'}`}>
        
        {/* HEADER BAR */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* BREADCRUMBS */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              {getBreadcrumbs().map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span>/</span>}
                  <span className={idx === getBreadcrumbs().length - 1 ? 'text-slate-900 dark:text-slate-100 font-bold' : ''}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* HEADER RIGHT STATUS AND UTILITIES */}
          <div className="flex items-center gap-4">
            
            {/* AUTOSAVE INDICATOR WHEN IN PLANNER */}
            {activeTab === 'plan-generator' && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 font-medium">
                {saveStatus === 'saving' && (
                  <>
                    <RotateCw className="w-3.5 h-3.5 text-sky-600 animate-spin" />
                    <span>Salvando...</span>
                  </>
                )}
                {saveStatus === 'saved' && (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-slate-600 dark:text-slate-300">Alterações salvas</span>
                  </>
                )}
                {saveStatus === 'error' && (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-amber-700 dark:text-amber-400 font-semibold">Não foi possível salvar</span>
                  </>
                )}
              </div>
            )}

            <ThemeToggle />

            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>SEDUC-SP</span>
            </div>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
