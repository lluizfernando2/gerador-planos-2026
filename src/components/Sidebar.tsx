import React from 'react';
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
  Calendar,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritesCount: number;
  onShowTour: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  favoritesCount,
  onShowTour,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen
}: SidebarProps) {
  const navigationSections = [
    {
      title: 'PLANEJAMENTO',
      items: [
        { id: 'plan-generator', label: 'Planos de Ensino', icon: BookOpen },
        { id: 'curriculum', label: 'Matriz Curricular', icon: FileText },
        { id: 'assessment-calendar', label: 'Avaliações 2026', icon: Calendar },
        { id: 'recovery-plan', label: 'Recuperação', icon: GraduationCap },
        { id: 'repositories', label: 'Banco de Questões', icon: HelpCircle },
        {
          id: 'favorites',
          label: 'Favoritos',
          icon: Bookmark,
          badge: favoritesCount > 0 ? favoritesCount : undefined
        }
      ]
    },
    {
      title: 'SISTEMA',
      items: [
        { id: 'dashboard', label: 'Visão Geral', icon: Home },
        { id: 'settings', label: 'Configurações', icon: Settings },
        { id: 'help', label: 'Ajuda / Guia', icon: HelpCircle }
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
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-slate-900 text-slate-300 z-50 flex flex-col transition-all duration-300 border-r border-slate-800 shadow-lg font-sans
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-[240px]'} w-[240px]`}
      >
        {/* Brand Header */}
        <div className="h-[64px] border-b border-slate-800 px-4 flex items-center justify-between shrink-0 bg-slate-950/70">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-[#00856A] flex items-center justify-center text-white shrink-0 font-bold shadow-xs">
              <BookOpen className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <span className="text-sm font-bold text-white tracking-tight block truncate">
                  Currículo Priorizado
                </span>
                <span className="text-[10px] text-[#00856A] font-bold tracking-wider uppercase block leading-tight">
                  SEDUC-SP • 2026
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 no-scrollbar">
          {navigationSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              {!isCollapsed && sec.title && (
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1.5">
                  {sec.title}
                </h4>
              )}

              {sec.items.map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 py-2.5 px-3 text-xs font-semibold rounded-xl transition-all cursor-pointer text-left relative group
                      ${
                        isActive
                          ? 'bg-[#E8F7F2] text-[#00856A] font-bold dark:bg-[#00856A]/20 dark:text-emerald-300'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                      }`}
                  >
                    <IconComp
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#00856A] dark:text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}
                    {item.badge !== undefined && !isCollapsed && (
                      <span className="text-[10px] font-bold bg-[#00856A] text-white px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}

                    {/* Tooltip for collapsed mode */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded-md shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* User Profile & Collapse Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 space-y-2 shrink-0">
          <div className="flex items-center gap-3 px-1.5 py-1">
            <div className="w-8 h-8 rounded-full bg-[#00856A] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              PR
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">Docente SEDUC-SP</p>
                <p className="text-[10px] text-slate-400 truncate">Rede Estadual SP</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center py-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-medium gap-1.5 cursor-pointer transition"
            title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-slate-300" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 text-slate-300" />
                <span>Recolher</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
