import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Bookmark, 
  HelpCircle, 
  Settings, 
  Check, 
  AlertTriangle, 
  RotateCw, 
  Menu, 
  X, 
  Calendar,
  Grid,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import buildInfo from '../buildInfo.json';

export interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  favoritesCount: number;
  onShowTour: () => void;
  saveStatus?: 'saved' | 'saving' | 'error' | 'idle';
  currentPlanningTitle?: string;
  onShowUpdateModal?: () => void;
}

export default function AppLayout({
  children,
  activeTab,
  setActiveTab,
  favoritesCount,
  onShowTour,
  saveStatus = 'saved',
  onShowUpdateModal
}: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'plan-generator', label: 'Plano de Ensino', icon: BookOpen },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab('plan-generator');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getBreadcrumbs = () => {
    return ['Plano de Ensino', 'Planejamento Bimestral (4º Bimestre / 2026)'];
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200 selection:bg-sky-100 selection:text-sky-900" translate="no" lang="pt-BR">
      
      {/* TOP INSTITUTIONAL HEADER NAVBAR */}
      <header className="bg-slate-900 text-slate-200 border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* BRANDING LOGO & TITLE */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('plan-generator')}>
              <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold shadow-xs">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-white tracking-tight block">
                  Plano de Ensino
                </span>
                <span className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider block">
                  Seduc-SP • 4º Bimestre 2026
                </span>
              </div>
            </div>

            {/* DESKTOP TOP HORIZONTAL TOOLBAR */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const IconComp = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer bg-sky-600 text-white shadow-xs"
                  >
                    <IconComp className="w-4 h-4 text-white" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* HEADER RIGHT UTILITIES */}
            <div className="flex items-center gap-3">
              {/* LAST UPDATE BADGE / MODAL TRIGGER */}
              {onShowUpdateModal && (
                <button
                  onClick={onShowUpdateModal}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 rounded-full text-xs font-semibold transition cursor-pointer"
                  title="Ver data da última atualização"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Última Atualização</span>
                  <span className="text-[10px] bg-sky-900 text-sky-200 px-1.5 py-0.2 rounded font-mono font-bold">
                    #{buildInfo.buildNumber}
                  </span>
                </button>
              )}

              {/* AUTOSAVE INDICATOR WHEN IN PLANNER */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-full border border-slate-700 text-xs font-medium">
                {saveStatus === 'saving' && (
                  <>
                    <RotateCw className="w-3.5 h-3.5 text-sky-400 animate-spin" />
                    <span className="text-sky-300">Salvando...</span>
                  </>
                )}
                {saveStatus === 'saved' && (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-slate-300 text-[11px]">Salvo</span>
                  </>
                )}
                {saveStatus === 'error' && (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-amber-300 text-[11px]">Falha</span>
                  </>
                )}
              </div>

              <ThemeToggle />
            </div>

          </div>
        </div>
      </header>

      {/* SUB-HEADER BREADCRUMB BAR */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-900 dark:text-slate-100 font-bold">
              Plano de Ensino
            </span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-sky-700 dark:text-sky-400 font-semibold bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-200/60 dark:border-sky-800/60">
              4º Bimestre / 2026 (11 Semanas Oficiais)
            </span>
          </div>

          <div className="text-[11px] text-slate-400 font-medium">
            Currículo Paulista &bull; Material Digital SEDUC
          </div>
        </div>
      </div>

      {/* SCROLLABLE MAIN CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

    </div>
  );
}
