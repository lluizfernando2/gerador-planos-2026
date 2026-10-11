import React, { useState, useEffect } from 'react';
import { GraduationCap, Menu, X, Heart, HelpCircle, BookOpen, Layers, Home, Sparkles, Calendar, Clock } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  activeTab: 'curriculum' | 'plan-generator' | 'favorites' | 'help' | 'dashboard' | 'settings';
  onSelectTab: (tab: any) => void;
  favoritesCount: number;
  onOpenGuide?: () => void;
}

export default function Header({
  activeTab,
  onSelectTab,
  favoritesCount,
  onOpenGuide
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when ESC is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: 'curriculum', label: 'Início', icon: Home },
    { id: 'curriculum', label: 'Currículo', icon: BookOpen },
    { id: 'plan-generator', label: 'Planejamento', icon: Layers },
    { id: 'favorites', label: 'Favoritos', icon: Heart, badge: favoritesCount },
    { id: 'help', label: 'Ajuda', icon: HelpCircle }
  ];

  const handleNavClick = (tabId: any) => {
    onSelectTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('curriculum')}
              className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-xl p-1 cursor-pointer group"
              aria-label="Ir para a página inicial do Currículo Priorizado"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                <GraduationCap className="w-5 h-5 text-emerald-400 dark:text-white" aria-hidden="true" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white block leading-tight">
                  Currículo Priorizado
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                  Estado de São Paulo • SEDUC-SP
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Navegação principal">
            <button
              onClick={() => handleNavClick('curriculum')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'curriculum'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>Currículo</span>
            </button>

            <button
              onClick={() => handleNavClick('plan-generator')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'plan-generator'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>Planejamento</span>
            </button>

            <button
              onClick={() => handleNavClick('favorites')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer relative ${
                activeTab === 'favorites'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-500" aria-hidden="true" />
              <span>Favoritos</span>
              {favoritesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-rose-500 text-white rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('help')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'help'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
              <span>Ajuda</span>
            </button>
          </nav>

          {/* Right Action Icons & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="md:hidden p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200"
        >
          <button
            onClick={() => handleNavClick('curriculum')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
              activeTab === 'curriculum'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Currículo Priorizado</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('plan-generator')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
              activeTab === 'plan-generator'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Gerador de Planos de Aula</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('favorites')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-semibold'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Favoritos</span>
            </div>
            {favoritesCount > 0 && (
              <span className="px-2.5 py-1 text-xs font-bold bg-rose-500 text-white rounded-full">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('help')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
              activeTab === 'help'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <span>Guia de Uso & Dúvidas</span>
            </div>
          </button>
        </div>
      )}
    </header>
  );
}
