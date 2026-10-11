import React from 'react';
import { HelpCircle, GraduationCap, Menu, Check, RotateCw, AlertTriangle, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderNavbarProps {
  onToggleSidebar: () => void;
  onStartTour: () => void;
  breadcrumbs: string[];
  currentPlanTitle?: string;
  serie?: string;
  bimestre?: string;
  saveStatus?: 'saved' | 'saving' | 'error' | 'idle';
}

export default function HeaderNavbar({
  onToggleSidebar,
  onStartTour,
  breadcrumbs,
  currentPlanTitle,
  serie,
  bimestre,
  saveStatus = 'saved'
}: HeaderNavbarProps) {
  return (
    <header className="h-[64px] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shrink-0 shadow-2xs font-sans">
      {/* Left Area: Menu Button, Institutional Logo & Breadcrumbs */}
      <div className="flex items-center gap-3.5 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition"
          aria-label="Alternar Menu Lateral"
          title="Alternar Menu Lateral"
        >
          <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
        </button>

        {/* Institutional Branding */}
        <div className="hidden sm:flex items-center gap-2 pr-3 border-r border-slate-200 dark:border-slate-800 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#00856A] flex items-center justify-center text-white shrink-0 shadow-2xs">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight block leading-none">
              SEDUC-SP
            </span>
            <span className="text-[10px] text-[#00856A] font-semibold tracking-wider uppercase block mt-0.5">
              2026
            </span>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              <span className={idx === breadcrumbs.length - 1 ? 'text-slate-900 dark:text-slate-100 font-bold truncate' : 'hidden md:inline truncate'}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Middle/Right Area: Plan Meta, Tags & Autosave Status */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Current Plan Tags */}
        {(currentPlanTitle || serie || bimestre) && (
          <div className="hidden lg:flex items-center gap-2 border-r border-slate-200 dark:border-slate-800 pr-3">
            {currentPlanTitle && (
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md max-w-[200px] truncate">
                {currentPlanTitle}
              </span>
            )}
            {serie && (
              <span className="text-[11px] font-semibold text-[#00856A] bg-[#E8F7F2] dark:bg-[#00856A]/20 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-[#00856A]/20">
                {serie}
              </span>
            )}
            {bimestre && (
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                {bimestre}
              </span>
            )}
          </div>
        )}

        {/* Autosave Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 dark:bg-slate-800/70 rounded-full border border-slate-200/80 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
          {saveStatus === 'saving' && (
            <>
              <RotateCw className="w-3.5 h-3.5 text-[#00856A] animate-spin" />
              <span>Salvando...</span>
            </>
          )}
          {saveStatus === 'saved' && (
            <>
              <Check className="w-3.5 h-3.5 text-[#00856A]" />
              <span className="text-slate-600 dark:text-slate-300 text-[11px]">Rascunho salvo</span>
            </>
          )}
          {saveStatus === 'error' && (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-amber-700 dark:text-amber-400 font-semibold text-[11px]">Erro ao salvar</span>
            </>
          )}
        </div>

        {/* Help Button */}
        <button
          onClick={onStartTour}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
          title="Abrir Tutorial / Guia de Uso"
        >
          <HelpCircle className="h-4 w-4 text-[#00856A]" />
          <span className="hidden md:inline">Ajuda</span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
