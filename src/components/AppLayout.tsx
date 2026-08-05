import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Bookmark, 
  HelpCircle, 
  Settings, 
  Bell, 
  ChevronLeft, 
  ChevronRight,
  FileSpreadsheet,
  CheckCircle,
  Clock,
  ChevronDown,
  LogOut
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  favoritesCount: number;
  onShowTour: () => void;
  onReturnToLanding?: () => void;
}

export default function AppLayout({
  children,
  activeTab,
  setActiveTab,
  favoritesCount,
  onShowTour,
  onReturnToLanding
}: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // WordPress-like Navigation items
  const menuGroups = [
    {
      title: "Painel Principal",
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'curriculum', label: 'Matriz Curricular', icon: BookOpen },
      ]
    },
    {
      title: "Planejamento SP",
      items: [
        { id: 'plan-generator', label: 'Gerador de Plano', icon: Award },
        { id: 'recovery-plan', label: 'Plano de Recuperação', icon: GraduationCap },
        { id: 'repositories', label: 'Banco de Questões', icon: GraduationCap },
      ]
    },
    {
      title: "Biblioteca Pessoal",
      items: [
        { id: 'favorites', label: 'Meus Favoritos', icon: Bookmark, badge: favoritesCount > 0 ? favoritesCount : undefined },
      ]
    },
    {
      title: "Suporte e Ajustes",
      items: [
        { id: 'help', label: 'Guia & Ajuda', icon: HelpCircle },
        { id: 'settings', label: 'Configurações', icon: Settings },
      ]
    }
  ];

  // Helper to check if item is active
  const isActive = (id: string) => activeTab === id;

  const handleNavClick = (id: string) => {
    if (id === 'help') {
      onShowTour();
      setActiveTab('help');
    } else {
      setActiveTab(id);
    }
    setIsSidebarOpen(false);
  };

  // Static notification mockup for admin feel
  const notifications = [
    { id: 1, title: "Novo Escopo Paulista 2026", desc: "Matriz prioritária integrada com sucesso.", read: false, time: "10m atrás" },
    { id: 2, title: "Exportador de Planos corrigido", desc: "Tabelas agora mantêm formatação no Google Docs.", read: true, time: "2h atrás" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex transition-colors duration-200" translate="no" lang="pt-BR">
      
      {/* BACKGROUND SHIELD OVERLAY FOR MOBILE SIDEBAR DRAWER */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* LEFT FIXED SIDEBAR */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-50 flex flex-col transition-all duration-300 shadow-sm
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-[260px]'} w-[260px]`}
      >
        {/* SIDEBAR HEADER / BRAND AREA */}
        <div className="h-[64px] border-b border-slate-200 dark:border-slate-800 px-4.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-700 to-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <span className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight block">
                  Currículo Priorizado
                </span>
                <span className="text-[10px] text-blue-700 dark:text-blue-400 font-bold tracking-wide uppercase leading-none block mt-0.5">
                  SEDUC-SP • 2026
                </span>
              </div>
            )}
          </div>
          
          {/* Close drawer on mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SIDEBAR SCROLLABLE NAVIGATION LINKS */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-6 no-scrollbar">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              {!isCollapsed && (
                <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3.5 mb-2">
                  {group.title}
                </h4>
              )}
              
              <div className="space-y-1">
                {group.items.map((item) => {
                  const IconComponent = item.icon;
                  const active = isActive(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 py-2 px-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer group relative
                        ${active 
                          ? 'bg-blue-50/70 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400 rounded-l-none' 
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/40'}`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <IconComponent className={`w-4 h-4 shrink-0 transition-colors ${active ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                      
                      {(!isCollapsed || isSidebarOpen) && (
                        <span className="truncate flex-1 text-left">
                          {item.label}
                        </span>
                      )}

                      {item.badge !== undefined && (!isCollapsed || isSidebarOpen) && (
                        <span className="text-[9px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* SIDEBAR FOOTER (USER PROFILE & RECOLLAPSER) */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-3 bg-slate-50/50 dark:bg-slate-950/40 space-y-3 shrink-0">
          
          {/* User profile identifier block */}
          <div className="flex items-center gap-3 px-1">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-400 shrink-0 font-bold text-sm shadow-2xs">
              PR
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">Professor(a)</p>
                <p className="text-[10px] text-slate-400 truncate">Planejamento Ativo</p>
              </div>
            )}
          </div>

          {/* Option to return to landing presentation */}
          {onReturnToLanding && (
            <button
              onClick={onReturnToLanding}
              className="w-full flex items-center justify-center py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/40 dark:hover:bg-slate-800/40 rounded-xl text-slate-600 dark:text-slate-300 transition-colors cursor-pointer text-[10px] font-extrabold tracking-wider uppercase gap-1.5"
              title="Voltar para a página de apresentação"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              {!isCollapsed && <span>Apresentação</span>}
            </button>
          )}

          {/* Collapser controller for desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer text-[10px] font-extrabold tracking-wider uppercase gap-1"
          >
            {isCollapsed ? (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <ChevronLeft className="w-3.5 h-3.5" />
                Recolher Menu
              </>
            )}
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT CONTAINER */}
      <div className={`flex-1 min-w-0 min-h-screen flex flex-col transition-all duration-300
        ${isCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'}`}
      >
        
        {/* TOP ADMIN BAR HEADER */}
        <header className="h-[64px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
          
          <div className="flex items-center gap-4">
            {/* Hamburger button for mobile / smaller screens */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Abrir menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb title display */}
            <div className="hidden sm:block">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Painel do Professor
              </span>
              <h2 className="text-base font-black text-slate-800 dark:text-slate-100 leading-none mt-1">
                {activeTab === 'dashboard' && 'Dashboard do Professor'}
                {activeTab === 'curriculum' && 'Matriz Curricular Paulista'}
                {activeTab === 'plan-generator' && 'Gerador de Planos de Aula'}
                {activeTab === 'recovery-plan' && 'Plano de Recuperação Semestral'}
                {activeTab === 'repositories' && 'Banco de Questões SEDUC'}
                {activeTab === 'favorites' && 'Habilidades Favoritas'}
                {activeTab === 'settings' && 'Ajustes e Aparência'}
                {activeTab === 'help' && 'Central de Ajuda'}
              </h2>
            </div>
          </div>

          {/* Quick Actions & Profiles */}
          <div className="flex items-center gap-3">
            
            {/* Theme switch button */}
            <ThemeToggle />

            {/* Quick Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer relative"
                aria-label="Notificações"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              </button>

              {/* Popup block for notifications */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2.5 w-80 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-4 space-y-3.5">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-xs font-black text-slate-800 dark:text-slate-200">Alertas Recentes</span>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 cursor-pointer">Lidos</span>
                    </div>
                    
                    <div className="space-y-3">
                      {notifications.map(n => (
                        <div key={n.id} className="text-left space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                              {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                              {n.title}
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono">{n.time}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* School identity label */}
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-800">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                Rede Estadual SP
              </span>
            </div>

          </div>
        </header>

        {/* SCROLLABLE CENTRAL CONTENT BLOCK */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
